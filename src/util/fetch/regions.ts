import {
  stateShapeDirUrl,
  stateShapeIndexUrl,
} from '../../constants/dataServer';


export const fetchRegionsIndex = (): Promise<any> => {
  return fetch(stateShapeIndexUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch index of region data: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {console.error(error)});
};

export const fetchRegionShape = (shapeId: string): Promise<any> => {
  const url = `${stateShapeDirUrl}/${shapeId}.json`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch region data for ${shapeId}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {console.error(error)});
};
