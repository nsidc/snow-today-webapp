import React from 'react';
import {useRecoilState} from 'recoil';

import '../../../style/LayoutDimensionSelector.css';
import {
  selectedLayoutColsAtom,
  selectedLayoutRowsAtom,
} from '../../../state/client/layoutDimensions';
import {COL_OPTIONS, ROW_OPTIONS} from '../../../constants/layout';
import {StateSetter} from '../../../types/misc';


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
