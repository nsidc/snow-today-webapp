import React from 'react';
import {useRecoilState} from 'recoil';

import selectedSuperRegionAtom from '../../../clientState/selectedSuperRegion';
import {IRegionIndex} from '../../../types/query/regions';


interface ISuperRegionSelectorProps {
  regionsIndexQueryData: IRegionIndex;
}

const SuperRegionSelector: React.FC<ISuperRegionSelectorProps> = (props) => {
  const [selectedSuperRegion, setSelectedSuperRegion] = useRecoilState(selectedSuperRegionAtom);

  const superRegionOptions = Object.entries(props.regionsIndexQueryData).map(
    ([superRegionId, params]) => (
      <option key={superRegionId} value={superRegionId}>{params['longname']}</option>
    )
  );

  return (
    <div>
      <label htmlFor={'super-region-selector'}>{'Region: '}</label>
      <select id={'super-region-selector'}
        value={selectedSuperRegion}
        onChange={e => setSelectedSuperRegion(e.currentTarget.value)}
      >
        {superRegionOptions}
      </select>
    </div>
  );
}
export default SuperRegionSelector;
