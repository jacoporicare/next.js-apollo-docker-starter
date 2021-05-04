import { gql } from '@apollo/client';

import recipeFragment from './recipeFragment.graphql';

export default gql`
  query RecipeList {
    recipes {
      ...recipe
    }
  }

  ${recipeFragment}
`;
