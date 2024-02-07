import {useQuery} from '@tanstack/react-query';
import _cloneDeepWith from 'lodash/cloneDeepWith'

import {
  fetchSubRegionsIndex,
  fetchSubRegionsHierarchy,
  fetchSubRegionCollectionsIndex,
} from '@src/util/fetch/regions';
import {
  ISubRegion,
  ISubRegionIndex,
  ISubRegionCollection,
  ISubRegionCollectionIndex,
  ISubRegionHierarchy,
  ISubRegionHierarchyRich,
} from '@src/types/query/regions';


export const SERVERSTATE_KEY_SUBREGIONS_INDEX = 'subRegionsIndex';
export const useSubRegionsIndexQuery = (
  superRegionId: string,
) => {
  return useQuery<ISubRegionIndex>(
    [SERVERSTATE_KEY_SUBREGIONS_INDEX, superRegionId],
    () => {
      return fetchSubRegionsIndex(superRegionId);
    },
    {
      enabled: !!superRegionId,
      // Never re-fetch this data!
      cacheTime: Infinity,
      staleTime: Infinity,
      // Propagate all errors to the nearest error boundary
      useErrorBoundary: true,
    }
  );
}

export const SERVERSTATE_KEY_SUBREGIONS_HIERARCHY = 'subRegionsHierarchy';
export const useSubRegionsHierarchyQuery = (
  superRegionId: string,
) => {
  return useQuery<ISubRegionHierarchy>(
    [SERVERSTATE_KEY_SUBREGIONS_HIERARCHY, superRegionId],
    () => {
      return fetchSubRegionsHierarchy(superRegionId);
    },
    {
      enabled: !!superRegionId,
      // Never re-fetch this data!
      cacheTime: Infinity,
      staleTime: Infinity,
      // Propagate all errors to the nearest error boundary
      useErrorBoundary: true,
    }
  );
}

export const SERVERSTATE_KEY_SUBREGION_COLLECTIONS_INDEX = 'subRegionsCollectionsIndex';
export const useSubRegionCollectionsIndexQuery = () => {
  return useQuery<ISubRegionCollectionIndex>(
    [SERVERSTATE_KEY_SUBREGION_COLLECTIONS_INDEX],
    fetchSubRegionCollectionsIndex,
    {
      // Never re-fetch this data!
      cacheTime: Infinity,
      staleTime: Infinity,
      // Propagate all errors to the nearest error boundary
      useErrorBoundary: true,
    }
  );
}

// Replicating a subset of the React-Query interface, enable our code to know
// that data is defined if `isLoading` and `isError` are false.
//     https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions
type QueryResultishSuccess<T> = {
  data: T;
  isLoading: false;
  isError: false;
  error: undefined;
}
type QueryResultishLoading = {
  data: undefined;
  isLoading: true;
  isError: boolean;
  error?: unknown;
}
type QueryResultishError = {
  data: undefined;
  isLoading: boolean;
  isError: true;
  error?: unknown;
}
type QueryResultish<T> =
| QueryResultishSuccess<T>
| QueryResultishLoading
| QueryResultishError

export const useSubRegionsQuery = (
  superRegionId: string,
): QueryResultish<ISubRegionHierarchyRich> => {
  /* Compose the results of 3 queries */
  const collectionsQuery = useSubRegionCollectionsIndexQuery();
  const indexQuery = useSubRegionsIndexQuery(superRegionId);
  const hierarchyQuery = useSubRegionsHierarchyQuery(superRegionId);

  // TODO: Memoize!!

  const isLoading = collectionsQuery.isLoading || indexQuery.isLoading || hierarchyQuery.isLoading;
  const isError = collectionsQuery.isError || indexQuery.isError || hierarchyQuery.isError;
  const error = collectionsQuery.error || indexQuery.error || hierarchyQuery.error;

  if (isLoading === true) {
    // TODO: Why does the compiler hate me
    return {
      data: undefined,
      isLoading,
      isError,
      error,
    }
  }
  if (isError === true) {
    // TODO: Why does the compiler hate me
    return {
      data: undefined,
      isLoading,
      isError,
      error,
    }
  }
  if (isLoading || isError) {
    // TODO: Why does the compiler hate me
    throw new Error('Programmer error. This type guard makes the compiler happy.');
  }

  const data = composeRichSubRegionHierarchy(
    collectionsQuery.data,
    indexQuery.data,
    hierarchyQuery.data,
  );

  return {
    data,
    isLoading,
    isError,
    error: undefined,
  };
}


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
