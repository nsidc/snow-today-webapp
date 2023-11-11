import React from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';

import '@src/style/SuperRegionSelector.css';
import selectedSuperRegionIdAtom from '@src/state/client/selectedSuperRegionId';
import selectedRegionIdAtom from '@src/state/client/selectedRegionId';
import {ISuperRegionIndex} from '@src/types/query/regions';


interface ISuperRegionSelectorProps {
  indexQueryData: ISuperRegionIndex;
}

const SuperRegionSelector: React.FC<ISuperRegionSelectorProps> = (props) => {
  const [selectedSuperRegionId, setSelectedSuperRegionId] = useRecoilState(selectedSuperRegionIdAtom);
  const setSelectedRegionId = useSetRecoilState(selectedRegionIdAtom);

  const superRegionOptions = Object.entries(props.indexQueryData).map(
    ([superRegionId, superRegion]) => (
      <option key={superRegionId} value={superRegionId}>{superRegion.longName}</option>
    )
  );

  /* TODO: Handle undefined super region? Let it fall to an error boundary? */

  const handleSelection = (e) => {
    const newRegionId = e.currentTarget.value;
    setSelectedSuperRegionId(newRegionId);
    // TODO: Is this a good practice? Setting two pieces of Recoil state
    // together? Why not use the state graph?
    setSelectedRegionId(newRegionId);
  }

  return (
    <div id={'SuperRegionSelector'}>
      <label htmlFor={'super-region-selector'}>{'Region: '}</label>
      <select id={'super-region-selector'}
        value={selectedSuperRegionId}
        onChange={handleSelection}
      >
        {superRegionOptions}
      </select>
    </div>
  );
}
export default SuperRegionSelector;
