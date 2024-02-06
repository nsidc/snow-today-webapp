import {atomWithQuery} from 'jotai-tanstack-query';

import {fetchVariablesIndex} from '@src/util/fetch/variables';
import {IVariableIndex} from '@src/types/query/variables';


export const SERVERSTATE_KEY_VARIABLES_INDEX = 'variablesIndex';
export const variablesIndexQueryAtom = atomWithQuery<IVariableIndex>(
  () => {
    return {
      queryKey: [SERVERSTATE_KEY_VARIABLES_INDEX],
      queryFn: fetchVariablesIndex,
    }
  }
);
variablesIndexQueryAtom.debugLabel = "variablesIndexQueryAtom";
