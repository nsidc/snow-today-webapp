import React from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';

import '../../../style/SatelliteVariableSelector.css';
import selectedSatelliteVariableNameAtom from '../../../state/client/selectedSatelliteVariableName';
import selectedTileTypeAtom from '../../../state/client/selectedTileType';
import useVariablesIndexQuery from '../../../serverState/variablesIndex';
import {ITileIdentifier} from '../../../types/layout';

const LOADING_VALUE = 'LOADING...';


const VariableSelector: React.FC<ITileIdentifier> = (props) => {
  const [
    selectedSatelliteVariableName,
    setSelectedSatelliteVariableName,
  ] = useRecoilState(selectedSatelliteVariableNameAtom(props));
  const selectedTileType = useRecoilValue(selectedTileTypeAtom(props));
  const variablesIndexQuery = useVariablesIndexQuery();

  const handleVariableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetValue = e.currentTarget.value;
    let stateValue: string | undefined;
    if (!targetValue || targetValue === LOADING_VALUE) {
      stateValue = undefined;
    } else {
      stateValue = targetValue;
    }
    setSelectedSatelliteVariableName(stateValue);
  }

  if (variablesIndexQuery.isError) {
    console.debug(`Error!: ${variablesIndexQuery.error as string}`);
    return (
      <span>{`Error: ${variablesIndexQuery.error as string}`}</span>
    );
  }

  let variableOptions: JSX.Element | Array<JSX.Element>;
  if (variablesIndexQuery.isLoading) {
    variableOptions = (
      <option key={LOADING_VALUE} value={LOADING_VALUE}>
        {'Loading variables...'}
      </option>
    );
  } else {
    const longname_param = selectedTileType === 'plot' ? 'longname_plot' : 'longname';
    variableOptions = (
      Object.entries(variablesIndexQuery.data)
      .filter(([variableName, params]) => !Object.keys(params).includes('enabled') || params['enabled'])
      .filter(([variableName, params]) => params['type'] === 'raster')
      .map(([variableName, params]) => (
        <option key={variableName} value={variableName}>
          {params[longname_param]}
        </option>
      ))
    );
  }

  const elementId = `variable-select-row${props.row}-col${props.col}`;
  return (
    <div className={'SatelliteVariableSelector'}>
      <label htmlFor={elementId}>{'Variable: '}</label>
      <select id={elementId} onChange={handleVariableChange} value={selectedSatelliteVariableName}>
        <option value={''} disabled hidden>{'Loading...'}</option>
        {variableOptions}
      </select>
    </div>
  );
}

export default VariableSelector
