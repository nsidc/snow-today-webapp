import React from 'react';
import {useRecoilState} from 'recoil';

import '../../style/VariableSelector.css';
import selectedVariableAtom from '../../clientState/selectedVariable';
import useVariablesIndex from '../../serverState/variablesIndex';

const LOADING_VALUE = 'LOADING...';


const stateFromTargetValue = (targetValue: string) => {
  if (targetValue === LOADING_VALUE) {
    return undefined;
  } else {
    return targetValue;
  }
}


const VariableSelector: React.FC = () => {
  const [selectedVariable, setSelectedVariable] = useRecoilState(selectedVariableAtom);
  const variablesIndexQuery = useVariablesIndex(setSelectedVariable);

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
        onChange={e => setSelectedVariable(stateFromTargetValue(e.currentTarget.value))}
      >
        {variableOptions}
      </select>
    </span>
  );
}

export default VariableSelector
