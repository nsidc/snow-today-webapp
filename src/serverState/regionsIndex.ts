import {useQuery} from '@tanstack/react-query';

import {fetchRegionsIndex} from '../util/fetch/regions';
import {StateSetter} from '../types/misc';
import {IRegionIndex} from '../types/query/regions';


export const SERVERSTATE_KEY_REGIONS_INDEX = 'regionsIndex';

const useRegionsIndexQuery = (
  stateSetter: StateSetter<string | undefined>,
) => {
  return useQuery<IRegionIndex>(
    [SERVERSTATE_KEY_REGIONS_INDEX],
    fetchRegionsIndex,
    {
      // Set the selected region to the first one in the data
      // NOTE: Requires that this query only fires once in the app's lifecycle,
      // or the state will keep getting re-set...
      onSuccess: (data: IRegionIndex) => stateSetter(Object.keys(data)[0]),
      // Never re-fetch this data!
      cacheTime: Infinity,
      staleTime: Infinity,
      // Propagate all errors to the nearest error boundary
      useErrorBoundary: true,
    }
  );
}
export default useRegionsIndexQuery;
