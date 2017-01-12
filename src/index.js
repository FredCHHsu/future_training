/* eslint global-require: 0 */
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();
import AppWrapper from './app_wrapper';
import configureStore from './configure_store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import gameTheme from './game_theme';

const store = configureStore();

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(gameTheme)}>
    <AppContainer>
      <AppWrapper store={store} />
    </AppContainer>
  </MuiThemeProvider>,
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
