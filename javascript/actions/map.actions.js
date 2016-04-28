import { loadAssets, reportParser } from 'javascript/utils';


export const INITIALIZE = 'INITIALIZE';
export const INITIALIZED = 'INITIALIZED';
export const UPDATE_MAP_POSITION = 'UPDATE_MAP_POSITION';
export const SELECT_HEX = 'SELECT_HEX';
export const ZOOM_IN = 'ZOOM_IN';
export const ZOOM_OUT = 'ZOOM_OUT';


//TMP
import sampleReport from 'raw!tests/sample-reports/locations.rep';
let tmpData = [
  {x: 0, y: 0}, {x: 2, y: 0}, {x: 4, y: 0}, {x: 6, y: 0}, {x: 8, y: 0},
  {x: 1, y: 1}, {x: 3, y: 1},
  {x: 0, y: 2}, {x: 2, y: 2}, {x: 4, y: 2}, {x: 6, y: 2}, {x: 8, y: 2},
                {x: 3, y: 3}, {x: 5, y: 3}, {x: 7, y: 3}
];


export function updateMapPositionAction(posX, posY) {
  return {
    type: UPDATE_MAP_POSITION,
    posX: posX,
    posY: posY
  };
}


export function selectHexAction(hexId) {
  return {
    type: SELECT_HEX,
    hexId: hexId
  };
}


export function zoomInAction() {
  return {
    type: ZOOM_IN
  }; 
}


export function zoomOutAction() {
  return {
    type: ZOOM_OUT
  }; 
}


export function initializeAction() {
  return async function(dispatch) {
    dispatch({type: INITIALIZE});
    await loadAssets();
    //TODO: get user data
    await reportParser.parse(sampleReport);
    dispatch({type: INITIALIZED, userMap: tmpData});
  };
}
