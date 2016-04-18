import PIXI from 'pixi.js/bin/pixi';
import { loadAssets } from 'javascript/utils';


export const LOAD_ASSETS = 'LOAD_ASSETS';
export const LOADED_ASSETS = 'LOADED_ASSETS';


export function loadMapDataAction() {
  return async function(dispatch) {
    dispatch({type: LOAD_ASSETS});
    await loadAssets();
    dispatch({type: LOADED_ASSETS});
  };
}
