/* Derived state: the _metadata_ of the selected sub-region collection.
 *
 * Depends on server state!
 * */

import {selector} from 'recoil';

import selectedSuperRegionObjectAtom from './selectedSuperRegionObject';
import selectedSubRegionCollectionAtom from '../selectedSubRegionCollection';
import {ISubRegionCollection} from '../../types/query/regions';


// TODO: Should we call selectors "atoms" for simplicity? They are used
// similarly / identically.
const selectedSubRegionCollectionObjectAtom = selector<ISubRegionCollection | undefined>({
  key: 'selectedSubRegionCollectionObject',
  get: ({get}) => {
    const selectedSuperRegionObject = get(selectedSuperRegionObjectAtom);
    const selectedSubRegionCollection = get(selectedSubRegionCollectionAtom);
    if (!selectedSuperRegionObject || !selectedSubRegionCollection) {
      return;
    }

    return selectedSuperRegionObject['subregion_collections'][selectedSubRegionCollection];
  },
});

export default selectedSubRegionCollectionObjectAtom;
