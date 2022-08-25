/* A Generic region could be a super region or a sub-region.
 *
 * From the map and plot's perspective, there is no difference; they are
 * interested in a region as a shape or an identifier of plot data.
 *
 * TODO: Rename *Object state?
 */
import {selector} from 'recoil';

import selectedSuperRegionAtom from '../selectedSuperRegion';
import selectedSuperRegionObjectAtom from './selectedSuperRegionObject';
import selectedSubRegionCollectionAtom from '../selectedSubRegionCollection';
import selectedSubRegionCollectionObjectAtom from './selectedSubRegionCollectionObject';
import selectedSubRegionAtom from '../selectedSubRegion';
import selectedSubRegionObjectAtom from './selectedSubRegionObject';
import {IGenericRegion} from '../../types/query/regions';


// TODO: Should we call selectors "atoms" for simplicity? They are used
// similarly / identically.
const selectedGenericRegionObjectAtom = selector<IGenericRegion | undefined>({
  key: 'selectedGenericRegionObject',
  get: ({get}) => {
    const selectedSuperRegionObject = get(selectedSuperRegionObjectAtom);
    const selectedSuperRegion = get(selectedSuperRegionAtom);
    if (!selectedSuperRegionObject || !selectedSuperRegion) {
      return;
    }

    const selectedSubRegion = get(selectedSubRegionAtom);
    const selectedSubRegionObject = get(selectedSubRegionObjectAtom);
    const selectedSubRegionCollection = get(selectedSubRegionCollectionAtom);
    const selectedSubRegionCollectionObject = get(selectedSubRegionCollectionObjectAtom);
    if (
      !selectedSubRegionCollectionObject
      || !selectedSubRegionCollection
      || !selectedSubRegionObject
      || !selectedSubRegion
    ) {
      return {
        'id': selectedSuperRegion,
        'longname': selectedSuperRegionObject['longname'],
        'shortname': selectedSuperRegionObject['shortname'],
        'shape_path': selectedSuperRegionObject['shape_path'],
      }
    }

    return {
      'id': `${selectedSuperRegion}_${selectedSubRegionCollection}_${selectedSubRegion}`,
      'longname': selectedSubRegionObject['longname'],
      'shortname': selectedSubRegionObject['shortname'],
      'shape_path': selectedSubRegionObject['shape_path'],
    }
  },
});

export default selectedGenericRegionObjectAtom;
