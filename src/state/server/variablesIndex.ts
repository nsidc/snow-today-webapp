import {atomWithQuery} from 'jotai-tanstack-query';

import {
  fetchSspVariablesIndex,
  fetchSweVariablesIndex,
} from '@src/util/fetch/variables';
import {ISspVariableIndex, ISweVariableIndex} from '@src/types/query/variables';


export const SERVERSTATE_KEY_SSP_VARIABLES_INDEX = 'sspVariablesIndex';
export const sspVariablesIndexQueryAtom = atomWithQuery<ISspVariableIndex>(
  () => {
    return {
      queryKey: [SERVERSTATE_KEY_SSP_VARIABLES_INDEX],
      queryFn: fetchSspVariablesIndex,
    }
  }
);
sspVariablesIndexQueryAtom.debugLabel = "sspVariablesIndexQueryAtom";


export const SERVERSTATE_KEY_SWE_VARIABLES_INDEX = 'sweVariablesIndex';
export const sweVariablesIndexQueryAtom = atomWithQuery<ISweVariableIndex>(
  () => {
    return {
      queryKey: [SERVERSTATE_KEY_SWE_VARIABLES_INDEX],
      queryFn: fetchSweVariablesIndex,
    }
  }
);
sweVariablesIndexQueryAtom.debugLabel = "sweVariablesIndexQueryAtom";
