import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import visionLogo from "../../../assets/images/vision.svg";
import { modelActions } from "../../../_actions";
import { Sidebar } from "../../Layout/Sidebar";
import { history } from "../../../helpers";
import { Button, Input, Card, CardMenu } from "../../../utils/Designs";
import { CreateModelWizard } from "../../../components/Wizard/CreateModel";
import { notificationsActions } from "../../../_actions";

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
const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  align-items: center;
  display: flex;
  justify-content: center;
`;

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
  const [modelWizard, setModelWizar] = useState(false);

  const handleStartProject = e => {
    const { id } = e.currentTarget;
    const modelType = modelList[id].modelTypeId;
    history.push(`/model/${modelType}/${id}`);
  };

  const handleClickModal = e => {
    const id = e.target.id;
    if (id === "modal") setModelWizar(false);
  };

  const createModel = newModelData => {
    dispatch(modelActions.createModel(newModelData));
    setModelWizar(false);
  };

  const handleOpenWizard = () => {
    dispatch(modelActions.getModelTypes());
    setModelWizar(true);
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
      <Sidebar openModelWizard={handleOpenWizard} />
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
      {modelWizard ? (
        <Modal id={"modal"} onClick={handleClickModal}>
          <CreateModelWizard
            modelTypes={modelTypes}
            createModel={createModel}
          />
        </Modal>
      ) : null}
    </>
  );
};

function mapStateToProps(state) {
  const { modelList, modelTypes, isLoading } = state.models;
  return { modelList, modelTypes, isLoading };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };
