import React, {useState} from 'react';

import {Rnd} from 'react-rnd';

import {IVariable} from '../../types/query/variables';
import {dataServerUrl} from '../../constants/dataServer';


interface ISlippyMapLegendProps {
  selectedSatelliteVariable: IVariable;
  selectedSweVariable: IVariable | undefined;
  mapUid: string;
  parentWidthPx: number;
}

const SlippyMapLegend: React.FC<ISlippyMapLegendProps> = (props) => {
  const [legendWidth, setLegendWidth] = useState<number>(0);

  const legendUrls = [`${dataServerUrl}/${props.selectedSatelliteVariable.legend_path}`];
  if (props.selectedSweVariable !== undefined) {
    legendUrls.push(`${dataServerUrl}/${props.selectedSweVariable.legend_path}`);
  }

  const legendElementId = `legend-${props.mapUid}`;
  const xPos = (props.parentWidthPx - legendWidth) / 2;
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
    <div
      id={legendElementId}
      style={{width: 'inherit'}}
      draggable={false}>
      {imageElements}
    </div>
  );

  // We must trigger the image element's `onLoad` to get its width _before_
  // setting default position on the Rnd component
  if (legendWidth === 0) {
    return legendElement;
  }
  return (
    <Rnd
      bounds='parent'
      lockAspectRatio={true}
      maxWidth={'100%'}
      default={{x: xPos, y: 650, width: 'auto', height: 'auto'}} >
      
      {legendElement}

    </Rnd>
  );

}
export default SlippyMapLegend;
