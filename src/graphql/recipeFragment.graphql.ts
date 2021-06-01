import { gql } from '@apollo/client';

export default gql`
  fragment recipe on Recipe {
    id
    slug
    title
  }
`;
