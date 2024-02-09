import React from 'react';
import {useAtom} from 'jotai';

import '@src/style/LayoutDimensionSelector.css';
import {
  selectedLayoutColsAtom,
  selectedLayoutRowsAtom,
} from '@src/state/client/layoutDimensions';
import {COL_OPTIONS, ROW_OPTIONS} from '@src/constants/layout';
import {StateSetter} from '@src/types/misc';


const onChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  updater: StateSetter<number>,
): void => {
  updater(Number(e.target.value));
};


const LayoutDimensionSelector: React.FC = () => {
  const [selectedLayoutCols, setSelectedLayoutCols] = useAtom(selectedLayoutColsAtom);
  const [selectedLayoutRows, setSelectedLayoutRows] = useAtom(selectedLayoutRowsAtom);

  return (
    <div className={'LayoutDimensionSelector'}>

      <label htmlFor={'layout-rows'}>Rows:</label>
      <select
        id={'layout-rows'}
        value={selectedLayoutRows}
        onChange={(e) => onChange(e, setSelectedLayoutRows)}>
        {ROW_OPTIONS.map((i) => (<option key={i} value={i}>{i}</option>))}
      </select>

      <label htmlFor={'layout-cols'}>Cols:</label>
      <select
        id={'layout-cols'}
        value={selectedLayoutCols}
        onChange={(e) => onChange(e, setSelectedLayoutCols)}>
        {COL_OPTIONS.map((i) => (<option key={i} value={i}>{i}</option>))}
      </select>

    </div>
  );
}

export default LayoutDimensionSelector; 
