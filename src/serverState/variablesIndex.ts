import {useQuery} from '@tanstack/react-query';

import {fetchVariablesIndex} from '../util/fetch/variables';
import {StateSetter} from '../types/misc';


const useVariablesIndex = (stateSetter: StateSetter<string | undefined>) => useQuery(
  ['variablesIndex'],
  fetchVariablesIndex,
  {
    // Set the selected variable to the first one in the data
    // NOTE: Requires that this query only fires once in the app's lifecycle,
    // or the state will keep getting re-set...
    onSuccess: (data: object) => stateSetter(Object.keys(data)[0]),
    // Never re-fetch this data!
    staleTime: Infinity,
  }
);
export default useVariablesIndex;
