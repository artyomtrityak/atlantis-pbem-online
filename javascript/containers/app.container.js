import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MapContainer from './map.container';

import 'assets/styles/index.scss';

import { loadMapDataAction } from 'javascript/actions/map.actions';


class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    //TODO: fetch login user status during loadMapDataAction
    dispatch(loadMapDataAction());
  }

  render() {
    return (
      <div style={{display: 'flex', height: '98vh'}}>
        <div style={{flex: 70, display: 'flex', margin: 10}}>
          {/*Instead of null draw dump map with Register / Login btn*/}
          {this.props.map.initialized ? <MapContainer /> : null}
        </div>
        <div style={{flex: 30, display: 'flex', margin: 10}}>
          Details
          <button type="button" className="close" ariaLabel="Close">
            <span ariaHidden="true">&times;</span>
            <i className="fa fa-github"></i>
          </button>
          
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { map } = state;
  return { map };
}

export default connect(mapStateToProps)(AppContainer);

