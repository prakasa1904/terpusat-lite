import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Dashboard, Members, NotFound } from './routes';

const app = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/members" render={(location) => (<Members location={location} />)} />
        <Route path="/redirect" exact render={() => (<Redirect to="/" />)} />
        <Route path="*" component={NotFound}/>
      </Switch>
    </div>
  );
};

export default app;