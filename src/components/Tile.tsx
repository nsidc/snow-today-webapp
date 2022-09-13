import React from 'react';
import {useRecoilValue} from 'recoil';

import '../style/card.css';
import '../style/Tile.css';
import {ITileIdentifier} from '../types/layout';
import selectedSatelliteVariableNameAtom from '../clientState/selectedSatelliteVariableName';
import selectedSatelliteVariableObjectAtom from '../clientState/derived/selectedSatelliteVariableOptions';
import selectedTileTypeAtom from '../clientState/selectedTileType';
import LinePlot from './LinePlot';
import SlippyMap from './SlippyMap';


type ITileProps = ITileIdentifier & {style: React.CSSProperties};
const Tile: React.FC<ITileProps> = (props) => {
  const selectedSatelliteVariableName = useRecoilValue(
    selectedSatelliteVariableNameAtom({row: props.row, col: props.col}),
  );
  const selectedSatelliteVariableOptions = useRecoilValue(
    selectedSatelliteVariableObjectAtom({row: props.row, col: props.col})
  );

  const selectedTileType = useRecoilValue(
    selectedTileTypeAtom({row: props.row, col: props.col})
  );

  // TODO: Pass in selected variable as props? Or pass in row and column as
  // props and let the tiles themselves access state?

  let content: JSX.Element;
  if (selectedTileType === 'plot') {
    content = (
      <LinePlot
        selectedSatelliteVariableName={selectedSatelliteVariableName}
        selectedSatelliteVariableOptions={selectedSatelliteVariableOptions} />
    );
  } else if (selectedTileType === 'map') {
    content = (
      <SlippyMap
        selectedSatelliteVariableOptions={selectedSatelliteVariableOptions} />
    );
  } else {
    throw new Error('This can not happen!');
  }
  return (
    <div className={'Tile snow-today-card'} style={props.style}>
      {content}
    </div>
  );
}

export default Tile; 
