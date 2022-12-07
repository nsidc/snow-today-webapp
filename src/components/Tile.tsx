import React from 'react';
import {useRecoilValue} from 'recoil';

import '../style/card.css';
import '../style/Tile.css';
import {CITATION} from '../constants/citation';
import {ITileIdentifier} from '../types/layout';
import selectedSatelliteVariableNameAtom from '../state/client/selectedSatelliteVariableName';
import selectedSatelliteVariableObjectAtom from '../state/client/derived/selectedSatelliteVariable';
import selectedTileTypeAtom from '../state/client/selectedTileType';
import LinePlot from './LinePlot';
import SlippyMap from './SlippyMap';


type ITileProps = ITileIdentifier & {style: React.CSSProperties};
const Tile: React.FC<ITileProps> = (props) => {
  const selectedSatelliteVariableName = useRecoilValue(
    selectedSatelliteVariableNameAtom({row: props.row, col: props.col}),
  );
  const selectedSatelliteVariable = useRecoilValue(
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
        selectedSatelliteVariable={selectedSatelliteVariable} />
    );
  } else if (selectedTileType === 'map') {
    content = (
      <SlippyMap
        selectedSatelliteVariable={selectedSatelliteVariable} />
    );
  } else {
    throw new Error('This can not happen!');
  }
  return (
    <div className={'Tile snow-today-card'} style={props.style}>
      {content}
      <div className='tile-citation'>
        {CITATION}
      </div>
    </div>
  );
}

export default Tile; 
