import React from 'react';
import { useAtom, useAtomValue } from 'jotai';

import '@src/style/SatelliteVariableSelector.css';
import { interactiveMapVariablesAtom } from '@src/state/client/derived/interactiveMapVariables';
import { INTERACTIVE_MAP_ROW_ID } from '@src/constants/layout';
import { selectedSatelliteVariableIdAtomFamily } from '@src/state/client/selectedSatelliteVariableId';

const InteractiveMapSatelliteVariableSelector: React.FC = () => {
  const [selectedSatelliteVariableId, setSelectedSatelliteVariableId] = useAtom(
    selectedSatelliteVariableIdAtomFamily({row: INTERACTIVE_MAP_ROW_ID, col: 1})
  );
  
  const availableVariables = useAtomValue(interactiveMapVariablesAtom);

  if (!availableVariables) {
    return <div className="spinner-border spinner-border-sm text-secondary" role="status" />;
  }

  const handleVariableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetValue = e.currentTarget.value;
    const stateValue = targetValue || undefined;
    setSelectedSatelliteVariableId(stateValue);
  }

  const longNameParam = 'longName';
  const variableOptions: Array<JSX.Element> = (
    Object.entries(availableVariables)
      .filter(([_variableId, params]) => params.layerType === 'raster')
      // .filter(([variableId]) => !(variableId === '77'))
      .map(([variableId, params]) => (
        <option key={variableId} value={variableId}>
          {`${params[longNameParam]} (${params.sensor}/${params.platform}/${params.algorithm})`}
        </option>
      ))
  );

  const elementId = `variable-select-interactive-map`;
  return (
    <div className={'SatelliteVariableSelectorHorizontal'}>
      <label htmlFor={elementId}>{'Variable: '}</label>
      <select id={elementId} onChange={handleVariableChange} value={selectedSatelliteVariableId}>
        <option value={''} disabled hidden>{'Loading...'}</option>
        {variableOptions}
      </select>
    </div>
  );
};

export default InteractiveMapSatelliteVariableSelector;
