import {atom} from 'jotai';

import {DEFAULT_ROWS, DEFAULT_COLS} from '@src/constants/layout';


export const selectedLayoutRowsAtom = atom<number>(DEFAULT_ROWS);
selectedLayoutRowsAtom.debugLabel = "selectedLayoutRowsAtom";
export const selectedLayoutColsAtom = atom<number>(DEFAULT_COLS);
selectedLayoutColsAtom.debugLabel = "selectedLayoutColsAtom";
