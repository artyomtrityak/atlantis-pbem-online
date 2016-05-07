import { loadAssets, reportParser } from 'javascript/utils';


export const INITIALIZE = 'INITIALIZE';
export const INITIALIZED = 'INITIALIZED';
export const SELECT_HEX = 'SELECT_HEX';
export const SELECT_HEX_AND_ZOOM_IN = 'SELECT_HEX_AND_ZOOM_IN';
export const ZOOM_IN = 'ZOOM_IN';
export const ZOOM_OUT = 'ZOOM_OUT';


//TMP
//import sampleReport from 'raw!tests/sample-reports/locations.rep';
import sampleReport from 'raw!tests/sample-reports/full.rep';


export function selectHexAction(hexId) {
  return {
    type: SELECT_HEX,
    hexId: hexId
  };
}


export function selectHexAndZoomInAction(hexId) {
  return {
    type: SELECT_HEX_AND_ZOOM_IN,
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
    //dispatch({type: INITIALIZED, userMap: reportParser.getState()});
  };
}
