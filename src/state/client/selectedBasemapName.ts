import {atom} from 'jotai';


// TODO: Something about this magic string
export const selectedBasemapNameAtom = atom<string>('USGS Topographic');
selectedBasemapNameAtom.debugLabel = 'selectedBasemapNameAtom';
