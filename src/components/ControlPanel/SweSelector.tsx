import React from 'react';
import {useAtom} from 'jotai';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import {selectedSweVariableNameAtom} from '@src/state/client/selectedSweVariableName';
import useVariablesIndexQuery from '@src/serverState/variablesIndex';


const LOADING_VALUE = 'LOADING...';

const BasemapSelector: React.FC = () => {
  const [
    selectedSweVariableName,
    setSelectedSweVariableName,
  ] = useAtom(selectedSweVariableNameAtom);
  // NOTE: Anonymous function is a hack to deal with race condition
  // initializing component state (e.g. tile layout) from variables index.
  // TODO: Switch to using Jotai query 
  const variablesIndexQuery = useVariablesIndexQuery(() => null);

  const handleSelect = (eventKey: string | null): void => {
    if (!eventKey) {
      setSelectedSweVariableName(undefined);
      return;
    }
    setSelectedSweVariableName(eventKey);
  };

  if (variablesIndexQuery.isError) {
    console.debug(`Error!: ${variablesIndexQuery.error as string}`);
    return (
      <span>{`Error: ${variablesIndexQuery.error as string}`}</span>
    );
  }

  let variableOptions: JSX.Element | Array<JSX.Element>;
  if (variablesIndexQuery.isLoading) {
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
