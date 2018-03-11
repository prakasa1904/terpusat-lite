import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { homeView } from './Home';

export default function createRoutes(store, client) {
  <Switch>
    <Route exact path='/' component={homeView} />
  </Switch>
    // <Route path="/" component={Layout}>
    //   <IndexRoute getComponent={homeView} />
    // </Route>
}