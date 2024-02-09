import React, {useEffect} from 'react';
import {useAtomValue, useSetAtom} from 'jotai';

import _flatten from 'lodash/flatten';

import '@src/style/TileLayout.css';
import {
  selectedLayoutColsAtom,
  selectedLayoutRowsAtom,
} from '@src/state/client/layoutDimensions';
import {selectedSatelliteVariableIdAtomFamily} from '@src/state/client/selectedSatelliteVariableId';
import {AtomValue as SatelliteVariable} from '@src/state/client/selectedSatelliteVariableId';
import {defaultVariableIdAtom} from '@src/state/client/derived/defaultVariableId';
import {selectedTileTypeAtomFamily} from '@src/state/client/selectedTileType';
import {AtomValue as TileType} from '@src/state/client/selectedTileType';
import {ROW_OPTIONS, COL_OPTIONS} from '@src/constants/layout';
import {StateSetter} from '@src/types/misc';
import Tile from './Tile';

interface ITileStateSetter {
  row: number;
  col: number;
  tileTypeSetter: StateSetter<TileType>;
  satelliteVariableSetter: StateSetter<SatelliteVariable>;
}


const useTileStateSetters = (): ITileStateSetter[] => _flatten(
  // WARNING: Normally, you should not use hooks within a loop.
  //     https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
  // This is only OK because the order of these lists cannot change at
  // runtime. How to appease the linter without ignoring a rule?
  ROW_OPTIONS.map(row => COL_OPTIONS.map(col => ({
    row: row,
    col: col,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    tileTypeSetter: useSetAtom(
      selectedTileTypeAtomFamily({row: row, col: col})
    ),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    satelliteVariableSetter: useSetAtom(
      selectedSatelliteVariableIdAtomFamily({row: row, col: col})
    ),
  })))
);


const TileLayout: React.FC = () => {
  const selectedLayoutCols = useAtomValue(selectedLayoutColsAtom);
  const selectedLayoutRows = useAtomValue(selectedLayoutRowsAtom);
  const defaultVariableId = useAtomValue(defaultVariableIdAtom);

  const tileStateSetters = useTileStateSetters();

  // TODO: How to ensure that this fires first? The current implementation of
  // the "useQuery" expects a callback when it's first called. There's
  // currently a race condition where this function is called by the swe
  // variable selector first. Move this into the Recoil state graph?
  // @ts-ignore: TS6133 -- this query data is expected not to be used here;
  // init only.
  useEffect(() => {
    if (defaultVariableId === undefined) { return; }
    tileStateSetters.forEach(setter => {
      setter.tileTypeSetter(setter.col === 1 ? 'map' : 'plot');
      setter.satelliteVariableSetter(defaultVariableId);
    });
    // FIXME: Below dependency is probably wrong? This will change with region changes.
  }, [defaultVariableId]);

  // Make 1-indexed arrays of rows and columns: [1, 2, ..., MAX]
  const colOptions = Array.from(
    new Array(selectedLayoutCols),
    (_, i) => i + 1,
  );
  const rowOptions = Array.from(
    new Array(selectedLayoutRows),
    (_, i) => i + 1,
  );

  const tileWidth: number = 100 / selectedLayoutCols;
  // Force a 1-column layout if selected.
  // NOTE: This will not scale to >2 columns without at minimum adjusting tile size.
  const style = {
    flexDirection: selectedLayoutCols === 1 ? 'column' : 'row',
  } as React.CSSProperties;

  return (
    <div className={'TileLayout'} style={style}>
      {rowOptions.map((rowIndex) => colOptions.map((colIndex) => (
        <Tile
          key={`row${rowIndex}-col${colIndex}`}
          style={{width: `${tileWidth}%`}}
          row={rowIndex}
          col={colIndex} />
      )))}
    </div>
  );
}

export default TileLayout; 
