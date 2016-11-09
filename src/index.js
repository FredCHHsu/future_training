/* eslint global-require: 0 */
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.querySelector('#app-entry-point')
);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default;
    ReactDOM.render(
      <NextApp />,
      document.querySelector('#app-entry-point')
    );
  });
}
