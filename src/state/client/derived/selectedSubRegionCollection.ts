/* Derived state: the _metadata_ of the selected sub-region collection.
 *
 * Depends on server state!
 * */

import {selector} from 'recoil';

import selectedSuperRegionAtom from './selectedSuperRegion';
import selectedSubRegionCollectionNameAtom from '@src/state/client/selectedSubRegionCollectionName';
import {ISubRegionCollection} from '@src/types/query/regions';


const selectedSubRegionCollectionAtom = selector<ISubRegionCollection | undefined>({
  key: 'selectedSubRegionCollection',
  get: ({get}) => {
    const selectedSuperRegion = get(selectedSuperRegionAtom);
    const selectedSubRegionCollection = get(selectedSubRegionCollectionNameAtom);
    if (!selectedSuperRegion || !selectedSubRegionCollection) {
      return;
    }

    return selectedSuperRegion.subregionCollections[selectedSubRegionCollection];
  },
});

export default selectedSubRegionCollectionAtom;
