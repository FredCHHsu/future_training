import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import GamePage from './container/Game';
import TradeLog from './container/TradeLog';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={GamePage} />
    <Route path="/tradelog" component={TradeLog} />
  </Route>
);
