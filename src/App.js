import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import { Dashboard } from './routes';

export default (props) => {
  const { pokemon } = props;

  return (
    <div>
      Your SSR React Router Node App initialised with data!
      <Switch>
        <Route path="/" exact component={Dashboard} />
        {/* <Route path="/pokemon" exact render={() => (<Redirect to="/pokemon/ability/telepathy" />)} />
                <Route path="/pokemon/ability/:ability" render={(location) => (<List pokemon={pokemon.list} location={location} />)} /> */}
      </Switch>
    </div>
  )
};