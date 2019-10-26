import React, { Component } from 'react';

import { Notifications } from '../../utils/Notifications';
import Navbar from '../Navigation';

class Layout extends Component {
  render() {
    const { history, dispatch } = this.props;
    let url = history.location.pathname;

    if (
      url === '/login' ||
      url === '/dashboard' ||
      url === '/integrations' ||
      url.includes('/model/') ||
      url.includes('/profile')
    ) {
      return (
        <>
          <Notifications />
          <main>{this.props.children}</main>
        </>
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
