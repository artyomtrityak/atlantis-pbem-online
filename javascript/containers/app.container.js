import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MapContainer from './map.container';
import Navbar from 'javascript/components/navbar';

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
      <div className="atl-app-container">
        <Navbar />

        <div className="row" style={{flex: 1, paddingTop: '1rem'}}>
          {this.props.map.initialized ? <MapContainer /> : null}
          <div className="col-md-4">
            Details
          </div>
        </div>
        <footer className="footer">
          <p>&copy; Company 2016</p>
        </footer>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { map } = state;
  return { map };
}

export default connect(mapStateToProps)(AppContainer);

