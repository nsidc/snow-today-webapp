/* Utilities for layer switching
 *
 * Functions adapted from:
 *     https://github.com/walkermatt/ol-layerswitcher/blob/4177642863dc4cf38989fb071d4b1c6baad29a07/src/ol-layerswitcher.ts
 * Original code MIT (c) Matt Walker
 */
import BaseLayer from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import PluggableMap from 'ol/PluggableMap';


const disableDeselectedBasemapLayersRecursive_ = (
  mapOrLayer: PluggableMap | LayerGroup,
  visibleLayer: BaseLayer,
): void => {
  /* Ensure the only visible basemap is `visibleBasemapLayer`.
   *
   * `mapOrLayer` is expected to be a PluggableMap on the first call, and a
   * LayerGroup on all subsequent calls.
   */

  // Iterate over all layers *and layer groups* within `mapOrLayer`:
  mapOrLayer.getLayers().forEach((childLayer, idx, arr_) => {
    // Avoid making visible and recursing into `visibleLayer`:
    if (childLayer === visibleLayer) {
      return;
    }

    if (childLayer.get('type') === 'basemap') {
      console.debug(`Hiding layer ${childLayer.get('title') as string}`);
      childLayer.setVisible(false);
    }
    if (childLayer instanceof LayerGroup) {
      console.debug(`Recursing into group ${childLayer.get('title') as string}`);
      disableDeselectedBasemapLayersRecursive_(childLayer, visibleLayer);
    }
  });
}

export const showBasemapLayer = (
  openLayersMap: PluggableMap,
  layer: BaseLayer,
): void => {
  /* Show a basemap layer, and hide all others.
   *
   * There must be exactly one basemap visible at all times.
   */
  if (layer.get('type') !== 'basemap') {
    throw 'Expected a basemap layer. This is a bug.'
  }

  console.debug(`Showing layer ${layer.get('title') as string}`);
  layer.setVisible(true);

  // Hide all other basemap layers
  disableDeselectedBasemapLayersRecursive_(openLayersMap, layer);

  // If layer is a group, ensure its children are visible.
  if (layer instanceof LayerGroup) {
    layer.getLayers().forEach((childLayer) => {
      childLayer.setVisible(true);
    });
  }
  layer.setVisible(true);
}
