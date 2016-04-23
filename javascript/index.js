import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
// Containers
import App from './containers/app.container';


let store = createStore(rootReducer, {}, applyMiddleware(thunkMiddleware));
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
