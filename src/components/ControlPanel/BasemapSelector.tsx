import React from 'react';
import {useRecoilState} from 'recoil';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import {basemapNames} from '../../util/layer/basemaps';
import selectedBasemapNameAtom from '../../clientState/selectedBasemapName';

const BasemapSelector: React.FC = () => {
  const [selectedBasemapName, setSelectedBasemap] = useRecoilState(selectedBasemapNameAtom);

  const handleSelect = (eventKey: string | null): void => {
    if (!eventKey) {
      return;
    }
    setSelectedBasemap(eventKey);
  };
  return (
    <DropdownButton title={'Select a Basemap'} onSelect={handleSelect}>
      {basemapNames.map(basemapName => (
        <Dropdown.Item
          key={basemapName}
          eventKey={basemapName}
          active={basemapName === selectedBasemapName} >
          {basemapName}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default BasemapSelector;
