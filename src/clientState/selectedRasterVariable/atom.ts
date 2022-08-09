import {atom} from 'recoil';


const selectedRasterVariableAtom = atom<string | undefined>({
  key: 'selectedRasterVariable',
  default: undefined,
});

export default selectedRasterVariableAtom;
