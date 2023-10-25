/* A Generic region could be a super region or a sub-region.
 *
 * From the map and plot's perspective, there is no difference; they are
 * interested in a region as a shape or an identifier of plot data.
 *
 * TODO: Rename *Object state?
 */
import {selector} from 'recoil';

import selectedSuperRegionIdAtom from '../selectedSuperRegionId';
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
    const selectedSuperRegionId = get(selectedSuperRegionIdAtom);
    if (!selectedSuperRegion || !selectedSuperRegionId) {
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
        'id': selectedSuperRegionId,
        'longName': selectedSuperRegion['longName'],
        'shortName': selectedSuperRegion['shortName'],
        'shapeRelativePath': selectedSuperRegion['shapeRelativePath'],
      }
    }

    // Region is a sub-region:
    // TODO: Don't think this is right...
    return {
      'id': `${selectedSuperRegionId}_${selectedSubRegionCollectionName}_${selectedSubRegionName}`,
      'longName': selectedSubRegion['longName'],
      'shortName': selectedSubRegion['shortName'],
      'shapeRelativePath': selectedSubRegion['shapeRelativePath'],
    }
  },
});

export default selectedGenericRegionAtom;
