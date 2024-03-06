import {atom} from 'jotai';

import {BasemapTitle} from '@src/util/layer/basemaps';

// TODO: Something about this magic string
export const selectedBasemapNameAtom = atom<BasemapTitle>('USGS Topographic + Imagery');
selectedBasemapNameAtom.debugLabel = 'selectedBasemapNameAtom';
