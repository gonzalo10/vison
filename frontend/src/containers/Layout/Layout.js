import React, { Component } from 'react';

import { Notifications } from '../../utils/Notifications';
import Navbar from '../Navigation';

class Layout extends Component {
  render() {
    const { history, dispatch } = this.props;
    let url = history.location.pathname;

    if (url === '/login' || url === '/dashboard' || url.includes('/model/')) {
      return (
        <React.Fragment>
          <Notifications />
          <main>{this.props.children}</main>
        </React.Fragment>
      );
    }

    return (
      <>
        <Navbar history={history} dispatch={dispatch} url={url} />
        <Notifications />
        {this.props.children}
      </>
    );
  }
}

export default Layout;
