/* eslint-disable @typescript-eslint/no-var-requires */
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

export const createApolloClient = (initialState: NormalizedCacheObject) =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URI,
    }),
    cache: new InMemoryCache().restore(initialState),
  });
