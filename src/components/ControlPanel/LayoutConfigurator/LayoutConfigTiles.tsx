import React from 'react';
import {useAtomValue} from 'jotai';

import '../../../style/LayoutConfigTiles.css';
import {
  selectedLayoutColsAtom,
  selectedLayoutRowsAtom,
} from '../../../state/client/layoutDimensions';
import LayoutConfigTile from './LayoutConfigTile';


const LayoutConfigTiles: React.FC = () => {
  const selectedLayoutCols = useAtomValue(selectedLayoutColsAtom);
  const selectedLayoutRows = useAtomValue(selectedLayoutRowsAtom);

  // Make 1-indexed arrays of rows and columns: [1, 2, ..., MAX]
  const colOptions = Array.from(
    new Array(selectedLayoutCols),
    (_, i) => i + 1,
  );
  const rowOptions = Array.from(
    new Array(selectedLayoutRows),
    (_, i) => i + 1,
  );

  const gridStyle = {
    gridTemplateRows: `repeat(${selectedLayoutRows}, 1fr)`,
    gridTemplateColumns: `repeat(${selectedLayoutCols}, 1fr)`,
  }

  return (
    <div className={'LayoutConfigTiles'} style={gridStyle}>
      {rowOptions.map((rowIndex) => colOptions.map((colIndex) => {
        return <LayoutConfigTile key={`${rowIndex}${colIndex}`} row={rowIndex} col={colIndex} />;
      }))}
    </div>
  );
}

export default LayoutConfigTiles; 
