import React, { Component } from 'react';

// import Notification from '../../components/Utils/Notifications';
import Navbar from '../Navigation';

class Layout extends Component {
	render() {
		const { history, dispatch } = this.props;
		let url = history.location.pathname;

		if (url === '/login' || url === '/dashboard') {
			return (
				<React.Fragment>
					<main>{this.props.children}</main>
				</React.Fragment>
			);
		}

		return (
			<>
				<Navbar history={history} dispatch={dispatch} url={url} />
				{/* <Notification
					notifications={this.props.notifications}
					dispatch={this.props.dispatch}
				/> */}
				{this.props.children}
			</>
		);
	}
}

export default Layout;
