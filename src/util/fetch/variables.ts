import {variablesIndexUrl} from '../../constants/dataServer';

import {IRasterVariableIndex} from '../../types/query/rasterVariables';


export const fetchVariablesIndex = (): Promise<IRasterVariableIndex> => {
  return fetch(variablesIndexUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch index of variable data: ${response.statusText}`);
      }
      return response.json() as Promise<IRasterVariableIndex>;
    })
    .catch((error) => {
      throw new Error(`Failed to fetch index of variable data: ${String(error)}`);
    });
};
