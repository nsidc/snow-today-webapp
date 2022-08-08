import {useQuery} from '@tanstack/react-query';

import {fetchShapeData} from '../util/shapes';


const useRegionShape = (shapeId: string | undefined) => useQuery(
  ['shapeData', shapeId],
  () => shapeId === undefined ? undefined : fetchShapeData(shapeId),
  {
    enabled: shapeId !== undefined,
  },
);
export default useRegionShape;
