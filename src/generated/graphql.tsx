/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  Upload: any;
};




export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
};


export type Image = {
  __typename?: 'Image';
  fullUrl: Scalars['String'];
  thumbUrl: Scalars['String'];
  thumbWebPUrl: Scalars['String'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  _id: Scalars['ID'];
  amount: Maybe<Scalars['Float']>;
  amountUnit: Maybe<Scalars['String']>;
  name: Scalars['String'];
  isGroup: Maybe<Scalars['Boolean']>;
};

export type IngredientInput = {
  amount: Maybe<Scalars['Float']>;
  amountUnit: Maybe<Scalars['String']>;
  name: Scalars['String'];
  isGroup: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: AuthPayload;
  createRecipe: Recipe;
  updateRecipe: Recipe;
  deleteRecipe: Scalars['Boolean'];
  updateUserLastActivity: Scalars['Boolean'];
  createUser: User;
  updateUser: User;
  deleteUser: Scalars['ID'];
  resetPassword: Scalars['String'];
  changePassword: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateRecipeArgs = {
  recipe: RecipeInput;
  image: Maybe<Scalars['Upload']>;
};


export type MutationUpdateRecipeArgs = {
  id: Scalars['ID'];
  recipe: RecipeInput;
  image: Maybe<Scalars['Upload']>;
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['ID'];
};


export type MutationCreateUserArgs = {
  user: UserInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  user: UserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  id: Scalars['ID'];
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
  newPassword: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  recipes: Array<Recipe>;
  recipe: Maybe<Recipe>;
  ingredients: Array<Scalars['String']>;
  sideDishes: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
  me: User;
  users: Maybe<Array<User>>;
};


export type QueryRecipesArgs = {
  since: Maybe<Scalars['Date']>;
  deleted: Maybe<Scalars['Boolean']>;
};


export type QueryRecipeArgs = {
  id: Maybe<Scalars['ID']>;
  slug: Maybe<Scalars['String']>;
};

export type Recipe = {
  __typename?: 'Recipe';
  _id: Scalars['ID'];
  title: Scalars['String'];
  slug: Scalars['String'];
  directions: Maybe<Scalars['String']>;
  sideDish: Maybe<Scalars['String']>;
  preparationTime: Maybe<Scalars['Int']>;
  servingCount: Maybe<Scalars['Int']>;
  user: User;
  image: Maybe<Image>;
  creationDate: Scalars['Date'];
  lastModifiedDate: Scalars['Date'];
  ingredients: Maybe<Array<Ingredient>>;
  tags: Maybe<Array<Scalars['String']>>;
  deleted: Scalars['Boolean'];
};

export type RecipeInput = {
  title: Scalars['String'];
  directions: Maybe<Scalars['String']>;
  sideDish: Maybe<Scalars['String']>;
  preparationTime: Maybe<Scalars['Int']>;
  servingCount: Maybe<Scalars['Int']>;
  ingredients: Maybe<Array<IngredientInput>>;
  image: Maybe<Scalars['Upload']>;
  tags: Maybe<Array<Scalars['String']>>;
};


export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  username: Scalars['String'];
  displayName: Scalars['String'];
  isAdmin: Maybe<Scalars['Boolean']>;
  lastActivity: Maybe<Scalars['Date']>;
};

export type UserInput = {
  username: Scalars['String'];
  displayName: Scalars['String'];
  isAdmin: Maybe<Scalars['Boolean']>;
};

export type RecipeDetailQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type RecipeDetailQuery = (
  { __typename?: 'Query' }
  & { recipe: Maybe<(
    { __typename?: 'Recipe' }
    & RecipeDetailFragment
  )> }
);

export type RecipeDetailFragment = (
  { __typename?: 'Recipe' }
  & Pick<Recipe, 'directions'>
  & RecipeFragment
);

export type RecipeFragment = (
  { __typename?: 'Recipe' }
  & Pick<Recipe, '_id' | 'slug' | 'title'>
);

export type RecipeListQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipeListQuery = (
  { __typename?: 'Query' }
  & { recipes: Array<(
    { __typename?: 'Recipe' }
    & RecipeFragment
  )> }
);

export const RecipeFragmentDoc = gql`
    fragment recipe on Recipe {
  _id
  slug
  title
}
    `;
export const RecipeDetailFragmentDoc = gql`
    fragment recipeDetail on Recipe {
  ...recipe
  directions
}
    ${RecipeFragmentDoc}`;
export const RecipeDetailDocument = gql`
    query RecipeDetail($slug: String!) {
  recipe(slug: $slug) {
    ...recipeDetail
  }
}
    ${RecipeDetailFragmentDoc}`;

/**
 * __useRecipeDetailQuery__
 *
 * To run a query within a React component, call `useRecipeDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipeDetailQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useRecipeDetailQuery(baseOptions: Apollo.QueryHookOptions<RecipeDetailQuery, RecipeDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecipeDetailQuery, RecipeDetailQueryVariables>(RecipeDetailDocument, options);
      }
export function useRecipeDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecipeDetailQuery, RecipeDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecipeDetailQuery, RecipeDetailQueryVariables>(RecipeDetailDocument, options);
        }
export type RecipeDetailQueryHookResult = ReturnType<typeof useRecipeDetailQuery>;
export type RecipeDetailLazyQueryHookResult = ReturnType<typeof useRecipeDetailLazyQuery>;
export type RecipeDetailQueryResult = Apollo.QueryResult<RecipeDetailQuery, RecipeDetailQueryVariables>;
export const RecipeListDocument = gql`
    query RecipeList {
  recipes {
    ...recipe
  }
}
    ${RecipeFragmentDoc}`;

/**
 * __useRecipeListQuery__
 *
 * To run a query within a React component, call `useRecipeListQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipeListQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecipeListQuery(baseOptions?: Apollo.QueryHookOptions<RecipeListQuery, RecipeListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecipeListQuery, RecipeListQueryVariables>(RecipeListDocument, options);
      }
export function useRecipeListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecipeListQuery, RecipeListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecipeListQuery, RecipeListQueryVariables>(RecipeListDocument, options);
        }
export type RecipeListQueryHookResult = ReturnType<typeof useRecipeListQuery>;
export type RecipeListLazyQueryHookResult = ReturnType<typeof useRecipeListLazyQuery>;
export type RecipeListQueryResult = Apollo.QueryResult<RecipeListQuery, RecipeListQueryVariables>;