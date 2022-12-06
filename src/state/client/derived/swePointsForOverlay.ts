import {selector} from 'recoil';

import swePointsQueryAtom from '../../server/swe';
import selectedSweVariableNameAtom from '../selectedSweVariableName';
import {SwePointsForOverlay} from '../../../types/swe';
import {ISwePoint, SweMeasurementField} from '../../../types/query/swe';


const swePointsForOverlayAtom = selector<SwePointsForOverlay>({
  key: 'swePointsForOverlay',
  get: ({get}) => {
    // NOTE: This code relies on the variable name and the keys in swePoints matching!
    const swePoints = get(swePointsQueryAtom);
    const selectedSweVariableName = get(selectedSweVariableNameAtom);

    if (selectedSweVariableName === undefined) {
      return [];
    }

    const measurementInches = (point: ISwePoint) => {
      if (selectedSweVariableName === undefined) {
        return undefined;
      } else {
        return point[selectedSweVariableName as SweMeasurementField];
      }
    }

    const overlayPoints = swePoints.map(point => ({
      name: point.name,
      lon: point.lon,
      lat: point.lat,
      elevation_meters: point.elevation_meters,
      measurement_inches: measurementInches(point),
    }));

    return overlayPoints
  },
});

export default swePointsForOverlayAtom;
