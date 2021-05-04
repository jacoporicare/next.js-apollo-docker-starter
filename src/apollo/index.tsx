/* eslint-disable no-console, @typescript-eslint/no-var-requires, @typescript-eslint/no-explicit-any  */
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import { NextPage, NextPageContext } from 'next';
import App from 'next/app';
import Head from 'next/head';

import appState from '../graphql/local/appState';

import { createApolloClient } from './client';
import { AppStateData } from './types';

let globalApolloClient: ApolloClient<NormalizedCacheObject> | undefined;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
function initApolloClient(
  ctx: Pick<NextPageContext, 'req' | 'res'> = {},
  initialState: NormalizedCacheObject = {},
) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    const client = createApolloClient(initialState);

    client.cache.writeQuery<AppStateData>({
      query: appState,
      data: {
        appState: {
          supportsWebP:
            ctx.req?.headers.accept?.includes('image/webp') || false,
        },
      },
    });

    return client;
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState);
  }

  return globalApolloClient;
}

/**
 * Installs the Apollo Client on NextPageContext
 * or NextAppContext. Useful if you want to use apolloClient
 * inside getStaticProps, getStaticPaths or getServerSideProps
 */
function initOnContext(ctx: any) {
  const inAppContext = Boolean(ctx.ctx);

  // We consider installing `withApollo({ ssr: true })` on global App level
  // as antipattern since it disables project wide Automatic Static Optimization.
  if (process.env.NODE_ENV === 'development') {
    if (inAppContext) {
      console.warn(
        'Warning: You have opted-out of Automatic Static Optimization due to `withApollo` in `pages/_app`.\n' +
          'Read more: https://err.sh/next.js/opt-out-auto-static-optimization\n',
      );
    }
  }

  // Initialize ApolloClient if not already done
  const apolloClient =
    ctx.apolloClient ||
    initApolloClient(inAppContext ? ctx.ctx : ctx, ctx.apolloState);

  // We send the Apollo Client as a prop to the component to avoid calling initApollo() twice in the server.
  // Otherwise, the component would have to call initApollo() again but this
  // time without the context. Once that happens, the following code will make sure we send
  // the prop as `null` to the browser.
  apolloClient.toJSON = () => null;

  // Add apolloClient to NextPageContext & NextAppContext.
  // This allows us to consume the apolloClient inside our
  // custom `getInitialProps({ apolloClient })`.
  ctx.apolloClient = apolloClient;

  if (inAppContext) {
    ctx.ctx.apolloClient = apolloClient;
  }

  return ctx;
}

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 */
export const withApollo = ({ ssr = true } = {}) => (
  PageComponent: NextPage,
) => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }: any) => {
    // getDataFromTree & next.js ssr || next.js client-side rendering
    const client = apolloClient || initApolloClient(undefined, apolloState);

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';
    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: any) => {
      const inAppContext = Boolean(ctx.ctx);
      const { apolloClient } = initOnContext(ctx);

      // Run wrapped getInitialProps methods
      let pageProps = {};

      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      } else if (inAppContext) {
        pageProps = await App.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        const { AppTree } = ctx;

        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr && AppTree) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import(
              '@apollo/client/react/ssr'
            );

            // Since AppComponents and PageComponents have different context types
            // we need to modify their props a little.
            const props = inAppContext
              ? { ...pageProps, apolloClient }
              : { pageProps: { ...pageProps, apolloClient } };

            await getDataFromTree(<AppTree {...props} />);
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      return {
        ...pageProps,
        // Extract query data from the Apollo store
        apolloState: apolloClient.cache.extract(),
        // Provide the client for ssr. As soon as this payload
        // gets JSON.stringified it will remove itself.
        apolloClient: ctx.apolloClient,
      };
    };
  }

  return WithApollo;
};
