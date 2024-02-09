import {atomWithQuery} from 'jotai-tanstack-query';

import {fetchSwePoints} from '@src/util/fetch/swe';
import {ISwePayload} from '@src/types/query/swe';


export const SERVERSTATE_KEY_SWE_POINTS = 'swePointsQuery';
export const swePointsQueryAtom = atomWithQuery<ISwePayload>(
  () => {
    return {
      queryKey: [SERVERSTATE_KEY_SWE_POINTS],
      queryFn: fetchSwePoints,
    }
  }
);
swePointsQueryAtom.debugLabel = 'swePointsQueryAtom';
