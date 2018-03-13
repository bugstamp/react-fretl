import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import App from './pages/App';

import store, { history } from './store/';

const renderApp = (Component) => {
  render(
    <Provider store={store} >
      <ConnectedRouter history={history} >
        <Component />
      </ConnectedRouter>
    </Provider>
    , document.getElementById('root'),
  );
};

renderApp(App);
