import {atom} from 'recoil';


export type AtomValue = string | undefined;
const selectedSweVariableNameAtom = atom<AtomValue>({
  key: 'selectedSweVariableName',
  default: undefined,
});

export default selectedSweVariableNameAtom;
