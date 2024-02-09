import React from 'react';
import {useAtomValue} from 'jotai';

import {sspLegendsUrl, sweLegendsUrl} from '@src/constants/dataServer';
import {selectedSuperRegionIdAtom} from '@src/state/client/selectedSuperRegionId';
import {selectedSweVariableIdAtom} from '@src/state/client/selectedSweVariableId';


interface ISlippyMapLegendProps {
  selectedSatelliteVariableId: string;
}

const SlippyMapLegend: React.FC<ISlippyMapLegendProps> = (props) => {
  const selectedSuperRegionId = useAtomValue(selectedSuperRegionIdAtom);
  const selectedSweVariableId = useAtomValue(selectedSweVariableIdAtom);

  // TODO: Pass in JSON, don't calculate!
  const legendUrls = [`${sspLegendsUrl}/${selectedSuperRegionId}_${props.selectedSatelliteVariableId}.svg`];
  // TODO: Separate SWE and SSP legends into own components?
  if (selectedSweVariableId !== undefined) {
    legendUrls.push(`${sweLegendsUrl}/${selectedSweVariableId}.svg`);
  }

  const imageElements = legendUrls.map((u) => (
    <img src={u} key={u} />
  ));

  return (
    <div style={{display: 'flex', margin: '0 auto'}}>
      {imageElements}
    </div>
  );

}
export default SlippyMapLegend;
