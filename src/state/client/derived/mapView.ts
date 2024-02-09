/* Derived state: The shared view used by all map tiles.
 *
 * Depends on server state to determine view extent.
 */

import {atom} from 'jotai';
import {atomFamily} from 'jotai/utils';

import View from 'ol/View'
import GeoJSON from 'ol/format/GeoJSON';
import {buffer} from 'ol/extent';


type AtomValue = View | undefined;
type AtomParameter = object | undefined;
export const mapViewAtomFamily = atomFamily(
  (selectedSuperRegionShape: AtomParameter) => {
    const atm = atom<AtomValue>((get) => {
      if (!selectedSuperRegionShape) {
        return;
      }

      const geoJsonGeometryFeatures = new GeoJSON().readFeatures(selectedSuperRegionShape);
      // TODO: Can we reinstate the 1 feature rule??
      // if (geoJsonGeometryFeatures.length !== 1) {
      //   throw new Error('GeoJSON should only include 1 feature.');
      // }
      if (geoJsonGeometryFeatures.length === 0) {
        throw new Error('GeoJSON should include >=1 features; found 0.');
      }
      const superRegionExtent = geoJsonGeometryFeatures[0].getGeometry()!.getExtent();

      const view = new View({
        projection: 'EPSG:3857',
        center: [-11686663, 4828794], // Colorado, roughly
        resolution: 1000,
        maxZoom: 14,
        extent: buffer(superRegionExtent, 350000),
        smoothExtentConstraint: true,
        showFullExtent: true,
      });
      return view;
    });
    // TODO: How to make unique
    atm.debugLabel = 'mapViewAtomFamily';
    return atm;
  }
);
