import React from 'react';
import {useAtomValue} from 'jotai';

import {sspDataUrl, sweLegendsUrl} from '@src/constants/dataServer';
import {selectedSweVariableIdAtom} from '@src/state/client/selectedSweVariableId';
import {IRichSuperRegionVariable} from '@src/types/query/variables';


interface ISlippyMapLegendProps {
  selectedSatelliteVariable: IRichSuperRegionVariable;
}

const SlippyMapLegend: React.FC<ISlippyMapLegendProps> = (props) => {
  const selectedSweVariableId = useAtomValue(selectedSweVariableIdAtom);

  const legendUrls = [`${sspDataUrl}/${props.selectedSatelliteVariable.legendRelativePath}`];
  // TODO: Separate SWE and SSP legends into own components?
  // TODO: Get SWE from separate super-region files. We currently are asking
  //       SWE to be sent with super-region IDs matching snow surface
  //       properties data.
  // TODO: Pass in JSON, don't calculate! We need a concept of a dedicated SWE
  //       variables.json file. Currently, SWE legends only vary by variable,
  //       not by region and variable like SSP legends.
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
