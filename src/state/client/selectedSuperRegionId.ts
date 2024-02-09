import {atom} from 'jotai';


export const selectedSuperRegionIdAtom = atom<string | undefined>(undefined);
selectedSuperRegionIdAtom.debugLabel = "selectedSuperRegionIdAtom";
