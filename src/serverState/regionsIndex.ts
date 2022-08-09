import {useQuery} from '@tanstack/react-query';

import {fetchRegionsIndex} from '../util/fetch/regions';
import {StateSetter} from '../types/misc';


export const SERVERSTATE_KEY_REGIONS_INDEX = 'regionsIndex';

const useRegionsIndex = (stateSetter: StateSetter<string | undefined>) => useQuery(
  [SERVERSTATE_KEY_REGIONS_INDEX],
  fetchRegionsIndex,
  {
    // Set the selected region to the first one in the data
    // NOTE: Requires that this query only fires once in the app's lifecycle,
    // or the state will keep getting re-set...
    onSuccess: (data: object) => stateSetter(Object.keys(data)[0]),
    // Never re-fetch this data!
    staleTime: Infinity,
  }
);
export default useRegionsIndex;
