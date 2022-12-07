import {atom} from 'recoil';


const notProcessedLayerEnabledAtom = atom<boolean>({
  key: 'notProcessedLayerEnabled',
  default: false,
});

export default notProcessedLayerEnabledAtom;
