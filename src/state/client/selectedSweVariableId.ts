import {atom} from 'jotai';


export type AtomValue = string | undefined;
export const selectedSweVariableIdAtom = atom<AtomValue>(undefined);
selectedSweVariableIdAtom.debugLabel = 'selectedSweVariableIdAtom';
