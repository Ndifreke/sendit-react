import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage } from '@pages/Home';
import { SignupPage } from '@pages/Signup';
import { SignInApp } from '@pages/SignIn';
import { withRouter } from 'react-router-dom';
function MainRouter() {
  return (
    <Switch> 
      <Route exact path="/" component={withRouter(HomePage)} />
      <Route exact path="/login" component={withRouter(SignInApp)} />
      <Route exact path="/signup" component={withRouter(SignupPage)} />
    </Switch>
  );
}
export default MainRouter;
