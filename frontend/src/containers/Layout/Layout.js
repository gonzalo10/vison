import React, { Component } from 'react';

import { Notifications } from '../../utils/Notifications';
import Navbar from '../Navigation';

class Layout extends Component {
  render() {
    const { history, dispatch } = this.props;
    let url = history.location.pathname;
    const pages = [
      '/login',
      '/dashboard',
      '/integrations',
      '/model/',
      '/profile',
    ];
    if (pages.includes(url)) {
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
