import {stateShapeIndexUrl} from '../constants/dataServer';


export const fetchShapesIndex = (): Promise<any> => {
  return fetch(stateShapeIndexUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch index of region data: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {console.log(error)});
};
