import {atom} from 'jotai';
import { availableVariablesAtom } from './availableVariables';

export const interactiveMapVariablesAtom = atom((get) => {
  const variables = get(availableVariablesAtom);
  return variables;
});
