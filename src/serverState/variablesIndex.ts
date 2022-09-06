import {useQuery} from '@tanstack/react-query';

import {fetchVariablesIndex} from '../util/fetch/variables';
import {StateSetter} from '../types/misc';
import {ISatelliteVariableIndex} from '../types/query/satelliteVariables';


export const SERVERSTATE_KEY_VARIABLES_INDEX = 'satelliteVariablesIndex';

const useVariablesIndexQuery = (
  stateSetter: StateSetter<string | undefined>,
) => {
  return useQuery<ISatelliteVariableIndex>(
    [SERVERSTATE_KEY_VARIABLES_INDEX],
    fetchVariablesIndex,
    {
      // Set the selected variable to the default (or first) in the data
      // NOTE: Requires that this query only fires once in the app's lifecycle,
      // or the state will keep getting re-set...
      onSuccess: (data: ISatelliteVariableIndex) => {
        let selectedVariableName: string;

        const defaultVariables = Object.entries(data).filter(
          ([key, val]) => val['default'] || false
        );
        if (defaultVariables.length > 0) {
          selectedVariableName = defaultVariables[0][0];
        } else {
          selectedVariableName = Object.keys(data)[0];
        }
        stateSetter(selectedVariableName);
      },
      // Never re-fetch this data!
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );
}
export default useVariablesIndexQuery;
