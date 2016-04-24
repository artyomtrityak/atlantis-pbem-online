import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PIXI from 'pixi.js/bin/pixi';
import { updateMapPosition, selectHex } from 'javascript/actions/map.actions';
import { animate } from 'javascript/utils';

import ZoomComponent from 'javascript/components/map-zoom';


let HEX_MAP = {},
    HEX_SELECTION = null;


class MapContainer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    if (this.mapRenderer) {
      this.mapRenderer.destroy(true);
      HEX_MAP = {};
    }

    this.mapRenderer = new PIXI.CanvasRenderer(
      this.refs.map.offsetWidth, this.refs.map.offsetHeight, {backgroundColor : 0x808080}
    );

    //Initialize root stage container and bind map actions mouse events
    this.rootStage = new PIXI.Container();
    this.rootStage.interactive = true;
    this.rootStage.buttonMode = true;
    this.rootStage.hitArea = new PIXI.Rectangle(0, 0, this.refs.map.offsetWidth, this.refs.map.offsetHeight);
    this.rootStage
      .on('mousedown', this.onMouseDown.bind(this))
      .on('mouseup', this.onMouseUp.bind(this))
      .on('mousemove', this.onMouseMove.bind(this));

    //Initialize map container and set base x,y position
    this.mapContainer = new PIXI.Container();
    this.mapContainer.x = this.props.map.posX;
    this.mapContainer.y = this.props.map.posY;

    //Render available to user map from report
    this.renderHexes();

    //Attach maps to DOM
    this.rootStage.addChild(this.mapContainer);
    this.refs.map.appendChild(this.mapRenderer.view);

    //Start animation
    animate(this.mapRenderer, this.rootStage);
  }

  componentWillReceiveProps(nextProps) {
    console.log('next:', nextProps);
    //Set x,y position to map
    this.mapContainer.x = nextProps.map.posX;
    this.mapContainer.y = nextProps.map.posY;

    //Select / unselect hex if something changed
    if (this.props.map.selectedHexId !== nextProps.map.selectedHexId) {
      this.selectHex(nextProps.map.selectedHexId);
    }
  }

  selectHex(selectedHexId) {
    //Unselect previous selection
    if (this.props.map.selectedHexId) {
      HEX_MAP[this.props.map.selectedHexId].removeChild(HEX_SELECTION);  
    }

    HEX_SELECTION = new PIXI.Sprite(PIXI.loader.resources.hex.texture);
    //TODO: tmp
    HEX_SELECTION.x = 10;
    HEX_SELECTION.y = 10;

    //Add selection border sprite ontop of hex
    HEX_MAP[selectedHexId].addChild(HEX_SELECTION);
  }

  onMouseDown() {
    this.dragStart = true;
    this.startX = this.mapRenderer.plugins.interaction.mouse.global.x;
    this.startY = this.mapRenderer.plugins.interaction.mouse.global.y;
  }

  onMouseMove() {
    if (!this.dragStart) {
      return;
    }

    //Calculate offset from prev click / move
    const offsetX = this.mapRenderer.plugins.interaction.mouse.global.x - this.startX;
    const offsetY = this.mapRenderer.plugins.interaction.mouse.global.y - this.startY;
    
    //Set up new start position for next offset calculation
    this.startX = this.mapRenderer.plugins.interaction.mouse.global.x;
    this.startY = this.mapRenderer.plugins.interaction.mouse.global.y;

    //Move map
    this.mapContainer.x = this.mapContainer.x + offsetX;
    this.mapContainer.y = this.mapContainer.y + offsetY;
  }

  onMouseUp() {
    this.dragStart = false;
    this.props.dispatch(updateMapPosition(this.mapContainer.x, this.mapContainer.y));
  }

  onHexClick(hex) {
    this.props.dispatch(selectHex(hex.hexId));
  }

  renderHexes() {
    this.props.map.userMap.forEach((tile, index) => {
      let hex = new PIXI.Sprite(PIXI.loader.resources.hex.texture);
      hex.interactive = true;
      hex.buttonMode = true;
      hex.hexId = tile.x + ',' + tile.y;
      
      console.log(hex.width, hex.height);

      hex.x = tile.x / 2 * 100 + tile.x / 2 * 40;
      //TODO: 86 -> 100
      hex.y = tile.y / 2 * 86;

      HEX_MAP[hex.hexId] = hex;
      this.mapContainer.addChild(hex);
      hex.on('mousedown', this.onHexClick.bind(this, hex));
    });
  }

  render() {
    return (
      <div ref="map" style={{flex: 1, position: 'relative'}}>
        <ZoomComponent />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { map } = state;
  return { map };
}

export default connect(mapStateToProps)(MapContainer);