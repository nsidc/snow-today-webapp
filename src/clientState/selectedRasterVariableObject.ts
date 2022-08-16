/* Derived state: the _metadata_ of the selected raster variable.
 *
 * Depends on server state!
 * */

import {selector} from 'recoil';

import selectedRasterVariableAtom from './selectedRasterVariable';
import {IRasterVariableOptions, IRasterVariableIndex} from '../types/query/rasterVariables';
import {queryClient} from '../util/query';
import {SERVERSTATE_KEY_VARIABLES_INDEX} from '../serverState/variablesIndex';


// TODO: Should we call selectors "atoms" for simplicity? They are used
// similarly / identically.
const selectedRasterVariableObjectAtom = selector<IRasterVariableOptions | undefined>({
  key: 'selectedRasterVariableObject',
  get: ({get}) => {
    const selectedVariable = get(selectedRasterVariableAtom)
    if (!selectedVariable) {
      return;
    }

    // TODO: Can React-query give us typed access to the cache??
    const variablesIndex = queryClient.getQueryData([SERVERSTATE_KEY_VARIABLES_INDEX]) as IRasterVariableIndex;
    return variablesIndex[selectedVariable];
  },
});

export default selectedRasterVariableObjectAtom;
