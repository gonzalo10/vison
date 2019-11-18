import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { store } from '../../../helpers/store';
import { userActions } from '../../../_actions/';

export const AdminRoutes = ({ component: Component, me, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        me.userTypeId === 3 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

function mapStateToProps(state) {
  const { me } = state.user;
  return { me };
}

const connectedAdminRoute = connect(mapStateToProps)(AdminRoutes);
export { connectedAdminRoute as AdminRoute };
