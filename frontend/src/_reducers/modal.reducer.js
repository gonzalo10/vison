import { modalConstants } from "../constants";

export function modal(state = {}, action) {
  switch (action.type) {
    case modalConstants.OPEN_MODAL:
      return {
        ...state,
        openModal: action.modalType
      };
    case modalConstants.CLOSE_MODAL:
      return {
        ...state,
        closeModal: action.modalType
      };
    case modalConstants.CLEAR_MODAL:
      return {
        ...state,
        openModal: "",
        closeModal: ""
      };

    default:
      return state;
  }
}
