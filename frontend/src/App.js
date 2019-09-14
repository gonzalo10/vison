import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LandingPage } from './containers/Pages';

export default class App extends React.Component {
	render() {
		return (
			<Router>
				<Route path='/' component={LandingPage} />
			</Router>
		);
	}
}
