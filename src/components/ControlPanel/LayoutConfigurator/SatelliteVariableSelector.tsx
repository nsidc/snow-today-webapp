import React from 'react';
import {useAtom, useAtomValue} from 'jotai';

import '@src/style/SatelliteVariableSelector.css';
import {selectedSatelliteVariableIdAtomFamily} from '@src/state/client/selectedSatelliteVariableId';
import {selectedTileTypeAtomFamily} from '@src/state/client/selectedTileType';
import {availableVariablesAtom} from '@src/state/client/derived/availableVariables';
import {defaultVariableIdAtom} from '@src/state/client/derived/defaultVariableId';
import {ITileIdentifier} from '@src/types/layout';


const VariableSelector: React.FC<ITileIdentifier> = (props) => {
  const [
    selectedSatelliteVariableId,
    setSelectedSatelliteVariableId,
  ] = useAtom(selectedSatelliteVariableIdAtomFamily(props));
  const selectedTileType = useAtomValue(selectedTileTypeAtomFamily(props));
  const availableVariables = useAtomValue(availableVariablesAtom);
  const defaultVariableId = useAtomValue(defaultVariableIdAtom);
  console.debug(defaultVariableId);

  if (
    availableVariables === undefined
  ) {
    throw Error("Programmer error; this component should be wrapped in <Suspense>!");
  }

  const handleVariableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetValue = e.currentTarget.value;
    const stateValue = targetValue || undefined;
    setSelectedSatelliteVariableId(stateValue);
  }

  const longNameParam = selectedTileType === 'plot' ? 'longNamePlot' : 'longName';
  const variableOptions: Array<JSX.Element> = (
    Object.entries(availableVariables)
    .filter(([variableId, params]) => params.layerType === 'raster')
    .map(([variableId, params]) => (
      <option key={variableId} value={variableId}>
        {params[longNameParam]}
      </option>
    ))
  );

  const elementId = `variable-select-row${props.row}-col${props.col}`;
  return (
    <div className={'SatelliteVariableSelector'}>
      <label htmlFor={elementId}>{'Variable: '}</label>
      <select id={elementId} onChange={handleVariableChange} value={selectedSatelliteVariableId}>
        <option value={''} disabled hidden>{'Loading...'}</option>
        {variableOptions}
      </select>
    </div>
  );
}

export default VariableSelector
