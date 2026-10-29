import React, {useEffect} from 'react';
import {useAtomValue, useSetAtom} from 'jotai';

import '@src/style/TileLayout.css';
import Tile from './Tile';
import {selectedTileSubTypeAtomFamily, selectedTileTypeAtomFamily} from '@src/state/client/selectedTileType';
import { INTERACTIVE_MAP_ROW_ID } from '@src/constants/layout';
import { selectedSatelliteVariableIdAtomFamily } from '@src/state/client/selectedSatelliteVariableId';
import { defaultVariableIdAtom } from '@src/state/client/derived/defaultVariableId';

const InteractiveMapLayout: React.FC = () => {
    const defaultVariableId = useAtomValue(defaultVariableIdAtom);

    const INTERACTIVE_MAP_ID = {row: INTERACTIVE_MAP_ROW_ID, col: 1};
  
    const setSelectedTileType = useSetAtom(selectedTileTypeAtomFamily(INTERACTIVE_MAP_ID));
    const setSelectedTileSubType = useSetAtom(selectedTileSubTypeAtomFamily(INTERACTIVE_MAP_ID));
    const setSelectedSatelliteVariableId = useSetAtom(selectedSatelliteVariableIdAtomFamily(INTERACTIVE_MAP_ID));

    useEffect(() => {
      setSelectedTileType('map');
      setSelectedTileSubType('interactive');
      setSelectedSatelliteVariableId(defaultVariableId);
    }, [
      defaultVariableId,
      setSelectedTileType,
      setSelectedTileSubType,
      setSelectedSatelliteVariableId,
    ]);
      
    return(
      <div className={'TileLayout'}>
        <Tile
          key={`row${INTERACTIVE_MAP_ROW_ID}-col1`}
          style={{maxWidth: `1600px`, width: `100%`}}
          row={INTERACTIVE_MAP_ROW_ID}
          col={1} />
      </div>
    )
}

export default InteractiveMapLayout;
