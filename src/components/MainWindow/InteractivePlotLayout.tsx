import React, {useEffect} from 'react';
import {useAtomValue, useSetAtom} from 'jotai';

import '@src/style/TileLayout.css';
import Tile from './Tile';
import {selectedTileSubTypeAtomFamily, selectedTileTypeAtomFamily} from '@src/state/client/selectedTileType';
import { INTERACTIVE_PLOT_ID } from '@src/constants/layout';
import { selectedSatelliteVariableIdAtomFamily } from '@src/state/client/selectedSatelliteVariableId';
import { defaultVariableIdAtom } from '@src/state/client/derived/defaultVariableId';

const InteractivePlotLayout: React.FC = () => {
    // const defaultVariableId = useAtomValue(defaultVariableIdAtom);
    // useSetAtom(selectedTileTypeAtomFamily(INTERACTIVE_PLOT_ID))('plot');
    // useSetAtom(selectedTileSubTypeAtomFamily(INTERACTIVE_PLOT_ID))('interactive');
    // useSetAtom(selectedSatelliteVariableIdAtomFamily(INTERACTIVE_PLOT_ID))(defaultVariableId);

    const defaultVariableId = useAtomValue(defaultVariableIdAtom);
  
    const setSelectedTileType = useSetAtom(selectedTileTypeAtomFamily(INTERACTIVE_PLOT_ID));
    const setSelectedTileSubType = useSetAtom(selectedTileSubTypeAtomFamily(INTERACTIVE_PLOT_ID));
    const setSelectedSatelliteVariableId = useSetAtom(selectedSatelliteVariableIdAtomFamily(INTERACTIVE_PLOT_ID));

    useEffect(() => {
      setSelectedTileType('plot');
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
          key={`row99-col99`}
          style={{maxWidth: `1600px`, width: `100%`}}
          row={99}
          col={99} />
      </div>
    )
}

export default InteractivePlotLayout;