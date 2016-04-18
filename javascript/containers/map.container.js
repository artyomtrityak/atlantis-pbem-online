import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadMapDataAction } from 'javascript/actions/map.actions';


class MapContainer extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadMapDataAction());
  }

  componentWillReceiveProps(nextProps) {
    console.log('next:', nextProps);
    //TODO: run PIXI code
  }

  render() {
    return (
      <div style={{flex: 70}} ref="map">
        Map
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { map } = state;
  return { map };
}

export default connect(mapStateToProps)(MapContainer);
