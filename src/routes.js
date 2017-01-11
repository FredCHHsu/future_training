import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import GamePage from './container/game';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={GamePage} />
  </Route>
);
