import Promise from 'bluebird';
import PIXI from 'pixi.js/bin/pixi';

import hexSelectedImg from 'assets/images/selected.png';

// Terrain types
import desertImg from 'assets/images/desert.png';
import waterImg from 'assets/images/water.png';
import shallowWaterImg from 'assets/images/shallowwater.png';
import deepWaterImg from 'assets/images/deepwater.png';
import plainImg from 'assets/images/plain.png';
import swampImg from 'assets/images/swamp.png';
import mountainImg from 'assets/images/mountain.png';
import forestImg from 'assets/images/forest.png';
import tundraImg from 'assets/images/tundra.png';
import jungleImg from 'assets/images/hills.png';
import hillsImg from 'assets/images/hills.png';


export default function loadAssets() {
  PIXI.loader
    .add('hex_lake', shallowWaterImg)
    .add('hex_shallowwater', shallowWaterImg)
    .add('hex_ocean', deepWaterImg)
    .add('hex_plain', plainImg)
    .add('hex_desert', desertImg)
    .add('hex_swamp', swampImg)
    .add('hex_forest', forestImg)
    .add('hex_mountain', mountainImg)
    .add('hex_tundra', tundraImg)
    .add('hex_jungle', jungleImg)
    .add('hex_hills', hillsImg)
    .add('hex_selected', hexSelectedImg);
  

  return new Promise((resolve, reject) => {
    PIXI.loader.once('complete', resolve);
    PIXI.loader.load();
  });
}
