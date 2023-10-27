import {useQuery} from '@tanstack/react-query';

import {fetchSuperRegionsIndex, fetchSubRegionsIndex} from '@src/util/fetch/regions';
import {ISuperRegionIndex, ISubRegionIndex} from '@src/types/query/regions';


export const SERVERSTATE_KEY_SUPERREGIONS_INDEX = 'superRegionsIndex';
export const useSuperRegionsIndexQuery = () => {
  return useQuery<ISuperRegionIndex>(
    [SERVERSTATE_KEY_SUPERREGIONS_INDEX],
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

export const SERVERSTATE_KEY_SUBREGIONS_INDEX = 'subRegionsIndex';
export const useSubRegionsIndexQuery = (
  superRegionId: string,
) => {
  return useQuery<ISubRegionIndex>(
    [SERVERSTATE_KEY_SUBREGIONS_INDEX, superRegionId],
    () => {
      return fetchSubRegionsIndex(superRegionId);
    },
    {
      enabled: !!superRegionId,
      // Never re-fetch this data!
      cacheTime: Infinity,
      staleTime: Infinity,
      // Propagate all errors to the nearest error boundary
      useErrorBoundary: true,
    }
  );
}
