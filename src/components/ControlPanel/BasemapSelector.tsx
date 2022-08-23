import React from 'react';
import {useRecoilState} from 'recoil';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import {basemapLayersByName} from '../../util/layer/basemaps';
import selectedBasemapAtom from '../../clientState/selectedBasemap';

const BasemapSelector: React.FC = () => {
  const [selectedBasemap, setSelectedBasemap] = useRecoilState(selectedBasemapAtom);

  const handleSelect = (eventKey: string | null): void => {
    if (!eventKey) {
      return;
    }
    setSelectedBasemap(eventKey);
  };
  return (
    <DropdownButton title='Select a Basemap' onSelect={handleSelect}>
      {Array.from(basemapLayersByName.keys()).map(basemapName => (
        <Dropdown.Item
          key={basemapName}
          eventKey={basemapName}
          active={basemapName === selectedBasemap} >
          {basemapName}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default BasemapSelector
