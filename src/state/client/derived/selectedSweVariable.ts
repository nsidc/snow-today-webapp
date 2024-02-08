/* Derived state: the _metadata_ of the selected SWE variable.
 *
 * Depends on server state!
 * */
import {atom} from 'jotai';

import {selectedSweVariableIdAtom} from '@src/state/client/selectedSweVariableId';
import {ISweRichVariable} from '@src/types/query/variables';
import {sweRichVariablesIndexAtom} from '@src/state/client/derived/richVariablesIndex';


type AtomValue = ISweRichVariable | undefined;
export const selectedSweVariableAtom = atom<Promise<AtomValue>>(
  async (get) => {
    // TODO: Should change rich index query to async and await it?
    const variablesIndex = get(sweRichVariablesIndexAtom);
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
