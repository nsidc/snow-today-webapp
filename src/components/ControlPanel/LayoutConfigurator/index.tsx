import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';

import '@src/style/dropdownForm.css';
import LayoutDimensionSelector from './LayoutDimensionSelector';
import LayoutConfigTiles from './LayoutConfigTiles';


const LayoutConfigurator: React.FC = () => (
  <DropdownButton title={'Configure Variables'} variant={'success'}>
    <div className={'LayoutConfigurator dropdown-form'}>

      <LayoutDimensionSelector />

      <LayoutConfigTiles />

    </div>
  </DropdownButton>
)

export default LayoutConfigurator; 
