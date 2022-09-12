import {atom} from 'recoil';

import {DEFAULT_ROWS, DEFAULT_COLS} from '../constants/layout';


export const selectedLayoutRowsAtom = atom<number>({
  key: 'selectedLayoutRows',
  default: DEFAULT_ROWS,
});

export const selectedLayoutColsAtom = atom<number>({
  key: 'selectedLayoutCols',
  default: DEFAULT_COLS,
});
