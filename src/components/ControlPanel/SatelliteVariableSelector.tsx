import React from 'react';
import {useRecoilState} from 'recoil';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import selectedSatelliteVariableAtom from '../../clientState/selectedSatelliteVariable';
import useVariablesIndex from '../../serverState/variablesIndex';

const LOADING_VALUE = 'LOADING...';


const VariableSelector: React.FC = () => {
  const [selectedVariable, setSelectedVariable] = useRecoilState(selectedSatelliteVariableAtom);
  const variablesIndexQuery = useVariablesIndex(setSelectedVariable);

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
    variableOptions = Object.entries(variablesIndexQuery.data).map(([variableName, params]) => (
      <Dropdown.Item eventKey={variableName} active={variableName === selectedVariable}>
        {params['longname']}
      </Dropdown.Item>
    ));
  }

  return (
    <DropdownButton title='Select a Satellite Variable' onSelect={handleVariableChange}>
      {variableOptions}
    </DropdownButton>
  );
}

export default VariableSelector
