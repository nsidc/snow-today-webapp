import React from 'react';
import {useAtom, useAtomValue} from 'jotai';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import {selectedSweVariableNameAtom} from '@src/state/client/selectedSweVariableName';
import {variablesIndexQueryAtom} from '@src/state/server/variablesIndex';


const LOADING_VALUE = 'LOADING...';

const BasemapSelector: React.FC = () => {
  const [
    selectedSweVariableName,
    setSelectedSweVariableName,
  ] = useAtom(selectedSweVariableNameAtom);
  const variablesIndexQuery = useAtomValue(variablesIndexQueryAtom);

  const handleSelect = (eventKey: string | null): void => {
    if (!eventKey) {
      setSelectedSweVariableName(undefined);
      return;
    }
    setSelectedSweVariableName(eventKey);
  };

  if (variablesIndexQuery.isError) {
    console.debug(`Error!: ${variablesIndexQuery.error}`);
    return (
      <span>{`Error: ${variablesIndexQuery.error}`}</span>
    );
  }

  // TODO: More elegant way of checking for success. Without the success check,
  // even though we checked for loading and error, typescript thinks .data can
  // be undefined.
  let variableOptions: JSX.Element | Array<JSX.Element>;
  if (variablesIndexQuery.isLoading || !variablesIndexQuery.isSuccess) {
    variableOptions = [
      <Dropdown.Item key={LOADING_VALUE} eventKey={LOADING_VALUE}>
        {'Loading variables...'}
      </Dropdown.Item>
    ];
  } else {
    variableOptions = (
      Object.entries(variablesIndexQuery.data)
      .filter(([variableName, params]) => !Object.keys(params).includes('enabled') || params['enabled'])
      .filter(([variableName, params]) => params['type'] === 'point_swe')
      .map(([variableName, params]) => (
        <Dropdown.Item
          key={variableName}
          eventKey={variableName}
          active={variableName === selectedSweVariableName}>
          {params['longname']}
        </Dropdown.Item>
      ))
    );
  }
  variableOptions.unshift(
    <Dropdown.Item
      key={'undefined'}
      eventKey={undefined}
      active={selectedSweVariableName === undefined}>
      None
    </Dropdown.Item>
  );

  return (
    <DropdownButton title={'Select SWE Overlay'} onSelect={handleSelect}>
      {variableOptions}
    </DropdownButton>
  );
}

export default BasemapSelector;
