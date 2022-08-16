import {variablesIndexUrl} from '../../constants/dataServer';

import {ISatelliteVariableIndex} from '../../types/query/satelliteVariables';


export const fetchVariablesIndex = (): Promise<ISatelliteVariableIndex> => {
  return fetch(variablesIndexUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch index of variable data: ${response.statusText}`);
      }
      return response.json() as Promise<ISatelliteVariableIndex>;
    })
    .catch((error) => {
      throw new Error(`Failed to fetch index of variable data: ${String(error)}`);
    });
};
