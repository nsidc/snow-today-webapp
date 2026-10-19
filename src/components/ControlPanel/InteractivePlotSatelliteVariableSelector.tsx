import React from 'react';
import { useAtom, useAtomValue } from 'jotai';

import '@src/style/SatelliteVariableSelector.css';
import { interactivePlotVariablesAtom } from '@src/state/client/derived/interactivePlotVariables';
import { INTERACTIVE_PLOT_ID } from '@src/constants/layout';
import { selectedSatelliteVariableIdAtomFamily } from '@src/state/client/selectedSatelliteVariableId';

const InteractivePlotSatelliteVariableSelector: React.FC = () => {
  const [selectedSatelliteVariableId, setSelectedSatelliteVariableId] = useAtom(
    selectedSatelliteVariableIdAtomFamily(INTERACTIVE_PLOT_ID)
  );
  
  const availableVariables = useAtomValue(interactivePlotVariablesAtom);

  if (!availableVariables) {
    return <div className="spinner-border spinner-border-sm text-secondary" role="status" />;
  }

  const handleVariableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetValue = e.currentTarget.value;
    const stateValue = targetValue || undefined;
    setSelectedSatelliteVariableId(stateValue);
  }

  const longNameParam = 'longNamePlot';
  const variableOptions: Array<JSX.Element> = (
    Object.entries(availableVariables)
      .filter(([variableId, params]) => params.layerType === 'raster')
      .filter(([variableId]) => !(variableId === '77'))
      .map(([variableId, params]) => (
        <option key={variableId} value={variableId}>
          {`${params[longNameParam]} (${params.sensor}/${params.platform}/${params.algorithm})`}
        </option>
      ))
  );

  const elementId = `variable-select-interactive-plot`;
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

export default InteractivePlotSatelliteVariableSelector;