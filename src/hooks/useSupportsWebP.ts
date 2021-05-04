import { useQuery } from '@apollo/client';

import { AppStateData } from '../apollo/types';
import appState from '../graphql/local/appState';

// Example of how to use the local state query
export default function useSupportsWebP() {
  const { data: appStateData } = useQuery<AppStateData>(appState);

  return appStateData?.appState.supportsWebP || false;
}
