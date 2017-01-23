/* eslint global-require: 0 */
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
const injectTapEventPlugin = require('react-tap-event-plugin');
import AppWrapper from './AppWrapper';
import configureStore from './configureStore';

injectTapEventPlugin();
const store = configureStore();

ReactDOM.render(
  <AppContainer>
    <AppWrapper store={store} />
  </AppContainer>,
  document.querySelector('#app-entry-point')
);

if (module.hot) {
  module.hot.accept('./AppWrapper', () => {
    const NextApp = require('./AppWrapper').default;
    ReactDOM.render(
      <NextApp store={store} />,
      document.querySelector('#app-entry-point')
    );
  });
}
