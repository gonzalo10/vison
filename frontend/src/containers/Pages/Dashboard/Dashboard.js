import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import logoSVG from "../../../assets/images/logo.svg";
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
  height: 30px;
  margin: auto 20px;
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
        <Logo src={logoSVG} />
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

const Dashboard = ({
  dispatch,
  modelList,
  isModelListLoading,
  areModelsLoaded
}) => {
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
          isModelListLoading={isModelListLoading}
          areModelsLoaded={areModelsLoaded}
        />
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  const { modelList, isModelListLoading, areModelsLoaded } = state.models;
  return { modelList, isModelListLoading, areModelsLoaded };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };
