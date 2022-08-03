/* Derived state: the actual _data_ of the selected region, including its shape. */

import {selectorFamily} from 'recoil';

import selectedRegionAtom from './selectedRegion/atom';
import {fetchShapeData} from '../util/shapes';


// TODO: Should we call selectors "atoms" for simplicity? They are used
// similarly / identically.
const selectedRegionDataAtom = selectorFamily({
  key: 'selectedRegionData',
  get: (shapesIndex: any) => ({get}) => {
    if (shapesIndex === undefined) {
      // debugger;
      return;
    }
    const selectedRegion = get(selectedRegionAtom);
    const selectedRegionData = {...shapesIndex[selectedRegion]};
    debugger;
    selectedRegionData['shape'] = fetchShapeData(selectedRegion);
    return selectedRegionData;
  },
});

export default selectedRegionDataAtom;
