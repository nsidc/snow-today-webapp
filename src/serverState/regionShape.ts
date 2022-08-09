import {useQuery} from '@tanstack/react-query';

import {fetchRegionShape} from '../util/fetch/regions';


export const SERVERSTATE_KEY_SHAPE_DATA = 'shapeData';

const useRegionShape = (regionId: string | undefined) => useQuery(
  [SERVERSTATE_KEY_SHAPE_DATA, regionId],
  () => regionId ? fetchRegionShape(regionId) : undefined,
  {
    enabled: !!regionId,
    // Never re-fetch this data!
    staleTime: Infinity,
  },
);
export default useRegionShape;
