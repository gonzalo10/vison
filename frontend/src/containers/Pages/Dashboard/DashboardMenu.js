import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import EmptyDashboard from "./EmptyDashboard";

import { Card, CardMenu } from "../../../utils/Designs";

const Models = styled.div`
  display: flex;
`;

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
  padding: 10px;
  border-bottom: 1px solid lightgray;
  color: ${props => (props.delete ? "red" : "")};
  &:hover {
    background-color: lightgray;
    color: ${props => (props.delete ? "red" : "")};
  }
`;
const CardIcon = styled.h1`
  color: ${props => props.color};
  font-size: ${props => props.fontSize}px;
`;

const ModelCard = styled(Card)`
  max-height: 200px;
  background-color: ${props => props.color};
  &:hover {
    background-color: ${props => props.color};
  }
`;

const SmallCardIcon = styled(CardIcon)`
  margin: 0px;
`;

const CardText = styled.h3`
  color: ${props => props.color};
`;
const CardDescription = styled.p``;

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

  if (shouldShowEmptyState) return <EmptyDashboard />;
  if (shouldShowModels) {
    return (
      <Models>
        <CardMenu>
          <ModelCard color="#4553ff">
            <ModelMenu />
            <div onClick={handleOpenWizard}>
              <CardIcon fontSize={50} color="white">
                +
              </CardIcon>
              <CardText color="white">Create Model</CardText>
            </div>
          </ModelCard>
          {Object.keys(modelList).map(modelId => {
            const model = modelList[modelId];
            return (
              <ModelCard
                key={model.id}
                id={model.id}
                name={model.modelTypeId}
                // onClick={handleStartProject}
              >
                <ModelMenu
                  id="optionsMenu"
                  icon={faEllipsisV}
                  onClick={() => handleOpenMenu(model.id)}
                />
                {menuOpenId === model.id && (
                  <OptionsMenu>
                    <OptionsMenuItem>Edit</OptionsMenuItem>
                    <OptionsMenuItem
                      delete
                      onClick={() => handleDeleteModel(model.id)}
                    >
                      Delete
                    </OptionsMenuItem>
                  </OptionsMenu>
                )}
                <div id={model.id} onClick={handleStartProject}>
                  <CardIcon>{model.modelType.imageUrl}</CardIcon>
                  <CardText>{model.title}</CardText>
                  <CardDescription>{model.description}</CardDescription>
                </div>
              </ModelCard>
            );
          })}
        </CardMenu>
      </Models>
    );
  }
  return null;
};

export default DashboardMenu;
