/* eslint-disable no-use-before-define */

import cloneDeep from 'lodash/cloneDeep';
import map from 'lodash/map';
import merge from 'lodash/merge';
import pick from 'lodash/pick';
import reduce from 'lodash/reduce';
import noop from 'lodash/noop';

import { incForce, makeCenterLeaflet, makePoint, areaAccumulator } from './MapHelpers';
import { cleanPoint } from './clean';

// Pass in all props every time
export const cleanPropsFunc = (props) => {
  const p = cloneDeep(props);
  if (document.querySelector('a.leaflet-draw-edit-remove')) {
    const el = document.querySelector('a.leaflet-draw-edit-remove');
    el.onclick = () => {
      p.remove = !props.remove;
      cleanProps(p, props.onShapeChange, noop);
    };
    el.classname = 'leaflet-draw-edit-remove';
  }
  const center = makeCenterLeaflet(makePoint(props.center));
  const points = p.points || [];
  const pnts = map(points, (x) => cleanPoint(x));
  const ess = merge(p, {
    center,
  });
  ess.points = pnts;
  ess.bindPoint = (p.bindPoint && p.bindPoint.leafletMap) ? p.bindPoint : {};
  const a = pick(ess, [
    'center',
    'points',
    'tileLayerProps',
    'zoom',
  ]);
  return a;
  // this.maybeZoomToShapes();
};

const cleanProps = (props, update, cb) => {
  update(cloneDeep(cleanPropsFunc(props)), cb);
};

export default cleanProps;
