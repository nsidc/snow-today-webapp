/* Derived state: the _metadata_ of the selected super-region.
 *
 * Depends on server state!
 * */

import {selector} from 'recoil';

import selectedSuperRegionNameAtom from '../selectedSuperRegionName';
import {IRegion, IRegionIndex} from '../../../types/query/regions';
import {queryClient} from '../../../util/query';
import {SERVERSTATE_KEY_REGIONS_INDEX} from '../../../serverState/regionsIndex';


// TODO: Should we call selectors "atoms" for simplicity? They are used
// similarly / identically.
const selectedSuperRegionAtom = selector<IRegion | undefined>({
  key: 'selectedSuperRegion',
  get: ({get}) => {
    const selectedRegion = get(selectedSuperRegionNameAtom);
    if (!selectedRegion) {
      return;
    }

    const regionsIndex = queryClient.getQueryData([SERVERSTATE_KEY_REGIONS_INDEX]) as IRegionIndex;
    return regionsIndex[selectedRegion];
  },
});

export default selectedSuperRegionAtom;
