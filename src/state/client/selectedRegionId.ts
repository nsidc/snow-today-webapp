import {atom} from 'jotai';


export const selectedRegionIdAtom = atom<string | undefined>(undefined);
selectedRegionIdAtom.debugLabel = "selectedRegionIdAtom";
