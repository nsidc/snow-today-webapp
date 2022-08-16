/* Derived state: the _metadata_ of the selected raster variable.
 *
 * Depends on server state!
 * */

import {selector} from 'recoil';

import selectedSatelliteVariableAtom from './selectedSatelliteVariable';
import {ISatelliteVariableOptions, ISatelliteVariableIndex} from '../types/query/satelliteVariables';
import {queryClient} from '../util/query';
import {SERVERSTATE_KEY_VARIABLES_INDEX} from '../serverState/variablesIndex';


// TODO: Should we call selectors "atoms" for simplicity? They are used
// similarly / identically.
const selectedSatelliteVariableObjectAtom = selector<ISatelliteVariableOptions | undefined>({
  key: 'selectedSatelliteVariableObject',
  get: ({get}) => {
    const selectedVariable = get(selectedSatelliteVariableAtom)
    if (!selectedVariable) {
      return;
    }

    // TODO: Can React-query give us typed access to the cache??
    const variablesIndex = queryClient.getQueryData([SERVERSTATE_KEY_VARIABLES_INDEX]) as ISatelliteVariableIndex;
    return variablesIndex[selectedVariable];
  },
});

export default selectedSatelliteVariableObjectAtom;
