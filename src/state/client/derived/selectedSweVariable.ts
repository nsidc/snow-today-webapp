/* Derived state: the _metadata_ of the selected SWE variable.
 *
 * Depends on server state!
 * */

import {selector} from 'recoil';

import selectedSweVariableNameAtom from '../selectedSweVariableName';
import {IVariable, IVariableIndex} from '../../../types/query/variables';
import {queryClient} from '../../../util/query';
import {SERVERSTATE_KEY_VARIABLES_INDEX} from '../../../serverState/variablesIndex';


// TODO: Should we call selectors "atoms" for simplicity? They are used
// similarly / identically.
type AtomValue = IVariable | undefined;
const selectedSweVariableAtom = selector<AtomValue>({
  key: 'selectedSweVariable',
  get: ({get}) => {
    const selectedVariable = get(selectedSweVariableNameAtom)
    if (!selectedVariable) {
      return;
    }

    // TODO: Can React-query give us typed access to the cache??
    const variablesIndex = queryClient.getQueryData([SERVERSTATE_KEY_VARIABLES_INDEX]) as IVariableIndex;
    return variablesIndex[selectedVariable];
  },
});

export default selectedSweVariableAtom;
