import React from 'react';


const RegionDetailsComponent = (props) => {
  if (!props.details) {
    return null;
  }

  //TODO: change key and add styles
  return (
    <div>
      <h3>{props.title}</h3>
      {props.details.map((line, i) => {
        return (
          <div key={i}>{line}</div>
        );
      })}
    </div>
  );
};

export default RegionDetailsComponent;
