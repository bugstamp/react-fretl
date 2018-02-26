import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';

import reducers from '../reducers/';

export const history = createHistory();

const middlewares = [
  thunk,
  promise,
  routerMiddleware(history),
];

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(...middlewares),
));

export default store;
