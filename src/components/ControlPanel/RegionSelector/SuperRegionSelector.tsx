import React from 'react';
import {useRecoilState} from 'recoil';

import '@src/style/SuperRegionSelector.css';
import selectedSuperRegionIdAtom from '@src/state/client/selectedSuperRegionId';
import {IRegionIndex} from '@src/types/query/regions';


interface ISuperRegionSelectorProps {
  regionsIndexQueryData: IRegionIndex;
}

const SuperRegionSelector: React.FC<ISuperRegionSelectorProps> = (props) => {
  const [selectedSuperRegionId, setSelectedSuperRegionId] = useRecoilState(selectedSuperRegionIdAtom);

  const superRegionOptions = Object.entries(props.regionsIndexQueryData).map(
    ([superRegionId, superRegion]) => (
      <option key={superRegionId} value={superRegionId}>{superRegion['name']}</option>
    )
  );

  /* TODO: Handle undefined super region? Let it fall to an error boundary? */

  return (
    <div id={'SuperRegionSelector'}>
      <label htmlFor={'super-region-selector'}>{'Region: '}</label>
      <select id={'super-region-selector'}
        value={selectedSuperRegionId}
        onChange={e => setSelectedSuperRegionId(e.currentTarget.value)}
      >
        {superRegionOptions}
      </select>
    </div>
  );
}
export default SuperRegionSelector;
