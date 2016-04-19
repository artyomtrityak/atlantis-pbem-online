import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PIXI from 'pixi.js/bin/pixi';
import { loadMapDataAction } from 'javascript/actions/map.actions';
import { animate } from 'javascript/utils';


class MapContainer extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    let renderer = new PIXI.CanvasRenderer(
      this.refs.map.offsetWidth,
      this.refs.map.offsetHeight,
      {backgroundColor : 0x000fff}
    );
    this.refs.map.appendChild(renderer.view);

    let stage = new PIXI.Container();
    let container = new PIXI.Container();
    stage.addChild(container);


    for (let j = 0; j < 10; j++) {
      for (let i = 0; i < 10; i++) {
        let hex = new PIXI.Sprite(PIXI.loader.resources.hex.texture);
        if (j % 2) {
          hex.x = 140 * i + 150;
          hex.y = 40 * j;
        } else {
          hex.x = 140 * i + 80;
          hex.y = 40 * j;
        }

        container.addChild(hex);
      }
    }

    container.x = 0;
    container.y = 10;

    setTimeout(() => {
      container.x = -100;
    }, 4000);

    animate(renderer, stage);
  }

  componentWillReceiveProps(nextProps) {
    console.log('next:', nextProps);
  }

  render() {
    return (
      <div ref="map" style={{flex: 1}}></div>
    );
  }
}

function mapStateToProps(state) {
  const { map } = state;
  return { map };
}

export default connect(mapStateToProps)(MapContainer);
