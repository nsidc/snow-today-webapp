/* Derived state: the _metadata_ of the selected raster variable.
 *
 * Depends on server state!
 * */

import {selectorFamily} from 'recoil';

import selectedSatelliteVariableNameAtom from '../selectedSatelliteVariableName';
import {IVariable, IVariableIndex} from '../../../types/query/variables';
import {queryClient} from '../../../util/query';
import {SERVERSTATE_KEY_VARIABLES_INDEX} from '../../../serverState/variablesIndex';

import {ITileIdentifier} from '../../../types/layout';


type AtomValue = IVariable | undefined;
type AtomParameter = ITileIdentifier;
const selectedSatelliteVariableAtom = selectorFamily<AtomValue, AtomParameter>({
  key: 'selectedSatelliteVariable',
  get: (tileIdentifier: AtomParameter) => ({get}) => {
    const selectedVariable = get(selectedSatelliteVariableNameAtom(tileIdentifier))
    if (!selectedVariable) {
      return;
    }

    // TODO: Can React-query give us typed access to the cache??
    const variablesIndex = queryClient.getQueryData([SERVERSTATE_KEY_VARIABLES_INDEX]) as IVariableIndex;
    return variablesIndex[selectedVariable];
  },
});

export default selectedSatelliteVariableAtom;
