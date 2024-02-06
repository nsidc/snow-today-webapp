import {atom} from 'jotai';

import {swePointsQueryAtom} from '@src/state/server/swe';
import {selectedSweVariableNameAtom} from '../selectedSweVariableName';
import {SwePointsForOverlay} from '@src/types/swe';
import {ISwePoint, SwePointMeasurementField} from '@src/types/query/swe';


export const swePointsForOverlayAtom = atom<SwePointsForOverlay>(
  (get) => {
    // NOTE: This code relies on the variable name and the keys in swePoints matching!
    // TODO: Clarify above note.
    const swePoints = get(swePointsQueryAtom);
    const selectedSweVariableName = get(selectedSweVariableNameAtom);

    if (
      selectedSweVariableName === undefined
      || !swePoints.isSuccess
    ) {
      // TODO: Should probably be undefined...
      return [];
    }

    const measurementInches = (point: ISwePoint) => {
      if (selectedSweVariableName === undefined) {
        return undefined;
      } else {
        return point[selectedSweVariableName as SwePointMeasurementField];
      }
    }

    const overlayPoints = swePoints.data.map(point => ({
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
