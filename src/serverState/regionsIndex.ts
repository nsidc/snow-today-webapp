import {useQuery} from '@tanstack/react-query';

import {fetchRegionsIndex} from '../util/fetch/regions';


const useRegionsIndex = (stateSetter) => useQuery(
  ['shapesIndex'],
  fetchRegionsIndex,
  {
    // Set the selected shape to the first one in the data
    // NOTE: Requires that this query only fires once in the app's lifecycle,
    // or the state will keep getting re-set...
    onSuccess: (data) => stateSetter(Object.keys(data)[0]),
    // Never re-fetch this data!
    staleTime: Infinity,
  }
);
export default useRegionsIndex;
