/* Derived state: the _metadata_ of the selected SWE variable.
 *
 * Depends on server state!
 * */
import {atom} from 'jotai';

import {selectedSweVariableNameAtom} from '../selectedSweVariableName';
import {IVariable} from '@src/types/query/variables';
import {variablesIndexQueryAtom} from '@src/state/server/variablesIndex';


type AtomValue = IVariable | undefined;
export const selectedSweVariableAtom = atom<Promise<AtomValue>>(
  async (get) => {
    // TODO: should be availableVariables?
    const variablesIndex = await get(variablesIndexQueryAtom);
    const selectedVariable = get(selectedSweVariableNameAtom);
    if (selectedVariable === undefined) {
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
