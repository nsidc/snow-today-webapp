import {atom} from 'recoil';


const rasterOpacityAtom = atom<number>({
  key: 'rasterOpacity',
  default: 100,
});

export default rasterOpacityAtom;
