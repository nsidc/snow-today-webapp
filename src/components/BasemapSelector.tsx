import React from 'react';
import {useRecoilState} from 'recoil';

import '../style/BasemapSelector.css';
import {basemapLayersByName} from '../util/layer/layers';
import selectedBasemapAtom from '../clientState/selectedBasemap';

const BasemapSelector: React.FC = () => {
  const [selectedBasemap, setSelectedBasemap] = useRecoilState(selectedBasemapAtom);

  return (
    <div className="BasemapSelector">
      <select
        value={selectedBasemap}
        onChange={e => setSelectedBasemap(e.currentTarget.value)}
      >
        {Array.from(basemapLayersByName.keys()).map(basemapName => (
          <option key={basemapName}>{basemapName}</option>
        ))}
      </select>
    </div>
  );
}

export default BasemapSelector
