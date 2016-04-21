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
    console.log(this.refs.map.offsetWidth);

    this.mapRenderer = new PIXI.CanvasRenderer(
      this.refs.map.offsetWidth,
      this.refs.map.offsetHeight,
      {backgroundColor : 0x808080}
    );
    this.rootStage = new PIXI.Container();
    this.mapContainer = new PIXI.Container();
    this.rootStage.hitArea = new PIXI.Rectangle(
      0, 0, this.refs.map.offsetWidth, this.refs.map.offsetHeight
    );
    this.rootStage.interactive = true;
    this.rootStage.buttonMode = true;

    this.renderHexes();

    //this.mapContainer.x = 0;
    //this.mapContainer.y = 0;

    this.rootStage.addChild(this.mapContainer);
    this.refs.map.appendChild(this.mapRenderer.view);

    this.rootStage
      .on('mousedown', (event) => {
        //drag start
        console.log('start', this);
        
        this.dragStart = true;
        this.startX = this.mapRenderer.plugins.interaction.mouse.global.x;
        this.startY = this.mapRenderer.plugins.interaction.mouse.global.y;
        console.log(this.mapRenderer.plugins.interaction.mouse.global);
      })
      .on('mouseup', () => {
        //drag end
        this.dragStart = false;
      })
      //.on('mouseupoutside', onDragEnd)
      .on('mousemove', (data) => {
        //move
        if (!this.dragStart) {
          return;
        }

        let offsetX = this.mapRenderer.plugins.interaction.mouse.global.x - this.startX;
        let offsetY = this.mapRenderer.plugins.interaction.mouse.global.y - this.startY;
        
        this.startX = this.mapRenderer.plugins.interaction.mouse.global.x;
        this.startY = this.mapRenderer.plugins.interaction.mouse.global.y;

        this.mapContainer.x = this.mapContainer.x + offsetX;
        this.mapContainer.y = this.mapContainer.y + offsetY;
        
      });

    //Start animation
    animate(this.mapRenderer, this.rootStage);
  }

  componentWillReceiveProps(nextProps) {
    console.log('next:', nextProps);
  }

  onHexClick(hex, eventData) {
    let border = new PIXI.Sprite(PIXI.loader.resources.hex.texture);
    border.x = 10;
    border.y = 10;
    //TODO: add border (selected) texture
    hex.addChild(border);
    setTimeout(() => {
      hex.removeChildAt(0);
    }, 5000);
  }

  renderHexes() {
    this.props.map.userMap.forEach((tile) => {
      let hex = new PIXI.Sprite(PIXI.loader.resources.hex.texture);
      hex.interactive = true;
      console.log(hex.width, hex.height);

      let posX = tile.x/2;
      let posY = tile.y/2;
      hex.x = posX * 100 + posX * 40;
      //TODO: 86 -> 100
      hex.y = posY * 86;

      this.mapContainer.addChild(hex);
      hex.on('mousedown', this.onHexClick.bind(this, hex));
    });
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
