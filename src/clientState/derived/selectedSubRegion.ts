/* Derived state: the _metadata_ of the selected sub-region.
 *
 * Depends on server state!
 * */

import {selector} from 'recoil';

import selectedSubRegionCollectionAtom from './selectedSubRegionCollection';
import selectedSubRegionNameAtom from '../selectedSubRegionName';
import {ISubRegion} from '../../types/query/regions';


// TODO: Should we call selectors "atoms" for simplicity? They are used
// similarly / identically.
const selectedSubRegionAtom = selector<ISubRegion | undefined>({
  key: 'selectedSubRegion',
  get: ({get}) => {
    const selectedSubRegionCollection = get(selectedSubRegionCollectionAtom);
    const selectedSubRegion = get(selectedSubRegionNameAtom);
    if (!selectedSubRegionCollection || !selectedSubRegion) {
      return;
    }

    return selectedSubRegionCollection['items'][selectedSubRegion];
  },
});

export default selectedSubRegionAtom;
