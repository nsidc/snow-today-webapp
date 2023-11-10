/* Derived state: the _metadata_ of the selected super-region.
 *
 * Depends on server state!
 * */

import {selector} from 'recoil';

import selectedSuperRegionIdAtom from '@src/state/client/selectedSuperRegionId';
import {
  ISuperRegion,
  ISuperRegionIndex,
} from '@src/types/query/regions';
import {queryClient} from '@src/util/query';
import {SERVERSTATE_KEY_SUPERREGIONS_INDEX} from '@src/serverState/regionsIndex';


const selectedSuperRegionAtom = selector<ISuperRegion | undefined>({
  key: 'selectedSuperRegion',
  get: ({get}) => {
    const selectedSuperRegionId = get(selectedSuperRegionIdAtom);
    if (!selectedSuperRegionId) {
      return;
    }

    const superRegionsIndex = queryClient.getQueryData([SERVERSTATE_KEY_SUPERREGIONS_INDEX]) as ISuperRegionIndex;

    let superRegion = superRegionsIndex[selectedSuperRegionId];
    return superRegion;
  },
});

export default selectedSuperRegionAtom;
