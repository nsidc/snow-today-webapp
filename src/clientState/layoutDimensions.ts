import {atom} from 'recoil';


export const selectedLayoutRowsAtom = atom<number>({
  key: 'selectedLayoutRows',
  default: 1,
});

export const selectedLayoutColsAtom = atom<number>({
  key: 'selectedLayoutCols',
  default: 2,
});
