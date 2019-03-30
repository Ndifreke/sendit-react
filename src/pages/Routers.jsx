import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import Home from '@pages/Home';
import SignIn from '@pages/SignIn';
import { withRouter } from 'react-router-dom';

function MainRouter() {
  return (
    <Switch>
      <Route exact path="/" component={withRouter(Home)} />
      <Route exact path="/login" component={withRouter(SignIn)} />
    </Switch>
  );
}
export default MainRouter;
