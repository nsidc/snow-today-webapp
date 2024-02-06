import React from 'react';
// import {ErrorBoundary} from 'react-error-boundary';
import {useAtomValue} from 'jotai';

import '@src/style/card.css';
import '@src/style/Tile.css';
import {CITATION} from '@src/constants/citation';
// import {ErrorFallbackTileComponent} from '@src/components/common/ErrorFallback';
import {ITileIdentifier} from '@src/types/layout';
import {selectedRegionIdAtom} from '@src/state/client/selectedRegionId';
import {selectedSatelliteVariableIdAtomFamily} from '@src/state/client/selectedSatelliteVariableId';
import {selectedSatelliteVariableAtomFamily} from '@src/state/client/derived/selectedSatelliteVariable';
import {selectedTileTypeAtomFamily} from '@src/state/client/selectedTileType';
import LinePlot from './LinePlot';
import SlippyMap from './SlippyMap';


type ITileProps = ITileIdentifier & {style: React.CSSProperties};
const Tile: React.FC<ITileProps> = (props) => {
  const tileIdentifier: ITileIdentifier = {row: props.row, col: props.col}
  // TODO: Pass in tile-specific vars as props??
  const selectedSatelliteVariableId = useAtomValue(
    selectedSatelliteVariableIdAtomFamily(tileIdentifier),
  );
  const selectedSatelliteVariable = useAtomValue(
    selectedSatelliteVariableAtomFamily(tileIdentifier)
  );
  const selectedTileType = useAtomValue(
    selectedTileTypeAtomFamily(tileIdentifier)
  );
  const selectedRegionId = useAtomValue(selectedRegionIdAtom);
  console.debug(selectedRegionId);

  // TODO: Pass in selected variable as props? Or pass in row and column as
  // props and let the tiles themselves access state?

  let content: JSX.Element;
  if (selectedTileType === 'plot') {
    content = (
      <LinePlot
        selectedSatelliteVariableId={selectedSatelliteVariableId}
        selectedSatelliteVariable={selectedSatelliteVariable}
      />
    );
  } else if (selectedTileType === 'map') {
    content = (
      <SlippyMap
        selectedSatelliteVariableId={selectedSatelliteVariableId}
        selectedSatelliteVariable={selectedSatelliteVariable} />
    );
  } else {
    throw new Error('This can not happen!');
  }

  // FIXME: Obviously, remove paragraph below after restoring error boundaries
  return (
    <div className={'Tile snow-today-card'} style={props.style}>
      {/* <ErrorBoundary
        FallbackComponent={ErrorFallbackTileComponent}
        resetKeys={[selectedTileType, selectedRegionId, selectedSatelliteVariableId]}
      > */}
        {content}
        <div className='tile-citation'>
          {CITATION}
        </div>
      {/* </ErrorBoundary> */}
    </div>
  );
}

export default Tile; 
