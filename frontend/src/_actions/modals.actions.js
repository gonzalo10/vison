import { modalConstants } from "../constants";
import { modelService } from "../_services";
import { history } from "../helpers";

import { notificationsActions } from "./";

export const modalActions = {
  openModal
};

function openModal(modalType) {
  return dispatch => {
    dispatch(openModal(modalType));
  };

  function openModal(modalType) {
    return { type: modalConstants.OPEN_MODAL, modalType };
  }
}
