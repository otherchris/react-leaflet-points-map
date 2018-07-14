import React from 'react';
import omit from 'lodash/omit';
import each from 'lodash/each';
import noop from 'lodash/noop';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import MapComponent from './MapComponent';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bindPoint: 'm', mapState: { ...props } };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !isEqual(nextProps.points, this.props.points) ||
      !isEqual(nextProps.extraProps, this.props.extraProps) ||
      !isEqual(nextProps.tileLayerProps, this.props.tileLayerProps)) {
      return true;
    }
    if (!isEqual(this.state.bindPoint, nextState.bindPoint)) return true;
    return false;
  }

  setBindPoint(m) {
    if (this.state.bindPoint === 'm') {
      this.setState({ bindPoint: m });
    }
  }

  render() {
    const extraProps = {};
    each(this.props.extraProps, (p) => { extraProps[p] = this.props[p]; });
    return (
      <MapComponent
        {...cloneDeep(omit(this.props, 'extraProps'))}
        {...extraProps}
        bindPoint={this.state.bindPoint}
        setBindPoint={this.setBindPoint.bind(this)}
      />
    );
  }
}

MapContainer.defaultProps = {
  onShapeChange: noop,
};

export default MapContainer;
