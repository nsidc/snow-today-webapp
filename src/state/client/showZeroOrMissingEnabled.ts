import {atom} from 'jotai';


export const showZeroOrMissingEnabledAtom = atom<boolean>(true);
showZeroOrMissingEnabledAtom.debugLabel = 'showZeroOrMissingEnabledAtom';
