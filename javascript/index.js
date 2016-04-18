import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

// Containers
import App from './containers/app.container';


import PIXI from 'pixi.js/bin/pixi';

import { loadAssets } from './utils';

import hexImg from 'assets/images/hex.png';


function animate(renderer, stage) {
  requestAnimationFrame(animate.bind(null, renderer, stage));

  // render the root container
  renderer.render(stage);
}

async function main() {
  await loadAssets();

  console.log('loaded!!!!!');

  console.log(PIXI.loader.resources.hex);
  var renderer = new PIXI.CanvasRenderer(800, 600, {backgroundColor : 0x1099bb});
  document.body.appendChild(renderer.view);

  // create the root of the scene graph
  var stage = new PIXI.Container();

  var container = new PIXI.Container();

  stage.addChild(container);


  for (var j = 0; j < 5; j++) {
    for (var i = 0; i < 5; i++) {

      var bunny = new PIXI.Sprite(PIXI.loader.resources.hex.texture);
      bunny.x = 50 * i;
      bunny.y = 40 * j;
      container.addChild(bunny);
    }
  }
  /*
   * All the bunnies are added to the container with the addChild method
   * when you do this, all the bunnies become children of the container, and when a container moves,
   * so do all its children.
   * This gives you a lot of flexibility and makes it easier to position elements on the screen
   */
  container.x = 100;
  container.y = 60;

  // start animating
  animate(renderer, stage);

}
//main();







let store = createStore(rootReducer, {}, applyMiddleware(thunkMiddleware));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


