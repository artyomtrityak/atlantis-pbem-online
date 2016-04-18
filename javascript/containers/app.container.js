import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MapContainer from './map.container';


class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    //TODO: fetch login user status
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <MapContainer />
        <div style={{flex: 30}}>
          Details
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AppContainer);

