import React from 'react';
import {useRecoilState} from 'recoil';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import selectedSweOverlayAtom from '../../state/client/selectedSweOverlay';
import {SWE_FIELDS} from '../../constants/swe';
import {SweField} from '../../types/swe';

const BasemapSelector: React.FC = () => {
  const [
    selectedSweOverlay,
    setSelectedSweOverlay,
  ] = useRecoilState(selectedSweOverlayAtom);

  const handleSelect = (eventKey: string | null): void => {
    if (!eventKey) {
      return;
    }
    setSelectedSweOverlay(eventKey as SweField);
  };
  return (
    <DropdownButton title={'Select SWE Overlay'} onSelect={handleSelect}>
      {Object.entries(SWE_FIELDS).map(([sweFieldName, sweDisplayName]) => (
        <Dropdown.Item
          key={sweFieldName}
          eventKey={sweFieldName}
          active={sweFieldName === selectedSweOverlay} >
          {sweDisplayName}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default BasemapSelector;
