import React, {useState} from 'react';
import {useAtomValue} from 'jotai';

import {IVariable} from '@src/types/query/variables';
import {legendsUrl} from '@src/constants/dataServer';
import {selectedSuperRegionIdAtom} from '@src/state/client/selectedSuperRegionId';


interface ISlippyMapLegendProps {
  selectedSatelliteVariableId: string;
  selectedSweVariable: IVariable | undefined;
}

const SlippyMapLegend: React.FC<ISlippyMapLegendProps> = (props) => {
  const [legendWidth, setLegendWidth] = useState<number>(0);

  const selectedSuperRegionId = useAtomValue(selectedSuperRegionIdAtom);

  // TODO: Pass in JSON, don't calculate!
  const legendUrls = [`${legendsUrl}/${selectedSuperRegionId}_${props.selectedSatelliteVariableId}.svg`];
  // TODO: SWE! IMO, as separate components.
  // if (props.selectedSweVariable !== undefined) {
  //   legendUrls.push(`${dataServerUrl}/${props.selectedSweVariable.legendPath}`);
  // }

  const imageElements = legendUrls.map((u) => (
    <img
      src={u}
      key={u}
      style={{width: 'inherit', display: 'block', margin: '0 auto'}}
      onLoad={(e: React.ChangeEvent<HTMLImageElement>) => {
        if (e.target.offsetWidth > legendWidth) {
          setLegendWidth(e.target.offsetWidth);
        }
      }} />
  ));

  return (
    <div style={{width: '100%'}}>
      {imageElements}
    </div>
  );

}
export default SlippyMapLegend;
