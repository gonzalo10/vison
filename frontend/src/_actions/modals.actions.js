import { modalConstants } from "../constants";

export const modalActions = {
  openModal,
  closeModal
};

function openModal(modalType) {
  return dispatch => {
    dispatch(openModal(modalType));
  };

  function openModal(modalType) {
    return { type: modalConstants.OPEN_MODAL, modalType };
  }
}
function closeModal() {
  return dispatch => {
    dispatch(closeModal());
  };

  function closeModal(modalType) {
    return { type: modalConstants.CLOSE_MODAL };
  }
}
