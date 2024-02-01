import {atomWithSuspenseQuery} from 'jotai-tanstack-query';

import {fetchVariablesIndexAsync} from '@src/util/fetch/variables';
import {IVariableIndex} from '@src/types/query/variables';


export const SERVERSTATE_KEY_VARIABLES_INDEX = 'variablesIndex';
export const variablesIndexQueryAtom = atomWithSuspenseQuery<IVariableIndex>(
  () => {
    return {
      queryKey: [SERVERSTATE_KEY_VARIABLES_INDEX],
      queryFn: fetchVariablesIndexAsync,
    }
  }
);
variablesIndexQueryAtom.debugLabel = "variablesIndexQueryAtom";
