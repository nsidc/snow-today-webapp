import type {Getter} from 'jotai';
import {unwrap} from 'jotai/utils';
import {atomWithSuspenseQuery} from 'jotai-tanstack-query';

import {fetchRegionShape} from '@src/util/fetch/regions';
import {selectedRegionAtom} from '@src/state/client/derived/selectedRegion';
import {selectedSuperRegionAtom} from '@src/state/client/derived/selectedSuperRegion';

export const SERVERSTATE_KEY_SHAPE_DATA = 'shapeData';


// NOTE: Derived state!
// TODO: Return Polygon or Geometry object?
//       https://openlayers.org/en/latest/apidoc/module-ol_geom_Polygon-Polygon.html
//       https://openlayers.org/en/latest/apidoc/module-ol_geom_Geometry-Geometry.html
export const regionShapeQueryAtom = atomWithSuspenseQuery<object | undefined>(
  (get: Getter) => {
    const selectedRegion = get(unwrap(selectedRegionAtom));
    return {
      // TODO: Handle undefined selectedRegion
      queryKey: [SERVERSTATE_KEY_SHAPE_DATA, selectedRegion?.shapeRelativePath],
      // FIXME: Why is the id field unknown (see plotData server state for similar)?
      queryFn: async ({queryKey: [, shapeRelativePath]}) => {
        if (!shapeRelativePath) {
          // FIXME: this is "working", but prints an error in console:
          // "Query data cannot be undefined. Please make sure to return a value
          // other than undefined from your query function"
          return;
        }
        // FIXME: Remove cast!
        return await fetchRegionShape(shapeRelativePath as string);
      },
    }
  }
);
regionShapeQueryAtom.debugLabel = 'regionShapeQueryAtom';


export const superRegionShapeQueryAtom = atomWithSuspenseQuery<object | undefined>(
  (get: Getter) => {
    const selectedSuperRegion = get(unwrap(selectedSuperRegionAtom));
    return {
      queryKey: [SERVERSTATE_KEY_SHAPE_DATA, selectedSuperRegion?.shapeRelativePath],
      // FIXME: Why is the id field unknown (see plotData server state for similar)?
      queryFn: async ({queryKey: [, shapeRelativePath]}) => {
        if (!shapeRelativePath) {
          return;
        }
        return await fetchRegionShape(shapeRelativePath as string);
      },
    }
  }
);
superRegionShapeQueryAtom.debugLabel = 'superRegionShapeQueryAtom';
