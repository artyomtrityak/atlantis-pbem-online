import PIXI from 'pixi.js/bin/pixi';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { animate, reportParser } from 'javascript/utils';
import {
  selectHexAction, zoomInAction, zoomOutAction, selectHexAndZoomInAction
} from 'javascript/actions/map.actions';
import MapControlsComponent from 'javascript/components/map-controls';


let HEX_MAP = {},
    HEX_SELECTION = null;


class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.onZoomIn = this.onZoomIn.bind(this);
    this.onZoomOut = this.onZoomOut.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    if (this.mapRenderer) {
      this.mapRenderer.destroy(true);
      HEX_MAP = {};
    }
  }

  componentDidMount() {
    this.mapRenderer = new PIXI.CanvasRenderer(
      this.refs.map.offsetWidth-50, this.refs.map.offsetHeight-10, {backgroundColor : 0x808080}
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
    this.mapContainer.scale.set(this.props.map.zoomLevel/100);

    //Render available to user map from report
    this.renderHexes();

    //Attach maps to DOM
    this.rootStage.addChild(this.mapContainer);
    this.refs.map.appendChild(this.mapRenderer.view);

    //Start animation
    animate(this.mapRenderer, this.rootStage);
  }

  componentWillReceiveProps(nextProps) {
    //Select / unselect hex if selectedHexId changed
    if (this.props.map.selectedHexId !== nextProps.map.selectedHexId) {
      this.selectHex(nextProps.map.selectedHexId);
    }

    //Change zoom and center to selected hex if zoom changed or this is first rendering
    if (this.props.map.zoomLevel !== nextProps.map.zoomLevel || this.props.map.selectedHexId === null) {
      this.zoomAndCenterHex(nextProps.map.selectedHexId, nextProps.map.zoomLevel);
    }
  }

  selectHex(selectedHexId) {
    //Unselect previous selection
    if (this.props.map.selectedHexId) {
      HEX_MAP[this.props.map.selectedHexId].removeChild(HEX_SELECTION);  
    }

    HEX_SELECTION = new PIXI.Sprite(PIXI.loader.resources.hex_selected.texture);
    //Add selection border sprite ontop of hex
    HEX_MAP[selectedHexId].addChild(HEX_SELECTION);
  }

  zoomAndCenterHex(selectedHexId, zoomLevel) {
    if (!selectedHexId) {
      selectedHexId = this.props.map.selectedHexId;
    }
    const hex = HEX_MAP[selectedHexId];    

    zoomLevel = zoomLevel / 100;
    this.mapContainer.scale.set(zoomLevel);

    this.mapContainer.x = -1 * hex.position.x * zoomLevel + this.refs.map.offsetWidth / 2 - 50;
    this.mapContainer.y = -1 * hex.position.y * zoomLevel + this.refs.map.offsetHeight / 2 - 50;
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
  }

  onHexClick(hexId) {
    if (this._dblClickCheck) {
      this.props.dispatch(selectHexAndZoomInAction(hexId));
    } else {
      this.props.dispatch(selectHexAction(hexId));  
    }
    
    //DblClick handlers
    this._dblClickCheck = true;
    setTimeout(() => {
      this._dblClickCheck = false;
    }, 300);
  }

  onZoomIn() {
    this.props.dispatch(zoomInAction());
  }

  onZoomOut() {
    this.props.dispatch(zoomOutAction()); 
  }

  renderHexes() {
    let selectedHexId;

    Object.keys(this.props.map.userMap.regions).forEach((regionKey, i) => {
      let region = this.props.map.userMap.regions[regionKey];
      if (region.isUnderworld) {
        return;
      }

      let hex = new PIXI.Sprite(PIXI.loader.resources['hex_' + region.type].texture);
      hex.interactive = true;
      hex.buttonMode = true;
      hex.hexId = regionKey;

      //Set tile x/y position on canvas map
      hex.x = region.x / 2 * 100 + region.x / 2 * 50;
      hex.y = region.y / 2 * 87;

      HEX_MAP[hex.hexId] = hex;
      selectedHexId = hex.hexId;
      this.mapContainer.addChild(hex);
      hex.on('mousedown', this.onHexClick.bind(this, selectedHexId));
    });

    //Automatically select random hex
    this.props.dispatch(selectHexAction(selectedHexId));

    //TODO: connect map edges?
  }

  render() {
    return (
      <div className="col-md-8" ref="map">
        <MapControlsComponent onZoomIn={this.onZoomIn} onZoomOut={this.onZoomOut} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { map } = state;
  return { map };
}

export default connect(mapStateToProps)(MapContainer);
