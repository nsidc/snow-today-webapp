import {selector} from 'recoil';

import swePointsQueryAtom from '../../server/swe';
import selectedSweOverlayAtom from '../selectedSweOverlay';
import {SwePointsForOverlay} from '../../../types/swe';


const swePointsForOverlayAtom = selector<SwePointsForOverlay>({
  key: 'swePointsForOverlay',
  get: ({get}) => {
    const swePoints = get(swePointsQueryAtom);
    const selectedSweOverlay = get(selectedSweOverlayAtom);

    if (selectedSweOverlay === 'none') {
      return [];
    }

    const overlayPoints = swePoints.map(point => ({
      name: point.name,
      lon: point.lon,
      lat: point.lat,
      elevation_meters: point.elevation_meters,
      measurement_inches: point[selectedSweOverlay],
    }));

    return overlayPoints
  },
});

export default swePointsForOverlayAtom;
