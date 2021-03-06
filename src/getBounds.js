import map from 'lodash/map';
import min from 'lodash/min';
import max from 'lodash/max';
import flatten from 'lodash/flatten';
import L from 'leaflet';

const getCoords = (arr) => {
  if (!arr || !arr.length) return [];
  if (arr.length === 2 && typeof arr[1] === 'number') return [arr];
  if (arr[0].length && typeof arr[0][1] === 'number') return arr;
  if (arr[0][0].length && typeof arr[0][0][1] === 'number') return getCoords(flatten(arr));
  if (arr[0][0][0].length && typeof arr[0][0][0][1] === 'number') return getCoords(flatten(arr));
  return arr;
};

const getBounds = (points) => {
  let coords = [];
  map(points, (point) => {
    coords.push(point.geometry.coordinates);
  });
  const lats = [];
  const longs = [];
  map(coords, (coord) => {
    lats.push(coord[1]);
    longs.push(coord[0]);
  });
  const c1 = L.latLng(max(lats), max(longs));
  const c2 = L.latLng(min(lats), min(longs));
  return L.latLngBounds(c1, c2);
};

export default getBounds;

