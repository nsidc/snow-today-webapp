import React from 'react';

import '../style/BasemapSelector.css';
import {
  BASEMAP_CHOICES,
  BasemapName,
} from '../types/Map';

interface IBasemapSelectorProps {
  selectedBasemap: BasemapName;
  onChange: (basemap: BasemapName) => void;
}

const BasemapSelector: React.FC<IBasemapSelectorProps> = (
  props
) => {

  return (
    <div className="BasemapSelector">
      <select
        value={props.selectedBasemap}
        onChange={e => props.onChange(
          e.currentTarget.value as BasemapName
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
