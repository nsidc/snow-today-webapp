import {useQuery} from '@tanstack/react-query';

import {fetchVariablesIndex} from '../util/fetch/variables';
import {ISatelliteVariableIndex} from '../types/query/satelliteVariables';


const getDefaultFromData = (data: ISatelliteVariableIndex): string => {
  let selectedVariableName: string;

  const defaultVariables = Object.entries(data).filter(
    ([key, val]) => val['default'] || false
  );
  if (defaultVariables.length > 0) {
    selectedVariableName = defaultVariables[0][0];
  } else {
    selectedVariableName = Object.keys(data)[0];
  }
  return selectedVariableName;
}



export const SERVERSTATE_KEY_VARIABLES_INDEX = 'satelliteVariablesIndex';
const useVariablesIndexQuery = (
  stateSetter?: (defaultVarName: string) => void,
) => {
  return useQuery<ISatelliteVariableIndex>(
    [SERVERSTATE_KEY_VARIABLES_INDEX],
    fetchVariablesIndex,
    {
      // Set the selected variable to the default (or first) in the data
      // NOTE: Requires that this query only fires once in the app's lifecycle,
      // or the state will keep getting re-set...
      onSuccess: (data: ISatelliteVariableIndex) => {
        if (!stateSetter) {
          throw new Error(
            'A state setter is required on initial query to update client state.'
          );
        }
        const defaultVariableName = getDefaultFromData(data);
        stateSetter(defaultVariableName);
      },
      // Never re-fetch this data!
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );
}
export default useVariablesIndexQuery;
