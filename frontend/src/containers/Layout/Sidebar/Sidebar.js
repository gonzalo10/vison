import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { history } from "../../../helpers";
import { userActions, modalActions } from "../../../_actions";
import logoSVG from "../../../assets/images/logoWhite.svg";

const LateralMenu = styled.div`
  width: 100px;
  height: 100vh;
  position: absolute;
  justify-content: space-between;
  flex-direction: column;
  display: flex;
  background-color: ${props => props.theme.color.blueDark};
`;
const TopMenu = styled.div`
  margin-top: 0px;
  padding: 5px;
`;
const BottomMenu = styled.div`
  margin-bottom: 20px;
  padding: 5px;
`;
const MenuItem = styled.button`
  font-size: 17px;
  padding: 10px 0px 10px 2px;
  color: ${props => props.theme.white};
  background-color: ${props =>
    props.isSelected ? props.theme.color.blueLight : "transparent"};
  border: none;
  cursor: pointer;
  width: 100%;
`;
const Logo = styled.img`
  height: 30px;
  margin: 10px 10px;
  cursor: pointer;
`;

const Sidebar = ({ dispatch, url }) => {
  const isMyModelsSelected = () => {
    if (url === "/dashboard") return true;
  };
  const isIntegrationsSelected = () => {
    if (url === "/integrations") return true;
  };
  const isTrainModelSelected = () => {
    if (url === "/train") return true;
  };
  const isProfileSelected = () => {
    if (url === "/profile") return true;
  };
  return (
    <LateralMenu>
      <TopMenu>
        <Logo src={logoSVG} onClick={() => history.push("/dashboard")} />
        <MenuItem
          id="myModels"
          onClick={() => history.push("/dashboard")}
          isSelected={isMyModelsSelected()}
        >
          My Models
        </MenuItem>
        <MenuItem
          id="myModels"
          onClick={() => history.push("/integrations")}
          isSelected={isIntegrationsSelected()}
        >
          Integrations
        </MenuItem>
        <MenuItem
          id="myModels"
          onClick={() => history.push("/train")}
          isSelected={isTrainModelSelected()}
        >
          Train Model
        </MenuItem>
        <MenuItem
          onClick={() => dispatch(modalActions.openModal("CreateModelWizard"))}
        >
          + Model
        </MenuItem>
      </TopMenu>
      <BottomMenu>
        <MenuItem
          id="profile"
          onClick={() => history.push("/profile")}
          isSelected={isProfileSelected()}
        >
          Profile
        </MenuItem>
        <MenuItem onClick={() => dispatch(userActions.logout())}>
          Log out
        </MenuItem>
      </BottomMenu>
    </LateralMenu>
  );
};

function mapStateToProps(state) {
  const { modelList } = state.models;
  return { modelList };
}

const connectedSidebar = connect(mapStateToProps)(Sidebar);
export { connectedSidebar as Sidebar };
