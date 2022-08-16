import {atom} from 'recoil';


const selectedSatelliteVariableAtom = atom<string | undefined>({
  key: 'selectedSatelliteVariable',
  default: undefined,
});

export default selectedSatelliteVariableAtom;
