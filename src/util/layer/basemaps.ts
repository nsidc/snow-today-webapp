// TODO: Rename this module to baseLayers?
import BaseLayer from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

import _memoize from 'lodash/memoize';

import {
  getArcGisBasemapSource,
  getUsgsBasemapSource,
} from './source';


// TODO: Don't use titles as IDs anymore (NOTE: We're not using the source ID
// because those aren't necessarily unique)
export type BasemapTitle =
  | "USGS Topographic"
  | "USGS Topographic + Imagery"
  | "USGS Imagery"
  | "USGS Shaded Relief"
  | "USGS Hydro Cached"
  | "ArcGIS Dark Gray"
  | "ArcGIS Dark Gray Reference"  // TODO: Remove?
  | "ArcGIS Dark Gray Base"  // TODO: Remove?
  | "ArcGIS Dark Gray - Base only"
  | "ArcGIS National Geographic"
  | "ArcGIS World Topographic"

interface ISourceAttrs {
  id: string;
  fn: (id: any) => XYZ;
}
interface IBasemapAttrs {
  title: BasemapTitle;
  visible: boolean;
  sourceInfo?: ISourceAttrs;
  // For when multiple sources must be combined
  children?: IBasemapAttrs[];
}


// TODO: Extract to constant
const basemapsInfo: IBasemapAttrs[] = [
  // USGS Basemaps
  {
    title: 'USGS Topographic',
    sourceInfo: {
      id: 'USGSTopo',
      fn: getUsgsBasemapSource,
    },
    visible: false,
  },
  {
    title: 'USGS Topographic + Imagery',
    sourceInfo: {
      id: 'USGSImageryTopo',
      fn: getUsgsBasemapSource,
    },
    visible: false,
  },
  {
    title: 'USGS Imagery',
    sourceInfo: {
      id: 'USGSImageryOnly',
      fn: getUsgsBasemapSource,
    },
    visible: true,
  },
  {
    title: 'USGS Shaded Relief',
    sourceInfo: {
      id: 'USGSShadedReliefOnly',
      fn: getUsgsBasemapSource,
    },
    visible: false,
  },
  {
    title: 'USGS Hydro Cached',
    sourceInfo: {
      id: 'USGSHydroCached',
      fn: getUsgsBasemapSource,
    },
    visible: false,
  },

  // ArcGIS Basemaps
  // {
  //   title: 'ArcGIS Light Gray',
  //   visible: false,
  //   children: [
  //     {
  //       title: 'ArcGIS Light Gray Base',
  //       sourceInfo: {
  //         id: 'Canvas/World_Light_Gray_Base',
  //         fn: getArcGisBasemapSource,
  //       },
  //       visible: true,
  //     },
  //     {
  //       title: 'ArcGIS Light Gray Reference',
  //       sourceInfo: {
  //         id: 'Canvas/World_Light_Gray_Reference',
  //         fn: getArcGisBasemapSource,
  //       },
  //       visible: true,
  //     },
  //   ],
  // },
  // {
  //   title: 'ArcGIS Light Gray - Base only',
  //   sourceInfo: {
  //     id: 'Canvas/World_Light_Gray_Base',
  //     fn: getArcGisBasemapSource,
  //   },
  //   visible: false,
  // },
  {
    title: 'ArcGIS Dark Gray',
    visible: false,
    children: [
      {
        title: 'ArcGIS Dark Gray Base',
        sourceInfo: {
          id: 'Canvas/World_Dark_Gray_Base',
          fn: getArcGisBasemapSource,
        },
        visible: true,
      },
      {
        title: 'ArcGIS Dark Gray Reference',
        sourceInfo: {
          id: 'Canvas/World_Dark_Gray_Reference',
          fn: getArcGisBasemapSource,
        },
        visible: true,
      },
    ],
  },
  {
    title: 'ArcGIS Dark Gray - Base only',
    sourceInfo: {
      id: 'Canvas/World_Dark_Gray_Base',
      fn: getArcGisBasemapSource,
    },
    visible: false,
  },
  {
    title: 'ArcGIS National Geographic',
    sourceInfo: {
      id: 'NatGeo_World_Map',
      fn: getArcGisBasemapSource,
    },
    visible: false,
  },
  {
    title: 'ArcGIS World Topographic',
    sourceInfo: {
      id: 'World_Topo_Map',
      fn: getArcGisBasemapSource,
    },
    visible: false,
  },
];

// NOTE: Children are not included here. Could probably use clearer
// nomenclature.
export const basemapTitles: Array<BasemapTitle> = basemapsInfo.map(
  (basemapInfoEntry) => basemapInfoEntry['title']
);


const makeBasemaps = (basemapsInfoArray: IBasemapAttrs[]): BaseLayer[] => (
  basemapsInfoArray.map((basemapOrGroup: IBasemapAttrs) => {
    if (basemapOrGroup.children !== undefined) {
      return new LayerGroup({
        properties: {
          title: basemapOrGroup['title'],
          type: 'basemap',
        },
        layers: makeBasemaps(basemapOrGroup['children']),
        visible: basemapOrGroup['visible'],
      });
    }
    else if (basemapOrGroup.sourceInfo !== undefined) {
      return new TileLayer({
        properties: {
          title: basemapOrGroup['title'],
          type: 'basemap',
        },
        source: basemapOrGroup['sourceInfo']['fn'](basemapOrGroup['sourceInfo']['id']),
        visible: basemapOrGroup['visible'],
      });
    }
    else {
      throw new Error('Either `sourceInfo` or `children` must be populated for every entry.');
    }
  })
);


const basemaps = _memoize((mapId: string): BaseLayer[] => makeBasemaps(basemapsInfo));


export const basemapLayerGroup = _memoize((mapId: string): LayerGroup => (
  new LayerGroup({
    properties: {
      title: 'All Basemaps',
    },
    layers: basemaps(mapId),
    visible: true,
  })
));

export const basemapLayers = _memoize((mapId: string): Array<BaseLayer> => (
  basemapLayerGroup(mapId).getLayers().getArray()
));
export const basemapLayersByName = _memoize((mapId: string): Map<string, BaseLayer> => (
  new Map(basemapLayers(mapId).map(layer => [layer.get('title') as string, layer]))
));
