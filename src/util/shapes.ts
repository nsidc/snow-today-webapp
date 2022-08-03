import {
  stateShapeDirUrl,
  stateShapeIndexUrl,
} from '../constants/dataServer';


export const fetchShapesIndex = (): Promise<any> => {
  return fetch(stateShapeIndexUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch index of region data: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {console.error(error)});
};

// TODO: Returns Promise<object>?
export const fetchShapeData = (shapeId: string): Promise<object> => {
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
