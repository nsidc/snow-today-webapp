import {atomWithSuspenseQuery} from 'jotai-tanstack-query';

import {
  fetchSuperRegionsIndex,
  // fetchSubRegionsIndex,
  // fetchSubRegionsHierarchy,
  // fetchSubRegionCollectionsIndex,
} from '@src/util/fetch/regions';
import {
  ISuperRegionIndex,
  // ISubRegion,
  // ISubRegionIndex,
  // ISubRegionCollection,
  // ISubRegionCollectionIndex,
  // ISubRegionHierarchy,
  // ISubRegionHierarchyRich,
} from '@src/types/query/regions';


export const SERVERSTATE_KEY_SUPERREGIONS_INDEX = 'superRegionsIndex';
export const superRegionsIndexQueryAtom = atomWithSuspenseQuery<ISuperRegionIndex>(
  () => {
    return {
      queryKey: [SERVERSTATE_KEY_SUPERREGIONS_INDEX],
      queryFn: fetchSuperRegionsIndex,
    }
  }
);
superRegionsIndexQueryAtom.debugLabel = "superRegionsIndexQueryAtom";
