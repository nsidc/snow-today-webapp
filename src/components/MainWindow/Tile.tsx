import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {useRecoilValue} from 'recoil';

import '@src/style/card.css';
import '@src/style/Tile.css';
import {CITATION} from '@src/constants/citation';
import {ErrorFallbackTileComponent} from '@src/components/common/ErrorFallback';
import {ITileIdentifier} from '@src/types/layout';
import selectedRegionIdAtom from '@src/state/client/selectedRegionId';
import selectedSatelliteVariableNameAtom from '@src/state/client/selectedSatelliteVariableName';
import selectedSatelliteVariableObjectAtom from '@src/state/client/derived/selectedSatelliteVariable';
import selectedTileTypeAtom from '@src/state/client/selectedTileType';
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
  const selectedRegionId = useRecoilValue(selectedRegionIdAtom);

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
        <ErrorBoundary
          FallbackComponent={ErrorFallbackTileComponent}
          resetKeys={[selectedTileType, selectedRegionId, selectedSatelliteVariableName]}
        >
          {content}
          <div className='tile-citation'>
            {CITATION}
          </div>
        </ErrorBoundary>
      </div>
  );
}

export default Tile; 
