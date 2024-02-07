/* Derived state: the _metadata_ of the selected SWE variable.
 *
 * Depends on server state!
 * */
import {atom} from 'jotai';

import {selectedSweVariableNameAtom} from '../selectedSweVariableName';
import {IRichVariable} from '@src/types/query/variables';
import {richVariablesIndexAtom} from '@src/state/client/derived/richVariablesIndex';


type AtomValue = IRichVariable | undefined;
export const selectedSweVariableAtom = atom<Promise<AtomValue>>(
  async (get) => {
    // TODO: Should change rich index query to async and await it?
    const variablesIndex = get(richVariablesIndexAtom);
    const selectedVariable = get(selectedSweVariableNameAtom);
    if (
      selectedVariable === undefined
      || variablesIndex === undefined
    ) {
      return;
    }
    return variablesIndex[selectedVariable];
  }
);
selectedSweVariableAtom.debugLabel = 'selectedSweVariableAtom';


/*
const selectedSweVariableAtom = selector<AtomValue>({
  key: 'selectedSweVariable',
  get: ({get}) => {
    const selectedVariable = get(selectedSweVariableNameAtom);
    if (!selectedVariable) {
      return;
    }

    // TODO: Can React-query give us typed access to the cache??
    const variablesIndex = queryClient.getQueryData([SERVERSTATE_KEY_VARIABLES_INDEX]) as IVariableIndex;
    return variablesIndex[selectedVariable];
  },
});

export default selectedSweVariableAtom;
*/
