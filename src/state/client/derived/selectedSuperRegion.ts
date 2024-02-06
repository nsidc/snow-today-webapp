/* Derived state: the _metadata_ of the selected super-region.
 *
 * Depends on server state!
 * */
import {atom} from 'jotai';

import {selectedSuperRegionIdAtom} from '@src/state/client/selectedSuperRegionId';
import {superRegionsIndexQueryAtom} from '@src/state/server/regionsIndex';
import {ISuperRegion} from '@src/types/query/regions';


export const selectedSuperRegionAtom = atom<Promise<ISuperRegion | undefined>>(
  async (get) => {
    const regionsIndex = await get(superRegionsIndexQueryAtom);
    const selectedSuperRegionId = get(selectedSuperRegionIdAtom);

    if (selectedSuperRegionId === undefined) {
      return
    }

    const superRegion = regionsIndex.data[selectedSuperRegionId];
    return superRegion;
  }
);
selectedSuperRegionAtom.debugLabel = "selectedSuperRegionAtom";


/*
import {queryClient} from '@src/util/query';
import {SERVERSTATE_KEY_SUPERREGIONS_INDEX} from '@src/serverState/regionsIndex';
import {
  ISuperRegion,
  ISuperRegionIndex,
} from '@src/types/query/regions';

const selectedSuperRegionAtom = selector<ISuperRegion | undefined>({
  key: 'selectedSuperRegion',
  get: ({get}) => {
    const selectedSuperRegionId = get(selectedSuperRegionIdAtom);
    if (!selectedSuperRegionId) {
      return;
    }

    const superRegionsIndex = queryClient.getQueryData([SERVERSTATE_KEY_SUPERREGIONS_INDEX]) as ISuperRegionIndex;

    const superRegion = superRegionsIndex[selectedSuperRegionId];
    return superRegion;
  },
});

*/
