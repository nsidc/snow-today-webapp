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
