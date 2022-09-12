import React from 'react';
import {useRecoilState} from 'recoil';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import selectedSatelliteVariableAtom from '../../../clientState/selectedSatelliteVariable';
import useVariablesIndexQuery from '../../../serverState/variablesIndex';
import {ITileIdentifier} from '../../../types/layout';

const LOADING_VALUE = 'LOADING...';


const VariableSelector: React.FC<ITileIdentifier> = (props) => {
  const [selectedVariable, setSelectedVariable] = useRecoilState(
    selectedSatelliteVariableAtom({row: props.row, col: props.col}),
  );
  const variablesIndexQuery = useVariablesIndexQuery();

  const handleVariableChange = (targetValue: string | null) => {
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
      <Dropdown.Item key={LOADING_VALUE} value={LOADING_VALUE}>
        {'Loading variables...'}
      </Dropdown.Item>
    );
  } else {
    variableOptions = (
      Object.entries(variablesIndexQuery.data)
      .filter(([variableName, params]) => !Object.keys(params).includes('enabled') || params['enabled'])
      .map(([variableName, params]) => (
        <Dropdown.Item key={variableName} eventKey={variableName} active={variableName === selectedVariable}>
          {params['longname']}
        </Dropdown.Item>
      ))
    );
  }

  return (
    <DropdownButton title='Select a Satellite Variable' onSelect={handleVariableChange}>
      {variableOptions}
    </DropdownButton>
  );
}

export default VariableSelector
