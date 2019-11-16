import { userConstants } from '../constants';
import { userActions } from '../_actions';

export function user(state = {}, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {};
    case userConstants.LOGIN_SUCCESS:
      return {
        userId: action.userId,
        token: action.token,
        tokenExpiration: action.tokenExpiration,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        message: action.message,
      };

    case userConstants.GET_ALL_USERS_REQUEST:
      return {
        isLoading: true,
      };
    case userConstants.GET_ALL_USERS_SUCCESS:
      return {
        users: action.users,
      };
    case userConstants.GET_ALL_USERS_FAILURE:
      return {};

    default:
      return state;
  }
}
