import {atom} from 'recoil';


const selectedVariableAtom = atom<string | undefined>({
  key: 'selectedVariable',
  default: undefined,
});

export default selectedVariableAtom;
