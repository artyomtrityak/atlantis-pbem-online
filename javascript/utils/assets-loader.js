import Promise from 'bluebird';
import PIXI from 'pixi.js/bin/pixi';

import hexImg from 'assets/images/hex.png';


export default function loadAssets() {
  PIXI.loader.add('hex', hexImg);
  PIXI.loader.add('hex2', 'http://pixijs.github.io/examples/_assets/eggHead.png');
  

  return new Promise((resolve, reject) => {
    PIXI.loader.once('complete', resolve);
    PIXI.loader.load();
  });
}
