import { gql } from '@apollo/client';

import recipeDetailFragment from './recipeDetailFragment.graphql';

export default gql`
  query RecipeDetail($slug: String!) {
    recipe(slug: $slug) {
      ...recipeDetail
    }
  }

  ${recipeDetailFragment}
`;
