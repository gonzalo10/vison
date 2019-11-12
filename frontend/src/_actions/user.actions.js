import { userConstants } from '../constants';
import { userService } from '../_services';
import { history } from '../helpers';

import { notificationsActions } from './';

export const userActions = {
  login,
  logout,
  register,
};

function login(username, password) {
  return dispatch => {
    dispatch(request());

    userService.login(username, password).then(
      user => {
        dispatch(success(user));
        localStorage.removeItem('token');
        localStorage.setItem('token', user && user.token);
        history.push('/dashboard');
      },
      error => {
        console.log('error', error);
        dispatch(failure(error.toString()));
        // dispatch(notificationsActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: userConstants.LOGIN_REQUEST };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  return dispatch => {
    userService.logout();
    dispatch(logout());
    history.push('/login');
  };
  function logout() {
    return { type: userConstants.LOGOUT };
  }
}

function register(username, password) {
  return dispatch => {
    dispatch(request());

    userService.register(username, password).then(
      user => {
        console.log('user', user);
        dispatch(success());
        history.push('/login');
        dispatch(notificationsActions.success('Registration successful'));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(notificationsActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: userConstants.REGISTER_REQUEST };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}
