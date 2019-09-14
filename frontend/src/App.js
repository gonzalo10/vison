import React from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from './helpers';
import Layout from './containers/Layout';
import LandingPage from './containers/Pages';

export default class App extends React.Component {
	render() {
		return (
			<Router history={history}>
				<Layout history={history}>
					<Route path='/' component={LandingPage} />
				</Layout>
			</Router>
		);
	}
}
