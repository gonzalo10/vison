import React from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from './helpers';
import Layout from './containers/Layout';
import {
	LandingPage,
	Dashboard,
	LoginPage,
	SignupPage,
} from './containers/Pages';

export default class App extends React.Component {
	render() {
		return (
			<Router history={history}>
				<Layout history={history}>
					<Route exact path='/' component={LandingPage} />
					<Route path='/dashboard' component={Dashboard} />
					<Route path='/login' component={LoginPage} />
					<Route path='/signup' component={SignupPage} />
				</Layout>
			</Router>
		);
	}
}
