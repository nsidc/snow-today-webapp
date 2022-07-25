/* Utilities for layer switching
 *
 * Functions adapted from:
 *     https://github.com/walkermatt/ol-layerswitcher/blob/4177642863dc4cf38989fb071d4b1c6baad29a07/src/ol-layerswitcher.ts
 * Original code MIT (c) Matt Walker
 */
import BaseLayer from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import PluggableMap from 'ol/PluggableMap';


// const isBaseGroup = (grp: LayerGroup): boolean => {
// 	if (grp instanceof LayerGroup) {
// 		const lyrs = grp.getLayers().getArray();
// 		return lyrs.length > 0 && lyrs[0].get('type') === 'base';
// 	} else {
// 		return false;
// 	}
// }

const forEachRecursive_ = (
	lyr: PluggableMap | LayerGroup,
	fn: (lyr: BaseLayer, idx: number, arr: BaseLayer[]) => void
): void => {
	lyr.getLayers().forEach(function (lyr, idx, a) {
		fn(lyr, idx, a);
		if (lyr instanceof LayerGroup) {
			forEachRecursive_(lyr, fn);
		}
	});
}

export const setLayerVisibility = (
	openLayersMap: PluggableMap,
	layer: BaseLayer,
	visible: boolean,
): void => {
	// console.log(layer.get('title'), visible, groupSelectStyle);
	layer.setVisible(visible);

	// If we're making a basemap layer visible, also hide all other basemap
  // layers.
	// Base layers are _mutually exclusive_.
	if (visible && layer.get('type') === 'basemap') {
		forEachRecursive_(openLayersMap, function (l, _idx, _arr) {
			if (l !== layer && l.get('type') === 'basemap') {
				l.setVisible(false);
			}
		});
	}

	// If we're updating visibility of a group, set its children the same.
	if (layer instanceof LayerGroup) {
		layer.getLayers().forEach((l) => {
			setLayerVisibility(openLayersMap, l, layer.getVisible());
		});
	}
}
