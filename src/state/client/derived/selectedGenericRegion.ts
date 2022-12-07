/* A Generic region could be a super region or a sub-region.
 *
 * From the map and plot's perspective, there is no difference; they are
 * interested in a region as a shape or an identifier of plot data.
 *
 * TODO: Rename *Object state?
 */
import {selector} from 'recoil';

import selectedSuperRegionNameAtom from '../selectedSuperRegionName';
import selectedSuperRegionAtom from './selectedSuperRegion';
import selectedSubRegionCollectionNameAtom from '../selectedSubRegionCollectionName';
import selectedSubRegionCollectionAtom from './selectedSubRegionCollection';
import selectedSubRegionNameAtom from '../selectedSubRegionName';
import selectedSubRegionAtom from './selectedSubRegion';
import {IGenericRegion} from '../../../types/query/regions';


// TODO: Should we call selectors "atoms" for simplicity? They are used
// similarly / identically.
const selectedGenericRegionAtom = selector<IGenericRegion | undefined>({
  key: 'selectedGenericRegion',
  get: ({get}) => {
    const selectedSuperRegion = get(selectedSuperRegionAtom);
    const selectedSuperRegionName = get(selectedSuperRegionNameAtom);
    if (!selectedSuperRegion || !selectedSuperRegionName) {
      return;
    }

    const selectedSubRegionName = get(selectedSubRegionNameAtom);
    const selectedSubRegion = get(selectedSubRegionAtom);
    const selectedSubRegionCollectionName = get(selectedSubRegionCollectionNameAtom);
    const selectedSubRegionCollection = get(selectedSubRegionCollectionAtom);

    // Region is a super-region:
    if (
      !selectedSubRegionCollection
      || !selectedSubRegionCollectionName
      || !selectedSubRegion
      || !selectedSubRegionName
    ) {
      return {
        'id': selectedSuperRegionName,
        'longname': selectedSuperRegion['longname'],
        'shortname': selectedSuperRegion['shortname'],
        'shape_path': selectedSuperRegion['shape_path'],
      }
    }

    // Region is a sub-region:
    return {
      'id': `${selectedSuperRegionName}_${selectedSubRegionCollectionName}_${selectedSubRegionName}`,
      'longname': selectedSubRegion['longname'],
      'shortname': selectedSubRegion['shortname'],
      'shape_path': selectedSubRegion['shape_path'],
    }
  },
});

export default selectedGenericRegionAtom;
