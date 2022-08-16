import {useQuery} from '@tanstack/react-query';

import {fetchVariablesIndex} from '../util/fetch/variables';
import {StateSetter} from '../types/misc';
import {ISatelliteVariableIndex} from '../types/query/satelliteVariables';


export const SERVERSTATE_KEY_VARIABLES_INDEX = 'satelliteVariablesIndex';

const useVariablesIndex = (
  stateSetter: StateSetter<string | undefined>,
) => {
  return useQuery<ISatelliteVariableIndex>(
    [SERVERSTATE_KEY_VARIABLES_INDEX],
    fetchVariablesIndex,
    {
      // Set the selected variable to the first one in the data
      // NOTE: Requires that this query only fires once in the app's lifecycle,
      // or the state will keep getting re-set...
      onSuccess: (data: ISatelliteVariableIndex) => stateSetter(Object.keys(data)[0]),
      // Never re-fetch this data!
      staleTime: Infinity,
    }
  );
}
export default useVariablesIndex;
