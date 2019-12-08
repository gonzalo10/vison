import { userConstants } from "../constants";
import { userActions } from "../_actions";

export function user(state = {}, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return { ...state };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        userId: action.userId,
        token: action.token,
        tokenExpiration: action.tokenExpiration
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        message: action.message
      };

    case userConstants.GET_ALL_USERS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case userConstants.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.users
      };
    case userConstants.GET_ALL_USERS_FAILURE:
      return state;
    case userConstants.GET_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case userConstants.GET_USER_SUCCESS:
      return {
        ...state,
        me: action.user
      };
    case userConstants.GET_USER_FAILURE:
      return state;
    case userConstants.GET_USER_ACCOUNT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case userConstants.GET_USER_ACCOUNT_SUCCESS:
      return {
        ...state,
        myAccount: action.account
      };
    case userConstants.GET_USER_ACCOUNT_FAILURE:
      return { ...state };

    default:
      return { ...state };
  }
}
