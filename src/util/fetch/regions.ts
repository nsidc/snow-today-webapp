import {sspDataUrl, regionsUrl, regionsIndexUrl} from '@src/constants/dataServer';
import {
  ISuperRegionIndex,
  ISubRegionIndex,
  ISubRegionCollectionIndex,
  ISubRegionHierarchy,
} from '@src/types/query/regions';
import {genericFetch, genericFetchAsync} from './generic';


export const fetchSuperRegionsIndex = () => (
  genericFetchAsync<ISuperRegionIndex>(regionsIndexUrl, 'index of all super-regions')
);

export const fetchSubRegionsIndex = (superRegionId: string): Promise<ISubRegionIndex> => {
  const fetchUrl = `${regionsUrl}/${superRegionId}.json`;
  return genericFetch<ISubRegionIndex>(
    fetchUrl,
    `index of sub-regions of super-region ${superRegionId}`,
  );
};

export const fetchSubRegionCollectionsIndex = (): Promise<ISubRegionCollectionIndex> => {
  const fetchUrl = `${regionsUrl}/collections.json`;
  return genericFetch<ISubRegionCollectionIndex>(
    fetchUrl,
    'index of sub-regions collections',
  );
};

export const fetchSubRegionsHierarchy = (superRegionId: string): Promise<ISubRegionHierarchy> => {
  const fetchUrl = `${regionsUrl}/${superRegionId}_hierarchy.json`;
  return genericFetch<ISubRegionHierarchy>(
    fetchUrl,
    `hierarchy of sub-regions of super-region ${superRegionId}`,
  );
};

export const fetchRegionShape = (shapeFilePath: string): Promise<object> => {
  const fetchUrl = `${sspDataUrl}/${shapeFilePath}`;
  return genericFetch<object>(fetchUrl, "region shape data");
};
