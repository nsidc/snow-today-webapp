/* Derived state: A rich representation of the hierarchy of available sub-regions.
 *
 * Enriched with variable metadata for usability.
 * */
import {atom} from 'jotai';
import _cloneDeepWith from 'lodash/cloneDeepWith';

import {
  ISubRegion,
  ISubRegionIndex,
  ISubRegionCollection,
  ISubRegionCollectionIndex,
  ISubRegionHierarchy,
  ISubRegionHierarchyRich,
} from '@src/types/query/regions';
import {
  subRegionCollectionsIndexQueryAtom,
  subRegionsIndexQueryAtom,
  subRegionsHierarchyQueryAtom,
} from '@src/state/server/regionsIndex';



export const richSubRegionsHierarchyAtom = atom<Promise<ISubRegionHierarchyRich | undefined>>(
  async (get) => {
    /* Compose the results of 3 queries */
    const collectionsQuery = await get(subRegionCollectionsIndexQueryAtom);
    const indexQuery = await get(subRegionsIndexQueryAtom);
    const hierarchyQuery = await get(subRegionsHierarchyQueryAtom);

    // TODO: Memoize!!
    const isLoading = collectionsQuery.isLoading || indexQuery.isLoading || hierarchyQuery.isLoading;
    const isError = collectionsQuery.isError || indexQuery.isError || hierarchyQuery.isError;
    if (isLoading || isError) {
      return;
      // TODO: Why does the compiler hate me
      // throw new Error('Programmer error. This type guard makes the compiler happy.');
    }

    debugger;
    const data = composeRichSubRegionHierarchy(
      collectionsQuery.data,
      indexQuery.data,
      hierarchyQuery.data,
    );

    return data;
  }
);
richSubRegionsHierarchyAtom.debugLabel = 'richSubRegionsHierarchyAtom';


// The annotation for `stack` is `any`, but we know a little more:
type StackLike = {
  size: number,
  __data__: {__data__: Array<Array<Array<object>>>},
};

const composeRichSubRegionHierarchy = (
  collections: ISubRegionCollectionIndex,
  index: ISubRegionIndex,
  hierarchy: ISubRegionHierarchy,
): ISubRegionHierarchyRich => {
  /* Generate a rich hierarchy from sparse hierarchy, region, and collection data.
   *
   * The data we're pulling from the back-end is relational and here we're
   * looking up references to provide a unified data structure.
   *
   * TODO: Is there a better alternative to lodash's cloneDeepWith that handles
   * types better, or should we rewrite this by hand?
   */
  const customizer = (value, key?: string | number, obj?: object, stack?): any => {
    // If this is the root node, continue:
    if (key === undefined) {
      return undefined;
    }

    // Prevent recursing into "metadata" keys; we know they don't need to be
    // changed:
    if (key === "metadata") {
      return value;
    }

    const expectedOddKeys = ["collections", "regions"];

    // If we are at an odd depth, check for key correctness and continue:
    if ((stack as StackLike).size % 2 === 1) {
      if (!expectedOddKeys.includes(key as string)){
        throw new Error(
          `Encountered unexpected key ${key}. Expected ${String(expectedOddKeys)}.`,
        )
      }
      return undefined;
    }

    // Look at parent key; is this a region or a collection?
    // TODO: Can this be less awful? Why do I have to access `stack` like this??
    const parentKey = Object.keys(
      (stack as StackLike).__data__.__data__.slice(-2)[0][0]
    )[0];

    // If collection, look up in `collections`; if region, look up in `index`.
    let metadata: ISubRegionCollection | ISubRegion;
    if (!expectedOddKeys.includes(parentKey)){
      throw new Error(
        `Encountered unexpected key ${parentKey}. Expected ${String(expectedOddKeys)}.`,
      );
    } else if (parentKey === "collections") {
      metadata = collections[key];
    } else if (parentKey === "regions") {
      metadata = index[key];
    } else {
      throw new Error(`Programmer error. parentKey cannot be ${parentKey}`);
    }

    // Add `metadata` key for the looked-up item.
    // Recurse in this case, because it seems when we return non-undefined
    // value, cloneDeepWith stops recursing.
    // NOTE: Parity (even/oddness) is important to this function. Parity is
    // being preserved here, we're passing in one of:
    //   * `{metadata: {...}}`
    //   * `{regions: {...}, metadata: {...}}`
    //   * `{collections: {...}, metadata: {...}}`.
    // NOTE: We are avoiding mutating `value`.
    return _cloneDeepWith(
      // TODO: Without the `as object` hint, the compiler sees this as
      // `any`. WHY?
      {...value, metadata} as object,
      customizer,
    );
  }

  const richHierarchy = _cloneDeepWith(hierarchy, customizer) as ISubRegionHierarchyRich;
  return richHierarchy;
}
