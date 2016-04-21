import PIXI from 'pixi.js/bin/pixi';
import { loadAssets } from 'javascript/utils';


export const INITIALIZE = 'INITIALIZE';
export const INITIALIZED = 'INITIALIZED';

let tmpData = [
  {x: 0, y: 0}, {x: 2, y: 0}, {x: 4, y: 0}, {x: 6, y: 0}, {x: 8, y: 0},
  {x: 1, y: 1}, {x: 3, y: 1},
  {x: 0, y: 2}, {x: 2, y: 2}, {x: 4, y: 2}, {x: 6, y: 2}, {x: 8, y: 2},
                {x: 3, y: 3}, {x: 5, y: 3}, {x: 7, y: 3}
];


export function loadMapDataAction() {
  return async function(dispatch) {
    dispatch({type: INITIALIZE});
    await loadAssets();
    //TODO: get user data
    dispatch({type: INITIALIZED, userMap: tmpData});
  };
}
