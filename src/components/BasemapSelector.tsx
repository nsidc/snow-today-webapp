import React from 'react';
import BaseLayer from 'ol/layer/Base';

import '../style/BasemapSelector.css';

interface IBasemapSelectorProps {
  basemapLayersByName: Map<string, BaseLayer>;
  selectedBasemap: BaseLayer;
  onChange: (basemap: BaseLayer) => void;
}

const BasemapSelector: React.FC<IBasemapSelectorProps> = (props) => {

  return (
    <div className="BasemapSelector">
      <select
        value={String(props.selectedBasemap.get('title'))}
        onChange={e => props.onChange(props.basemapLayersByName.get(e.currentTarget.value)!)}
      >
        {Array.from(props.basemapLayersByName.keys()).map(basemapName => (
          <option key={basemapName}>{basemapName}</option>
        ))}
      </select>
    </div>
  );
}

export default BasemapSelector
