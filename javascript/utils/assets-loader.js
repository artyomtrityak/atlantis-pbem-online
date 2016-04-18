import Promise from 'bluebird';
import PIXI from 'pixi.js/bin/pixi';

import hexImg from 'assets/images/hex.png';


export default function loadAssets() {
  PIXI.loader.add('hex', hexImg);

  return new Promise((resolve, reject) => {
    PIXI.loader.once('complete', resolve);
    PIXI.loader.load();
  });
}
