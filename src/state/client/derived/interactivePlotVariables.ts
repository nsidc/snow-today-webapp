import {atom} from 'jotai';
import { availableVariablesAtom } from './availableVariables';

export const interactivePlotVariablesAtom = atom((get) => {
  const variables = get(availableVariablesAtom);
  return variables;
});
