import {useQuery} from '@tanstack/react-query';

import {fetchRegionShape} from '@src/util/fetch/regions';


export const SERVERSTATE_KEY_SHAPE_DATA = 'shapeData';

// TODO: Return Polygon or Geometry object?
//       https://openlayers.org/en/latest/apidoc/module-ol_geom_Polygon-Polygon.html
//       https://openlayers.org/en/latest/apidoc/module-ol_geom_Geometry-Geometry.html
const useRegionShapeQuery = (regionShapeFilePath: string | undefined) => useQuery<object>(
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
    // Propagate all errors to the nearest error boundary
    useErrorBoundary: true,
  },
);
export default useRegionShapeQuery;
