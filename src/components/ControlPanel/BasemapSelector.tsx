import React from 'react';
import {useAtom} from 'jotai';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import {basemapTitles, BasemapTitle} from '@src/util/layer/basemaps';
import {selectedBasemapNameAtom} from '@src/state/client/selectedBasemapName';

const BasemapSelector: React.FC = () => {
  const [selectedBasemapName, setSelectedBasemap] = useAtom(selectedBasemapNameAtom);

  const handleSelect = (eventKey: string | null): void => {
    if (!eventKey) {
      return;
    }
    // TODO: How to avoid cast?
    setSelectedBasemap(eventKey as BasemapTitle);
  };
  return (
    <DropdownButton title={'Select a Basemap'} onSelect={handleSelect}>
      {basemapTitles.map(basemapName => (
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
