import React from 'react';
import {useRecoilState} from 'recoil';

import '../../../style/SatelliteVariableSelector.css';
import selectedSatelliteVariableAtom from '../../../clientState/selectedSatelliteVariable';
import useVariablesIndexQuery from '../../../serverState/variablesIndex';
import {ITileIdentifier} from '../../../types/layout';

const LOADING_VALUE = 'LOADING...';


const VariableSelector: React.FC<ITileIdentifier> = (props) => {
  const [selectedVariable, setSelectedVariable] = useRecoilState(
    selectedSatelliteVariableAtom({row: props.row, col: props.col}),
  );
  const variablesIndexQuery = useVariablesIndexQuery();

  const handleVariableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetValue = e.currentTarget.value;
    let stateValue: string | undefined;
    if (!targetValue || targetValue === LOADING_VALUE) {
      stateValue = undefined;
    } else {
      stateValue = targetValue;
    }
    setSelectedVariable(stateValue);
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
    variableOptions = (
      Object.entries(variablesIndexQuery.data)
      .filter(([variableName, params]) => !Object.keys(params).includes('enabled') || params['enabled'])
      .filter(([variableName, params]) => params['type'] === 'variable')
      .map(([variableName, params]) => (
        <option key={variableName} value={variableName}>
          {params['longname']}
        </option>
      ))
    );
  }

  const elementId = `variable-select-row${props.row}-col${props.col}`;
  return (
    <div className={'SatelliteVariableSelector'}>
      <label htmlFor={elementId}>{'Variable: '}</label>
      <select id={elementId} onChange={handleVariableChange} value={selectedVariable}>
        <option value={''} disabled hidden>{'Loading...'}</option>
        {variableOptions}
      </select>
    </div>
  );
}

export default VariableSelector
