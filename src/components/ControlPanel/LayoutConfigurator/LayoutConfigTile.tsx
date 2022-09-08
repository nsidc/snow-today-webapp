import React from 'react';

import '../../../style/card.css';
import '../../../style/LayoutConfigTile.css';
import {ITileIdentifier} from '../../../types/layout';
import SatelliteVariableSelector from './SatelliteVariableSelector';
import TileTypeSelector from './TileTypeSelector';


const LayoutConfigTile: React.FC<ITileIdentifier> = (props) => (
  <div className={'LayoutConfigTile snow-today-card'}>
    <TileTypeSelector row={props.row} col={props.col} />
    <SatelliteVariableSelector row={props.row} col={props.col} />
  </div>
);

export default LayoutConfigTile; 
