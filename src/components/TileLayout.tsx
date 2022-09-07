import React from 'react';
import {useRecoilValue} from 'recoil';

import '../style/TileLayout.css';
import {
  selectedLayoutColsAtom,
  selectedLayoutRowsAtom,
} from '../clientState/layoutDimensions';
import Tile from './Tile';


const TileLayout: React.FC = () => {
  const selectedLayoutCols = useRecoilValue(selectedLayoutColsAtom);
  const selectedLayoutRows = useRecoilValue(selectedLayoutRowsAtom);

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

  return (
    <div className={'TileLayout'}>
      {rowOptions.map((rowIndex) => colOptions.map((colIndex) => (
        <Tile
          key={`${rowIndex}${colIndex}`}
          style={{width: `${tileWidth}%`}}
          row={rowIndex}
          col={colIndex} />
      )))}
    </div>
  );
}

export default TileLayout; 
