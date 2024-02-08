import type {Getter} from 'jotai';
import {atomWithSuspenseQuery} from 'jotai-tanstack-query';

import {
  fetchSuperRegionsIndex,
  fetchSubRegionsIndex,
  fetchSubRegionsHierarchy,
  fetchSubRegionCollectionsIndex,
} from '@src/util/fetch/regions';
import {
  ISuperRegionIndex,
  // ISubRegion,
  ISubRegionIndex,
  // ISubRegionCollection,
  ISubRegionCollectionIndex,
  ISubRegionHierarchy,
  // ISubRegionHierarchyRich,
} from '@src/types/query/regions';
import {selectedSuperRegionIdAtom} from '@src/state/client/selectedSuperRegionId';


export const SERVERSTATE_KEY_SUPERREGIONS_INDEX = 'superRegionsIndex';
export const superRegionsIndexQueryAtom = atomWithSuspenseQuery<ISuperRegionIndex>(
  () => {
    return {
      queryKey: [SERVERSTATE_KEY_SUPERREGIONS_INDEX],
      queryFn: fetchSuperRegionsIndex,
    }
  }
);
superRegionsIndexQueryAtom.debugLabel = 'superRegionsIndexQueryAtom';


export const SERVERSTATE_KEY_SUBREGION_COLLECTIONS_INDEX = 'subRegionsCollectionsIndex';
export const subRegionCollectionsIndexQueryAtom = atomWithSuspenseQuery<ISubRegionCollectionIndex>(
  () => {
    return {
      queryKey: [SERVERSTATE_KEY_SUBREGION_COLLECTIONS_INDEX],
      queryFn: fetchSubRegionCollectionsIndex,
    }
  }
);
subRegionCollectionsIndexQueryAtom.debugLabel = 'subRegionCollectionsIndexQueryAtom';


// NOTE: Derived state!
export const SERVERSTATE_KEY_SUBREGIONS_INDEX = 'subRegionsIndex';
export const subRegionsIndexQueryAtom = atomWithSuspenseQuery<ISubRegionIndex>(
  (get: Getter) => {
    return {
      queryKey: [SERVERSTATE_KEY_SUBREGIONS_INDEX, get(selectedSuperRegionIdAtom)],
      // FIXME: Why is the id field unknown (see plotData server state for similar)?
      queryFn: async ({queryKey: [, superRegionId]}) => await fetchSubRegionsIndex(superRegionId as string),
    }
  }
);
subRegionsIndexQueryAtom.debugLabel = 'subRegionsIndexQueryAtom';


export const SERVERSTATE_KEY_SUBREGIONS_HIERARCHY = 'subRegionsHierarchy';
export const subRegionsHierarchyQueryAtom = atomWithSuspenseQuery<ISubRegionHierarchy>(
  (get: Getter) => {
    return {
      queryKey: [SERVERSTATE_KEY_SUBREGIONS_HIERARCHY, get(selectedSuperRegionIdAtom)],
      queryFn: async ({queryKey: [, superRegionId]}) => await fetchSubRegionsHierarchy(superRegionId as string),
    }
  }
);
subRegionsHierarchyQueryAtom.debugLabel = 'subRegionsHierarchyQueryAtom';
