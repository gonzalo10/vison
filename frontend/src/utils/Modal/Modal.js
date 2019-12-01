import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { ModalWrapper } from "../Designs";
import { CreateModelWizard } from "../../containers/Modals/CreateModel";

const ModalsTypes = {
  CreateModelWizard: <CreateModelWizard />
};

const Modal = ({ openModal, children }) => {
  console.log("ModalsTypes", ModalsTypes);
  console.log("openModal", openModal);
  if (!openModal) return null;
  return <ModalWrapper>{ModalsTypes[openModal]}</ModalWrapper>;
};

function mapStateToProps(state) {
  const { openModal } = state.modal;
  console.log(openModal);
  return {
    openModal
  };
}

const connectedModal = connect(mapStateToProps)(Modal);
export { connectedModal as Modal };
