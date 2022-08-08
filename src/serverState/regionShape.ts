import {useQuery} from '@tanstack/react-query';

import {fetchRegionShape} from '../util/fetch/regions';


const useRegionShape = (regionId: string | undefined) => useQuery(
  ['shapeData', regionId],
  () => regionId ? fetchRegionShape(regionId) : undefined,
  {
    enabled: !!regionId,
    // Never re-fetch this data!
    staleTime: Infinity,
  },
);
export default useRegionShape;
