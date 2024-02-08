/* Derived state: the _metadata_ of the selected SWE variable.
 *
 * Depends on server state!
 * */
import {atom} from 'jotai';

import {selectedSweVariableIdAtom} from '@src/state/client/selectedSweVariableId';
import {IRichVariable} from '@src/types/query/variables';
import {richVariablesIndexAtom} from '@src/state/client/derived/richVariablesIndex';


type AtomValue = IRichVariable | undefined;
export const selectedSweVariableAtom = atom<Promise<AtomValue>>(
  async (get) => {
    // TODO: Should change rich index query to async and await it?
    const variablesIndex = get(richVariablesIndexAtom);
    const selectedVariable = get(selectedSweVariableIdAtom);
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
