import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import RegionDetails from 'javascript/components/region-details';


class DetailsContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="atl-details-container col-md-4">
        <RegionDetails {...this.props.map.userMap.regions[this.props.map.selectedHexId]} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { map } = state;
  return { map };
}

export default connect(mapStateToProps)(DetailsContainer);

