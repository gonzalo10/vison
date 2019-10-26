import React from 'react';
import { Router, Route } from 'react-router-dom';

import PrivateRoutes from './containers/Navigation/Routes';
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
} from './containers/Pages';

export default class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Layout history={history}>
          <PrivateRoutes path='/dashboard' component={Dashboard} />
          <PrivateRoutes path='/profile' component={UserProfile} />
          <PrivateRoutes path='/integrations' component={Integrations} />
          <PrivateRoutes path='/model/1/:id' component={SentimentAnalysis} />
          <PrivateRoutes path='/model/2/:id' component={BusinessAnalysis} />
          <PrivateRoutes path='/model/3/:id' component={SummaryCreator} />
          <Route exact path='/' component={LandingPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignupPage} />
        </Layout>
      </Router>
    );
  }
}
