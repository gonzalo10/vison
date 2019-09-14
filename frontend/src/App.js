import React from 'react';
import { Router, Route } from 'react-router-dom';

export default class App extends React.Component {
	render() {
		return (
			<Router>
				<Route path='/' component={PricingPage} />
			</Router>
		);
	}
}
