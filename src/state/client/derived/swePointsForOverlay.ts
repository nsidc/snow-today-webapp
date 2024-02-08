import {atom} from 'jotai';

import {swePointsQueryAtom} from '@src/state/server/swe';
import {selectedSweVariableIdAtom} from '@src/state/client/selectedSweVariableId';
import {SwePointsForOverlay} from '@src/types/swe';
import {ISwePoint, SwePointMeasurementField} from '@src/types/query/swe';


export const swePointsForOverlayAtom = atom<SwePointsForOverlay>(
  (get) => {
    // NOTE: This code relies on the variable name and the keys in swePoints matching!
    // TODO: Clarify above note.
    const swePoints = get(swePointsQueryAtom);
    const selectedSweVariableId = get(selectedSweVariableIdAtom);

    if (
      selectedSweVariableId === undefined
      || !swePoints.isSuccess
    ) {
      // TODO: Should probably be undefined...
      return [];
    }

    const measurementInches = (point: ISwePoint) => {
      if (selectedSweVariableId === undefined) {
        return undefined;
      } else {
        return point[selectedSweVariableId as SwePointMeasurementField];
      }
    }

    const overlayPoints = swePoints.data.data.map(point => ({
      name: point.name,
      lon: point.lon,
      lat: point.lat,
      elevation_meters: point.elevation_meters,
      measurement_inches: measurementInches(point),
    }));

    return overlayPoints;
  }
);
swePointsForOverlayAtom.debugLabel = 'swePointsForOverlayAtom';
