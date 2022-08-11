import {useQuery} from '@tanstack/react-query';

import {fetchRegionShape} from '../util/fetch/regions';


export const SERVERSTATE_KEY_SHAPE_DATA = 'shapeData';

const useRegionShape = (regionId: string | undefined) => useQuery<object>(
  [SERVERSTATE_KEY_SHAPE_DATA, regionId],
  () => {
    if (!regionId) {
      throw new Error('Programmer error.');
    }
    return fetchRegionShape(regionId);
  },
  {
    enabled: !!regionId,
    // Never re-fetch this data!
    staleTime: Infinity,
  },
);
export default useRegionShape;
