import React from 'react';
import {useSetRecoilState, useRecoilValue} from 'recoil';

import _flatten from 'lodash/flatten';

import '../style/TileLayout.css';
import {
  selectedLayoutColsAtom,
  selectedLayoutRowsAtom,
} from '../clientState/layoutDimensions';
import selectedSatelliteVariableAtom from '../clientState/selectedSatelliteVariable';
import {AtomValue as SatelliteVariable} from '../clientState/selectedSatelliteVariable/atom';
import selectedTileTypeAtom from '../clientState/selectedTileType';
import {AtomValue as TileType} from '../clientState/selectedTileType/atom';
import {ROW_OPTIONS, COL_OPTIONS} from '../constants/layout';
import useVariablesIndexQuery from '../serverState/variablesIndex';
import {StateSetter} from '../types/misc';
import Tile from './Tile';

interface ITileStateSetter {
  row: number;
  col: number;
  tileTypeSetter: StateSetter<TileType>;
  variableSetter: StateSetter<SatelliteVariable>;
}


const useTileStateSetters = (): ITileStateSetter[] => _flatten(
  // NOTE: Normally, you should not use hooks within a loop.
  //     https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
  // This is only OK because the order of these lists cannot change at
  // runtime. How to appease the linter without ignoring a rule?
  ROW_OPTIONS.map(row => COL_OPTIONS.map(col => ({
    row: row,
    col: col,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    tileTypeSetter: useSetRecoilState(
      selectedTileTypeAtom({row: row, col: col})
    ),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    variableSetter: useSetRecoilState(
      selectedSatelliteVariableAtom({row: row, col: col})
    ),
  })))
);


const TileLayout: React.FC = () => {
  const selectedLayoutCols = useRecoilValue(selectedLayoutColsAtom);
  const selectedLayoutRows = useRecoilValue(selectedLayoutRowsAtom);

  const tileStateSetters = useTileStateSetters();
  // @ts-ignore: TS6133 -- this query data is expected not to be used here;
  // init only.
  const variablesIndexQuery = useVariablesIndexQuery((defaultVarName: string) => {
    // Initialize state for each default tile based on query results
    tileStateSetters.forEach(setter => {
      setter.tileTypeSetter(setter.col === 1 ? 'map' : 'plot');
      setter.variableSetter(defaultVarName);
    });
  });

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
