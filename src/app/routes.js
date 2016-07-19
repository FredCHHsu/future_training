import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import IndexPage from './components/pages/index';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={IndexPage} />
  </Route>
);
