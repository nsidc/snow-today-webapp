import {variablesIndexUrl} from '../../constants/dataServer';

import {IVariableIndex} from '../../types/query/variables';


export const fetchVariablesIndex = (): Promise<IVariableIndex> => {
  return fetch(variablesIndexUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch index of variable data: ${response.statusText}`);
      }
      return response.json() as Promise<IVariableIndex>;
    })
    .catch((error) => {
      throw new Error(`Failed to fetch index of variable data: ${String(error)}`);
    });
};
