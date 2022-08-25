/* Derived state: the _metadata_ of the selected sub-region.
 *
 * Depends on server state!
 * */

import {selector} from 'recoil';

import selectedSubRegionCollectionObjectAtom from './selectedSubRegionCollectionObject';
import selectedSubRegionAtom from '../selectedSubRegion';
import {ISubRegion} from '../../types/query/regions';


// TODO: Should we call selectors "atoms" for simplicity? They are used
// similarly / identically.
const selectedSubRegionObjectAtom = selector<ISubRegion | undefined>({
  key: 'selectedSubRegionObject',
  get: ({get}) => {
    const selectedSubRegionCollectionObject = get(selectedSubRegionCollectionObjectAtom);
    const selectedSubRegion = get(selectedSubRegionAtom);
    if (!selectedSubRegionCollectionObject || !selectedSubRegion) {
      return;
    }

    return selectedSubRegionCollectionObject['items'][selectedSubRegion];
  },
});

export default selectedSubRegionObjectAtom;
