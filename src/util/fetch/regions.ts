import {dataServerUrl, regionsUrl, regionsIndexUrl} from '@src/constants/dataServer';
import {ISuperRegionIndex, ISubRegionIndex} from '@src/types/query/regions';
import {genericFetch} from './generic';


export const fetchSuperRegionsIndex = (): Promise<ISuperRegionIndex> => (
  genericFetch<ISuperRegionIndex>(regionsIndexUrl, "index of super-region data")
);

export const fetchSubRegionsIndex = (superRegionId: string): Promise<ISubRegionIndex> => {
  const fetchUrl = `${regionsUrl}/${superRegionId}.json`;
  return genericFetch<ISubRegionIndex>(fetchUrl, "index of sub-region data");
};

export const fetchRegionShape = (shapeFilePath: string): Promise<object> => {
  const fetchUrl = `${dataServerUrl}/${shapeFilePath}`;
  return genericFetch<object>(fetchUrl, "region shape data");
};
