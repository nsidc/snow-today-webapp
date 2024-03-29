/* Derived state: the _metadata_ of the selected sub-region.
 *
 * Depends on server state!
 * */
import {atom} from 'jotai';

import {IGenericRegion} from '@src/types/query/regions';
import {selectedRegionIdAtom} from '@src/state/client/selectedRegionId';
import {selectedSuperRegionIdAtom} from '@src/state/client/selectedSuperRegionId';
import {
  superRegionsIndexQueryAtom,
  subRegionsIndexQueryAtom,
} from '@src/state/server/regionsIndex';


export const selectedRegionAtom = atom<Promise<IGenericRegion | undefined>>(
  async (get) => {
    const superRegionsIndex = await get(superRegionsIndexQueryAtom);
    const subRegionsIndex = await get(subRegionsIndexQueryAtom);
    const selectedRegionId = get(selectedRegionIdAtom);
    const selectedSuperRegionId = get(selectedSuperRegionIdAtom);

    if (
      selectedRegionId === undefined
      || selectedSuperRegionId === undefined
    ) {
      return;
    }

    // Look for the region, first checking if it's a super-region, then sub-region:
    // TODO: Simplify? Create a mock query that indexes super and sub-regions?
    if (selectedRegionId in superRegionsIndex.data) {
      // TODO: Just use selectedSuperRegion atom instead of accessing a query??
      return {
        id: selectedRegionId,
        ...superRegionsIndex.data[selectedRegionId],
      }
    }

    return {
      id: selectedRegionId,
      ...subRegionsIndex.data[selectedRegionId],
    }
  }
);
selectedRegionAtom.debugLabel = "selectedRegionAtom";
