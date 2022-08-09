import React from 'react';
import {useRecoilState} from 'recoil';

import '../../style/VariableSelector.css';
import selectedRasterVariableAtom from '../../clientState/selectedRasterVariable';
import useVariablesIndex from '../../serverState/variablesIndex';

const LOADING_VALUE = 'LOADING...';


const VariableSelector: React.FC = () => {
  const [selectedVariable, setSelectedVariable] = useRecoilState(selectedRasterVariableAtom);
  const variablesIndexQuery = useVariablesIndex(setSelectedVariable);

  const handleVariableChange = (targetValue: string) => {
    let stateValue: string | undefined;
    if (targetValue === LOADING_VALUE) {
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
      <option key={'loading'} value={LOADING_VALUE}>{'Loading variables...'}</option>
    );
  } else {
    variableOptions = Object.entries(variablesIndexQuery.data).map(([key, params]) => {
      // TODO: type annotations
      return (
        <option key={String(key)} value={String(key)}>{(params as object)['longname']}</option>
      );
    });
  }

  return (
    <span className="VariableSelector">
      <label htmlFor={'variable-selector'}>Variable: </label>
      <select id={'variable-selector'}
        value={selectedVariable}
        onChange={e => handleVariableChange(e.target.value)}
      >
        {variableOptions}
      </select>
    </span>
  );
}

export default VariableSelector
