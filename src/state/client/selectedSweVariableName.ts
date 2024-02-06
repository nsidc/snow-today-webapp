import {atom} from 'jotai';


export type AtomValue = string | undefined;
export const selectedSweVariableNameAtom = atom<AtomValue>(undefined);
selectedSweVariableNameAtom.debugLabel = 'selectedSweVariableNameAtom';
