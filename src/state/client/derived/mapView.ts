/* Derived state: The shared view used by all map tiles.
 *
 * Depends on server state to determine view extent.
 */

import {selectorFamily} from 'recoil';
import View from 'ol/View'
import GeoJSON from 'ol/format/GeoJSON';
import {buffer} from 'ol/extent';


type AtomValue = View | undefined;
type AtomParameter = object | undefined;
// TODO: Remove ts-ignore and figure out a better design for this atom
// @ts-ignore: TS2344
const mapViewAtom = selectorFamily<AtomValue, AtomParameter>({
  key: 'mapView',
  get: (selectedSuperRegionShape: AtomParameter) => ({get}) => {
    if (!selectedSuperRegionShape) {
      return;
    }

    const geoJsonGeometryFeatures = new GeoJSON().readFeatures(selectedSuperRegionShape);
    if (geoJsonGeometryFeatures.length !== 1) {
      throw new Error('GeoJSON should only include 1 feature.');
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
  },
  // WARNING: We allow mutability because openlayers mutates view objects, but
  // Recoil freezes state objects. If this is disabled, openlayers breaks with
  // confusing errors because Recoil froze the layer object.
  dangerouslyAllowMutability: true,
});

export default mapViewAtom;
