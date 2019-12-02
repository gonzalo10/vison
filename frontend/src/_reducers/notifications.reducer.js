import { notificationsConstants } from "../constants";

export function notifications(state = {}, action) {
  switch (action.type) {
    case notificationsConstants.SUCCESS:
      return {
        ...state,
        type: "success",
        message: action.message,
        isOpen: true
      };
    case notificationsConstants.ERROR:
      return {
        ...state,
        type: "error",
        message: action.message,
        isOpen: true
      };
    case notificationsConstants.WARNING:
      return {
        ...state,
        type: "warning",
        message: action.message,
        isOpen: true
      };
    case notificationsConstants.INFO:
      return {
        ...state,
        type: "info",
        message: action.message,
        isOpen: true
      };
    case notificationsConstants.CLEAR:
      return {
        ...state,
        type: "",
        message: null,
        isOpen: false
      };
    default:
      return state;
  }
}
