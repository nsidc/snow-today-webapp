import React from 'react';
import {useRecoilState} from 'recoil';

import '../../../style/SuperRegionSelector.css';
import selectedSuperRegionNameAtom from '../../../state/client/selectedSuperRegionName';
import {IRegionIndex} from '../../../types/query/regions';


interface ISuperRegionSelectorProps {
  regionsIndexQueryData: IRegionIndex;
}

const SuperRegionSelector: React.FC<ISuperRegionSelectorProps> = (props) => {
  const [selectedSuperRegionName, setSelectedSuperRegionName] = useRecoilState(selectedSuperRegionNameAtom);

  const superRegionOptions = Object.entries(props.regionsIndexQueryData).map(
    ([superRegionId, params]) => (
      <option key={superRegionId} value={superRegionId}>{params['longname']}</option>
    )
  );

  return (
    <div id={'SuperRegionSelector'}>
      <label htmlFor={'super-region-selector'}>{'Region: '}</label>
      <select id={'super-region-selector'}
        value={selectedSuperRegionName}
        onChange={e => setSelectedSuperRegionName(e.currentTarget.value)}
      >
        {superRegionOptions}
      </select>
    </div>
  );
}
export default SuperRegionSelector;
