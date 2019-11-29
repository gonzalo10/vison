import React from 'react';
import { Router, Route } from 'react-router-dom';

import { PrivateRoute, AdminRoute } from './containers/Navigation/Routes';
import { history } from './helpers';
import Layout from './containers/Layout';
import {
  LandingPage,
  Dashboard,
  LoginPage,
  SignupPage,
  SentimentAnalysis,
  BusinessAnalysis,
  SummaryCreator,
  UserProfile,
  Integrations,
  Admin,
} from './containers/Pages';

export default class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Layout history={history}>
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute path='/profile' component={UserProfile} />
          <PrivateRoute path='/admin' component={Admin} />
          <PrivateRoute path='/integrations' component={Integrations} />
          <PrivateRoute path='/model/1/:id' component={SentimentAnalysis} />
          <PrivateRoute path='/model/2/:id' component={BusinessAnalysis} />
          <PrivateRoute path='/model/3/:id' component={SummaryCreator} />
          <Route exact path='/' component={LandingPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignupPage} />
          {/* <Route component={() => <div>No Match</div>} /> */}
        </Layout>
      </Router>
    );
  }
}
