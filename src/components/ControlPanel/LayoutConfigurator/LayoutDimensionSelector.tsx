import React from 'react';
import {useRecoilState} from 'recoil';

import {
  selectedLayoutColsAtom,
  selectedLayoutRowsAtom,
} from '../../../clientState/layoutDimensions';
import {MAX_COLS, MAX_ROWS} from '../../../constants/layout';
import {StateSetter} from '../../../types/misc';


// Make 1-indexed arrays: [1, 2, ..., MAX]
const colSelections = Array.from(
  new Array(MAX_COLS),
  (_, i) => i + 1,
);
const rowSelections = Array.from(
  new Array(MAX_ROWS),
  (_, i) => i + 1,
);


const onChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  updater: StateSetter<number>,
): void => {
  updater(Number(e.target.value));
};


const LayoutDimensionSelector: React.FC = () => {
  const [selectedLayoutCols, setSelectedLayoutCols] = useRecoilState(selectedLayoutColsAtom);
  const [selectedLayoutRows, setSelectedLayoutRows] = useRecoilState(selectedLayoutRowsAtom);

  return (
    <div className={'LayoutDimensionSelector'}>

      <label htmlFor={'layout-rows'}>Rows:</label>
      <select
        id={'layout-rows'}
        value={selectedLayoutRows}
        onChange={(e) => onChange(e, setSelectedLayoutRows)}>
        {rowSelections.map((i) => (<option key={i} value={i}>{i}</option>))}
      </select>

      <label htmlFor={'layout-cols'}>Cols:</label>
      <select
        id={'layout-cols'}
        value={selectedLayoutCols}
        onChange={(e) => onChange(e, setSelectedLayoutCols)}>
        {colSelections.map((i) => (<option key={i} value={i}>{i}</option>))}
      </select>

    </div>
  );
}

export default LayoutDimensionSelector; 
