import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import merge from 'lodash/merge';
import map from 'lodash/map';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';
import {
  Map,
  TileLayer,
  GeoJSON,
  Tooltip,
} from 'react-leaflet';
import './leaflet.css';
import './leaflet.draw.css';
import onTileSet from './onTileSet';
import {
  makeCenterLeaflet,
  generateIcon,
  zoomToShapes,
} from './MapHelpers';
import defaultIcon from './defaultIcon';
import cleanProps from './cleanProps';
import points from './points';
import './main.css';

const defaultCenter = {
  type: 'Point',
  coordinates: [-85.751528, 38.257222],
};

const MapComponent = (props) => {
  const {
    tileLayerProps, height, tooltipOptions = {},
  } = props;

  const satButton = (
    <button type="button" className="btn btn-secondary btn-sm maps-tiles"
      id="sat" onClick={onTileSet.bind(this, props)}
    >
     Satellite View
    </button>
  );
  const zoomButton = props.features.length > 0 || props.points.length > 0 ? (
    <button type="button" className="zoom-button btn btn-secondary btn-sm"
      onClick={zoomToShapes.bind(this, props, props.bindPoint)}
    >
      Zoom to shapes
    </button>
  ) : '';
  const streetButton = (
    <button type="button" className="btn btn-secondary btn-sm maps-tiles"
      id="street" onClick={onTileSet.bind(this, props)}
    >
     Street View
    </button>
  );
  cleanProps(props, props.onShapeChange, noop);
  zoomToShapes(props, props.bindPoint);
  const center = (props.center && props.center.lat) ?
    makeCenterLeaflet(props.center) :
    makeCenterLeaflet(defaultCenter);
  return (
    <div>
      <Map
        ref={m => { props.setBindPoint(m, props); }}
        style={{ height }}
        minZoom = {3}
        maxZoom = {18}
        center = {center}
        zoom = {props.zoom || 9}
      >
        <TileLayer
          url={tileLayerProps.url}
          attribution={tileLayerProps.attribution}
          subdomains= {tileLayerProps.subdomains}
        />
        {points(props)}
        <div className="map-btn-group btn-group">
          {zoomButton}
          {props.tileLayerProps.url === 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' ?
            satButton :
            streetButton
          }
        </div>
      </Map>
    </div>
  );
};

MapComponent.propTypes = {
  bindPoint: PropTypes.object,
  bounds: PropTypes.array,
  center: PropTypes.object,
  clickPoly: PropTypes.func,
  edit: PropTypes.bool,
  geolocate: PropTypes.bool,
  handleSubmit: PropTypes.func,
  height: PropTypes.number,
  hoveredStyle: PropTypes.object,
  includeZipRadius: PropTypes.bool,
  markerIcon: PropTypes.object,
  legendComponent: PropTypes.func,
  legendProps: PropTypes.object,
  makeCircle: PropTypes.func,
  makeCircleOn: PropTypes.bool,
  maxArea: PropTypes.number,
  onCreated: PropTypes.func,
  onLocationSelect: PropTypes.func,
  onTileSet: PropTypes.func,
  openFeature: PropTypes.bool,
  points: PropTypes.arrayOf(PropTypes.object),
  features: PropTypes.arrayOf(PropTypes.object),
  radiusChange: PropTypes.func,
  refresh: PropTypes.string,
  remove: PropTypes.bool,
  removeAllFeatures: PropTypes.func,
  setCenter: PropTypes.arrayOf(PropTypes.number),
  setCenterAndZoom: PropTypes.func,
  style: PropTypes.object,
  submitText: PropTypes.string,
  tileLayerProps: PropTypes.object,
  tooltipOptions: PropTypes.object,
  totalArea: PropTypes.number,
  unit: PropTypes.string,
  update: PropTypes.string,
  zipRadiusChange: PropTypes.func,
  zoom: PropTypes.number,
  zoomToShapes: PropTypes.func,
};

MapComponent.defaultProps = {
  bindPoint: {},
  center: defaultCenter,
  features: [],
  featureValidator: () => [],
  height: 400,
  legendComponent: noop,
  makeCircleOn: false,
  markerIcon: generateIcon(defaultIcon),
  onShapeChange: (a, cb) => { cb(null, a); },
  points: [],
  remove: false,
  tileLayerProps: {
    url: 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  },
  zoom: 9,
};
export default MapComponent;
