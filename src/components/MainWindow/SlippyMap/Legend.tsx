import React, {useState} from 'react';
import {useAtomValue} from 'jotai';

import {IVariable} from '@src/types/query/variables';
import {legendsUrl} from '@src/constants/dataServer';
import {selectedSuperRegionIdAtom} from '@src/state/client/selectedSuperRegionId';


interface ISlippyMapLegendProps {
  // TODO: Do we need this?
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
  const legendElement = (
    <div style={{width: 'inherit'}}>
      {imageElements}
    </div>
  );

  // We must trigger the image element's `onLoad` to get its width _before_
  // setting default position on the Rnd component
  return (
    <>
      {legendElement}
    </>
  );

}
export default SlippyMapLegend;
