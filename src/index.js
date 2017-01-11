/* eslint global-require: 0 */
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './app_wrapper';
import configureStore from './configure_store';

const store = configureStore();

ReactDOM.render(
  <AppContainer>
    <AppWrapper store={store} />
  </AppContainer>,
  document.querySelector('#app-entry-point')
);

if (module.hot) {
  module.hot.accept('./app_wrapper', () => {
    const NextApp = require('./app_wrapper').default;
    ReactDOM.render(
      <NextApp store={store} />,
      document.querySelector('#app-entry-point')
    );
  });
}
