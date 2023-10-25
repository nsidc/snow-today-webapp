import {useQuery} from '@tanstack/react-query';

import {fetchRegionsIndex} from '@src/util/fetch/regions';
import {IRegionIndex} from '@src/types/query/regions';


export const SERVERSTATE_KEY_REGIONS_INDEX = 'regionsIndex';

const useRegionsIndexQuery = () => {
  return useQuery<IRegionIndex>(
    [SERVERSTATE_KEY_REGIONS_INDEX],
    fetchRegionsIndex,
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
