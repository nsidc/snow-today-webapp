import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';

import '../../../style/dropdownForm.css';
import SatelliteVariableSelector from './SatelliteVariableSelector';
import LayoutDimensionSelector from './LayoutDimensionSelector';


const LayoutConfigurator: React.FC = () => (
  <DropdownButton title='Configure Layout'>
    <div className={'LayoutConfigurator dropdown-form'}>

      <LayoutDimensionSelector />

      <SatelliteVariableSelector />

    </div>
  </DropdownButton>
)

export default LayoutConfigurator; 
