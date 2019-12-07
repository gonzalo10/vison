import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import EmptyDashboard from "./EmptyDashboard";
import { Card, GridMenuArea } from "../../../utils/Designs";

const ModelMenu = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 10px;
`;

const OptionsMenu = styled.div`
  position: absolute;
  top: 30px;
  right: 10px;
  background: white;
  height; 60px;
  text-align: left;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid lightgray;
  box-shadow: -1px 7px 24px -6px rgba(0,0,0,0.43);
`;

const OptionsMenuItem = styled.div`
  width: 100px;
  text-align: center;
  padding: 8px;
  border-bottom: 1px solid lightgray;
  color: ${props => (props.delete ? "red" : "")};
  &:hover {
    background-color: ${props => props.theme.color.blueDark + "60"};
    color: ${props => (props.delete ? "red" : "")};
  }
`;
const Icon = styled.h1`
  color: ${props => props.color};
  font-size: ${props => props.fontSize}px;
`;

const CardWrapper = styled(Card)`
  max-height: 200px;
  background-color: ${props => props.color};
  &:hover {
    background-color: ${props => props.color};
  }
`;

const SmallCardIcon = styled(Icon)`
  margin: 0px;
`;

const CardText = styled.h3`
  color: ${props => props.color};
`;
const CardDescription = styled.p``;

const ModelCard = ({
  model,
  handleStartProject,
  handleDeleteModel,
  handleOpenMenu,
  menuOpenId
}) => {
  return (
    <CardWrapper key={model.id} id={model.id} name={model.modelTypeId}>
      <ModelMenu
        id="optionsMenu"
        icon={faEllipsisV}
        onClick={() => handleOpenMenu(model.id)}
      />
      <div id={model.id} onClick={handleStartProject}>
        <Icon>{model.modelType.imageUrl}</Icon>
        <CardText>{model.title}</CardText>
        <CardDescription>{model.description}</CardDescription>
      </div>
      {menuOpenId === model.id && (
        <OptionsMenu>
          <OptionsMenuItem>Edit</OptionsMenuItem>
          <OptionsMenuItem delete onClick={() => handleDeleteModel(model.id)}>
            Delete
          </OptionsMenuItem>
        </OptionsMenu>
      )}
    </CardWrapper>
  );
};

const CardList = ({
  handleStartProject,
  handleDeleteModel,
  handleOpenMenu,
  menuOpenId,
  modelList
}) =>
  Object.keys(modelList).map((modelId, key) => {
    const model = modelList[modelId];
    return (
      <ModelCard
        key={key}
        model={model}
        handleStartProject={handleStartProject}
        handleDeleteModel={handleDeleteModel}
        handleOpenMenu={handleOpenMenu}
        menuOpenId={menuOpenId}
      />
    );
  });

const AddModelCard = ({ handleOpenWizard }) => {
  return (
    <CardWrapper color="#4553ff">
      <div onClick={handleOpenWizard}>
        <Icon fontSize={50} color="white">
          +
        </Icon>
        <CardText color="white">Create Model</CardText>
      </div>
    </CardWrapper>
  );
};

const DashboardMenu = ({
  modelList,
  menuOpenId,
  handleStartProject,
  handleOpenMenu,
  handleDeleteModel,
  handleOpenWizard,
  areModelsLoaded
}) => {
  const shouldShowModels = areModelsLoaded && Object.keys(modelList).length;
  const shouldShowEmptyState =
    areModelsLoaded && !Object.keys(modelList).length;

  const handleClick = e => {
    if (e.target && e.target.id === "gridwrapper") handleOpenMenu();
    if (!isNaN(e)) handleOpenMenu(e);
  };

  const handleGridClick = e => {
    if (e.target.id === "gridwrapper") console.log(e.target);
  };

  if (shouldShowEmptyState) return <EmptyDashboard />;
  if (!shouldShowModels) return null;

  return (
    <GridMenuArea cols={4} onClick={handleClick} id="gridwrapper">
      <AddModelCard handleOpenWizard={handleOpenWizard} />
      <CardList
        handleStartProject={handleStartProject}
        handleDeleteModel={handleDeleteModel}
        handleOpenMenu={handleClick}
        menuOpenId={menuOpenId}
        modelList={modelList}
      />
    </GridMenuArea>
  );
};

export default DashboardMenu;
