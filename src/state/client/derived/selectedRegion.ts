/* Derived state: the _metadata_ of the selected sub-region.
 *
 * Depends on server state!
 * */

import {selector} from 'recoil';

import selectedRegionIdAtom from '@src/state/client/selectedRegionId';
import selectedSuperRegionIdAtom from '@src/state/client/selectedSuperRegionId';
import {
  IGenericRegion,
  ISuperRegionIndex,
  ISubRegionIndex,
} from '@src/types/query/regions';
import {queryClient} from '@src/util/query';
import {
  SERVERSTATE_KEY_SUPERREGIONS_INDEX,
  SERVERSTATE_KEY_SUBREGIONS_INDEX,
} from '@src/serverState/regionsIndex';


const selectedRegionAtom = selector<IGenericRegion | undefined>({
  key: 'selectedRegion',
  get: ({get}) => {
    const selectedRegionId = get(selectedRegionIdAtom);
    const selectedSuperRegionId = get(selectedSuperRegionIdAtom);
    if (!selectedRegionId || !selectedSuperRegionId) {
      return;
    }

    // Look for the region, first checking if it's a super-region, then sub-region:
    // TODO: Simplify? Create a mock query that indexes super and sub-regions?
    const superRegionsIndex = queryClient.getQueryData([SERVERSTATE_KEY_SUPERREGIONS_INDEX]) as ISuperRegionIndex;
    if (selectedRegionId in superRegionsIndex) {
      return {
        id: selectedRegionId,
        ...superRegionsIndex[selectedRegionId],
      }
    }
    
    const subRegionsIndex = queryClient.getQueryData([SERVERSTATE_KEY_SUBREGIONS_INDEX, selectedSuperRegionId]) as ISubRegionIndex;
    return {
      id: selectedRegionId,
      ...subRegionsIndex[selectedRegionId],
    }
  },
});

export default selectedRegionAtom;
