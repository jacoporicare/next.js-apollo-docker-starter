import { gql } from '@apollo/client';

// Example of local state
export default gql`
  query AppState {
    appState @client {
      supportsWebP
    }
  }
`;
