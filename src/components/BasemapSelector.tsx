import React from 'react';
import {useRecoilState} from 'recoil';

import '../style/BasemapSelector.css';
import {basemapLayersByName} from '../util/layers';
import selectedBasemapAtom from '../clientState/selectedBasemap';


const BasemapSelector: React.FC = () => {
  const [selectedBasemap, setSelectedBasemap] = useRecoilState(selectedBasemapAtom);
  const setBasemapByName = (name: string) => setSelectedBasemap(
    basemapLayersByName.get(name)!
  )

  return (
    <div className="BasemapSelector">
      <select
        value={String(selectedBasemap.get('title'))}
        onChange={e => setBasemapByName(e.currentTarget.value)}
      >
        {Array.from(basemapLayersByName.keys()).map(basemapName => (
          <option key={basemapName}>{basemapName}</option>
        ))}
      </select>
    </div>
  );

}

export default BasemapSelector
