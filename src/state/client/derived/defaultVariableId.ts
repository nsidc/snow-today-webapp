/* Derived state: the default variable based on available variables.
 * */
import {atom} from 'jotai';

import {availableVariablesAtom} from '@src/state/client/derived/availableVariables';


// TODO: derive defaultVariable from this?
export const defaultVariableIdAtom = atom<Promise<string | undefined>>(
  async (get) => {
    const availableVariables = await get(availableVariablesAtom);
    if (availableVariables === undefined) {
      return;
    }
    const vars = Object.entries(availableVariables);
    const defaults = vars.filter(([k, v]) => !!v.default);

    if (defaults.length == 1) {
      return defaults[0][0];
    } else if (defaults.length > 1) {
      console.warn(
        'Expected exactly 1 default variable.'
        + ` Got ${defaults.length}, defaulting to first:\n${defaults}`
      );
      return vars[0][0];
    }

    throw new Error(
      `Expected exactly 1 default variable. Got 0. Variables:\n${availableVariables}`
    );
  },
);
defaultVariableIdAtom.debugLabel = 'defaultVariableIdAtom';
