import React from 'react';
import uuid from 'uuid';
import map from 'lodash/map';
import cloneDeep from 'lodash/cloneDeep';
import reverse from 'lodash/reverse';
import { Marker, Tooltip } from 'react-leaflet';
import { clickPoint } from './clickShape';
import { tooltipClass, pointsTooltip } from './tooltipHelpers';

const points = (props) => {
  const markers = map(props.points, (result) => {
    const p = result.properties;
    const position = cloneDeep(result.geometry.coordinates);
    reverse(position);
    return (
      <Marker
        key={uuid.v4()}
        uuid={p.key || uuid.v4()}
        position={position}
        icon={props.markerIcon}
        onClick={clickPoint.bind(this, props)}
      >
        <Tooltip className={tooltipClass(props.tooltipOptions)}>
          <span>
            {JSON.stringify(p, null, '  ')}
          </span>
        </Tooltip>
      </Marker>
    );
  });
  return markers;
};

export default points;
