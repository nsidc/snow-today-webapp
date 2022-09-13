/* Derived state: the _metadata_ of the selected raster variable.
 *
 * Depends on server state!
 * */

import {selectorFamily} from 'recoil';

import selectedSatelliteVariableNameAtom from '../selectedSatelliteVariableName';
import {ISatelliteVariableOptions, ISatelliteVariableIndex} from '../../types/query/satelliteVariables';
import {queryClient} from '../../util/query';
import {SERVERSTATE_KEY_VARIABLES_INDEX} from '../../serverState/variablesIndex';

import {ITileIdentifier} from '../../types/layout';


// TODO: Should we call selectors "atoms" for simplicity? They are used
// similarly / identically.
type AtomValue = ISatelliteVariableOptions | undefined;
type AtomParameter = ITileIdentifier;
const selectedSatelliteVariableOptionsAtom = selectorFamily<AtomValue, AtomParameter>({
  key: 'selectedSatelliteVariableOptions',
  get: (tileIdentifier: AtomParameter) => ({get}) => {
    const selectedVariable = get(selectedSatelliteVariableNameAtom(tileIdentifier))
    if (!selectedVariable) {
      return;
    }

    // TODO: Can React-query give us typed access to the cache??
    const variablesIndex = queryClient.getQueryData([SERVERSTATE_KEY_VARIABLES_INDEX]) as ISatelliteVariableIndex;
    return variablesIndex[selectedVariable];
  },
});

export default selectedSatelliteVariableOptionsAtom;
