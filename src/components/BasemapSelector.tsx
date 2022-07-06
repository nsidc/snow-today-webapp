import React from 'react';

import '../style/BasemapSelector.css';
import {
  BASEMAP_CHOICES,
  Basemap,
} from '../types/Map';

interface IBasemapSelectorProps {
  selectedBasemap: Basemap;
  onChange: (basemap: Basemap) => void;
}

const BasemapSelector: React.FC<IBasemapSelectorProps> = (
  props
) => {

  return (
    <div className="BasemapSelector">
      <select
        value={props.selectedBasemap}
        onChange={e => props.onChange(
          e.currentTarget.value as Basemap
        )}
      >
        {BASEMAP_CHOICES.map(basemap => (
          <option key={basemap}>{basemap}</option>
        ))}
      </select>
    </div>
  );
}

export default BasemapSelector
