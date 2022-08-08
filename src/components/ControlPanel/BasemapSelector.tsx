import React from 'react';
import {useRecoilState} from 'recoil';

import '../../style/BasemapSelector.css';
import {basemapLayersByName} from '../../util/layer/basemaps';
import selectedBasemapAtom from '../../clientState/selectedBasemap';

const BasemapSelector: React.FC = () => {
  const [selectedBasemap, setSelectedBasemap] = useRecoilState(selectedBasemapAtom);

  return (
    <span className="BasemapSelector">
      <label htmlFor={'basemap-selector'}>Basemap: </label>
      <select id={'basemap-selector'}
        value={selectedBasemap}
        onChange={e => setSelectedBasemap(e.currentTarget.value)}
      >
        {Array.from(basemapLayersByName.keys()).map(basemapName => (
          <option key={basemapName}>{basemapName}</option>
        ))}
      </select>
    </span>
  );
}

export default BasemapSelector
