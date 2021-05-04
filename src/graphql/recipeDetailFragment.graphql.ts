import { gql } from '@apollo/client';

import recipeFragment from './recipeFragment.graphql';

export default gql`
  fragment recipeDetail on Recipe {
    ...recipe
    directions
  }

  ${recipeFragment}
`;
