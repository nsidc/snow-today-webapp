import {useQuery} from '@tanstack/react-query';

import {fetchVariablesIndex} from '../util/fetch/variables';
import {IVariableIndex} from '../types/query/variables';


const getDefaultFromData = (data: IVariableIndex): string => {
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


export const SERVERSTATE_KEY_VARIABLES_INDEX = 'variablesIndex';
const useVariablesIndexQuery = (
  stateSetter?: (defaultVarName: string) => void,
) => {
  return useQuery<IVariableIndex>(
    [SERVERSTATE_KEY_VARIABLES_INDEX],
    fetchVariablesIndex,
    {
      // TODO: ???
      enabled: !!stateSetter,
      // Set the selected variable to the default (or first) in the data
      // NOTE: Requires that this query only fires once in the app's lifecycle,
      // or the state will keep getting re-set...
      onSuccess: (data: IVariableIndex) => {
        if (!stateSetter) {
          throw new Error(
            'A state setter is required on initial query to update client state.'
          );
        }
        // debugger;
        const defaultVariableName = getDefaultFromData(data);
        stateSetter(defaultVariableName);
      },
      // Never re-fetch this data!
      cacheTime: Infinity,
      staleTime: Infinity,
      // Propagate all errors to the nearest error boundary
      useErrorBoundary: true,
    }
  );
}
export default useVariablesIndexQuery;
