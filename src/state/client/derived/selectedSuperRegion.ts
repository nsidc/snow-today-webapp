/* Derived state: the _metadata_ of the selected super-region.
 *
 * Depends on server state!
 * */

import {selector} from 'recoil';

import selectedSuperRegionIdAtom from '@src/state/client/selectedSuperRegionId';
import {IRegion, IRegionIndex} from '@src/types/query/regions';
import {queryClient} from '@src/util/query';
import {SERVERSTATE_KEY_REGIONS_INDEX} from '@src/serverState/regionsIndex';


// TODO: Should we call selectors "atoms" for simplicity? They are used
// similarly / identically.
const selectedSuperRegionAtom = selector<IRegion | undefined>({
  key: 'selectedSuperRegion',
  get: ({get}) => {
    const selectedRegionId = get(selectedSuperRegionIdAtom);
    if (!selectedRegionId) {
      return;
    }

    const regionsIndex = queryClient.getQueryData([SERVERSTATE_KEY_REGIONS_INDEX]) as IRegionIndex;
    return regionsIndex[selectedRegionId];
  },
});

export default selectedSuperRegionAtom;
