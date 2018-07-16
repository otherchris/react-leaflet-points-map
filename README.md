# react-leaflet-points-map

## Supported React versions

^15.6.1

## API

This package exports the `MapContainer` component that accepts the following
props:

### `center (array/object)`

Initial center of the map. Can be provided as
  - an array `[ <lat>, <lng> ]`
  - an object `{ lat: <lat>, lng: <lng> }`
  - a GeoJSON Point `{ "type": "Point", "coordinates": [ <lat>, <lng> ] }`
  - a GeoJSON Feature ```
    {
      "type": "Feature",
      "properties": { <props> },
      "geometry": { <GeoJSON Point> }
    }```

### `height (number)`

Pixel height of the map.

### `legend (func)`

Component to render beneath the map, useful for map legends.

### `onShapeChange (func)`

Callback triggered by state change in the container. Debounced at 100ms. Second
arg should be an (err, res) callback.

### `points (array)`

An array of points to be added as markers on the map. Points should be
provided either as a GeoJSON Point
feature (see [the feature specification](https://macwright.org/2015/03/23/geojson-second-bite.html#features)).

### `zoom (number)`

Inital zoom level of map. (see [Leaflet zoom levels](http://leafletjs.com/examples/zoom-levels/))

