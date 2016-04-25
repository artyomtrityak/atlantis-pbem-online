import React from 'react';


const ZoomComponent = (props) => {
  return (
    <div className="atl-map-zoom">
      <i className="fa fa-plus-square-o" onClick={props.onZoomIn}></i>
      <i className="fa fa-minus-square-o" onClick={props.onZoomOut}></i>
    </div>
  );
};

export default ZoomComponent;
