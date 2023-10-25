import {dataServerUrl, regionsIndexUrl} from '../../constants/dataServer';
import {ISuperRegionIndex} from '../../types/query/regions';


export const fetchSuperRegionsIndex = (): Promise<ISuperRegionIndex> => {
  return fetch(regionsIndexUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch index of region data: ${response.statusText}`);
      }
      return response.json() as Promise<ISuperRegionIndex>;
    })
    .catch((error) => {
      throw new Error(`Failed to fetch index of region data: ${String(error)}`);
    });
};

export const fetchRegionShape = (shapeFilePath: string): Promise<object> => {
  const url = `${dataServerUrl}/${shapeFilePath}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch region data for ${shapeFilePath}: ${response.statusText}`);
      }
      return response.json() as Promise<object>;
    })
    .catch((error) => {
      throw new Error(`Failed to fetch region data for ${shapeFilePath}: ${String(error)}`);
    });
};
