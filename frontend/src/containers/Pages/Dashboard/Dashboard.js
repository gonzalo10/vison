import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import visionLogo from "../../../assets/images/vision.svg";
import { modelActions, modalActions } from "../../../_actions";
import { history } from "../../../helpers";
import { Button } from "../../../utils/Designs";

import DashboardMenu from "./DashboardMenu";

const Container = styled.div`
  display: flex;
  margin-left: 100px;
  flex-direction: column;
`;
const Header = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  width: 40px;
  margin: 20px;
`;

const TitleHeader = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

const HeaderLeft = styled.div`
  align-items: center;
  display: flex;
`;
const HeaderRight = styled.div``;

const HeaderWrapper = ({ handleOpenWizard }) => {
  return (
    <Header>
      <HeaderLeft>
        <Logo src={visionLogo} />
        <TitleHeader>My Models</TitleHeader>
      </HeaderLeft>
      <HeaderRight>
        <Button color="blueDark" onClick={handleOpenWizard}>
          + Create Model
        </Button>
      </HeaderRight>
    </Header>
  );
};

const Dashboard = ({ dispatch, modelList, modelTypes, isLoading }) => {
  const [menuOpenId, setMenuOpen] = useState();
  useEffect(() => {
    dispatch(modelActions.getAll());
  }, []);

  const handleStartProject = e => {
    const { id } = e.currentTarget;
    const modelType = modelList[id].modelTypeId;
    history.push(`/model/${modelType}/${id}`);
  };

  const handleOpenWizard = () => {
    dispatch(modalActions.openModal("CreateModelWizard"));
  };

  const handleOpenMenu = id => {
    if (menuOpenId === id) setMenuOpen();
    else setMenuOpen(id);
  };

  const handleDeleteModel = id => {
    dispatch(modelActions.deleteModel(id));
  };

  return (
    <>
      <Container>
        <HeaderWrapper handleOpenWizard={handleOpenWizard} />
        <DashboardMenu
          menuOpenId={menuOpenId}
          handleOpenWizard={handleOpenWizard}
          modelList={modelList}
          handleOpenMenu={handleOpenMenu}
          handleDeleteModel={handleDeleteModel}
          handleStartProject={handleStartProject}
        />
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  const { modelList, modelTypes, isLoading } = state.models;
  return { modelList, modelTypes, isLoading };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };
