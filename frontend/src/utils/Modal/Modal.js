import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { ModalWrapper } from "../Designs";
import { modalActions } from "../../_actions";
import { CreateModelWizard } from "../../containers/Modals/CreateModel";

const ModalsTypes = {
  CreateModelWizard: <CreateModelWizard />
};

const Modal = ({ openModal, dispatch }) => {
  const handleClickOutsideModal = e => {
    const id = e.target.id;
    if (id === "outsideModal") dispatch(modalActions.closeModal());
  };
  if (!openModal) return null;
  return (
    <ModalWrapper id={"outsideModal"} onClick={handleClickOutsideModal}>
      {ModalsTypes[openModal]}
    </ModalWrapper>
  );
};

function mapStateToProps(state) {
  const { openModal } = state.modal;
  return {
    openModal
  };
}

const connectedModal = connect(mapStateToProps)(Modal);
export { connectedModal as Modal };
