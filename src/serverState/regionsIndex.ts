import {useQuery} from '@tanstack/react-query';

import {fetchSuperRegionsIndex} from '@src/util/fetch/regions';
import {ISuperRegionIndex} from '@src/types/query/regions';


export const SERVERSTATE_KEY_REGIONS_INDEX = 'superRegionsIndex';

const useRegionsIndexQuery = () => {
  return useQuery<ISuperRegionIndex>(
    [SERVERSTATE_KEY_REGIONS_INDEX],
    fetchSuperRegionsIndex,
    {
      // Never re-fetch this data!
      cacheTime: Infinity,
      staleTime: Infinity,
      // Propagate all errors to the nearest error boundary
      useErrorBoundary: true,
    }
  );
}
export default useRegionsIndexQuery;
