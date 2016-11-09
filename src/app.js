import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import routes from './routes';

const App = (props) =>
  <Provider store={props.store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>;

App.propTypes = {
  store: PropTypes.object,
};

export default App;
