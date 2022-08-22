import {useQuery} from '@tanstack/react-query';

import {fetchRegionShape} from '../util/fetch/regions';


export const SERVERSTATE_KEY_SHAPE_DATA = 'shapeData';

const useRegionShape = (regionShapeFilePath: string | undefined) => useQuery<object>(
  [SERVERSTATE_KEY_SHAPE_DATA, regionShapeFilePath],
  () => {
    if (!regionShapeFilePath) {
      throw new Error('Programmer error.');
    }
    return fetchRegionShape(regionShapeFilePath);
  },
  {
    enabled: !!regionShapeFilePath,
    // Never re-fetch this data!
    cacheTime: Infinity,
    staleTime: Infinity,
  },
);
export default useRegionShape;
