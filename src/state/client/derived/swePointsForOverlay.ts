import {atom} from 'jotai';

import {swePointsQueryAtom} from '@src/state/server/swe';
import {selectedSweVariableIdAtom} from '@src/state/client/selectedSweVariableId';
import {SwePointsForOverlay} from '@src/types/swe';
import {ISwePoint, SwePointMeasurementField} from '@src/types/query/swe';


export const swePointsForOverlayAtom = atom<SwePointsForOverlay>(
  (get) => {
    // NOTE: This code relies on the variable name and the keys in swePointsQuery matching!
    // TODO: Clarify above note.
    const swePointsQuery = get(swePointsQueryAtom);
    const selectedSweVariableId = get(selectedSweVariableIdAtom);

    if (
      selectedSweVariableId === undefined
      || !swePointsQuery.isSuccess
    ) {
      // TODO: Should probably be undefined...
      return [];
    }

    const measurementInches = (point: ISwePoint) => {
      if (selectedSweVariableId === undefined) {
        return undefined;
      } else {
        // FIXME: Remove cast:
        return point[selectedSweVariableId as SwePointMeasurementField];
      }
    }

    const overlayPoints = swePointsQuery.data.data.map(point => ({
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
