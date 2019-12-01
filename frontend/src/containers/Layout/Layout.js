import React, { Component } from "react";

import { Notifications } from "../../utils/Notifications";
import { Modal } from "../../utils/Modal/Modal.js";
import Navbar from "../Navigation";
import { Sidebar } from "./Sidebar";

class Layout extends Component {
  render() {
    const { history, dispatch } = this.props;
    let url = history.location.pathname;
    const pages = ["/", "/login", "/signup"];
    if (pages.includes(url)) {
      return (
        <>
          <Navbar history={history} dispatch={dispatch} url={url} />
          <Notifications />
          {this.props.children}
        </>
      );
    }
    return (
      <>
        <Sidebar />
        <Notifications />
        <Modal />
        <main>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
