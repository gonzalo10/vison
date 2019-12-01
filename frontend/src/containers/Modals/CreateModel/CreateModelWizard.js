import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

import { Input, Button, Card } from "../../../utils/Designs";
import { modelActions, modalActions } from "../../../_actions";

import { UploadDataModel } from "./UploadDataModel";

const SmallCard = styled(Card)`
  height: 130px;
  border: 1px solid lightgray;
  &:hover {
    border: 1px solid ${props => props.theme.color.blueDark};
  }
  padding: 10px;
`;

const SmallCardIcon = styled.h1`
  margin: 0px;
`;

const WizardTitle = styled.h1`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const ArrowIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 26px;
  position: absolute;
`;

const TextArea = styled.textarea`
  width: 95%;
  margin-bottom: 20px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  height: 100px;
  max-height: 400px;
`;

const ModelWizard = styled.div`
  width: 65vw;
  height: 75vh;
  background-color: white;
  padding: 20px;
  border-radius: 15px;
`;

const CardText = styled.h3``;
const CardMenu = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow: scroll;
`;
const DataOptions = styled(CardMenu)``;

const IntegrationIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 30px;
`;
const YoutubeIcon = styled(IntegrationIcon)`
  color: #ff0000;
`;
const CsvIcon = styled(IntegrationIcon)`
  color: #1d8d3e;
`;

const IntegrationsDetails = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

const IntegrationCard = styled(Card)`
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const CreateModelWizard = ({ dispatch, modelTypes }) => {
  const [wizardStep, setWizardStep] = useState(0);
  const [selectedModelType, setModelType] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(modelActions.getModelTypes());
  }, []);

  const handleModelType = e => {
    e.preventDefault();
    const id = e.currentTarget.id;
    setModelType(id);
    setWizardStep(1);
  };

  const handleModelDetails = e => {
    e.preventDefault();
    setWizardStep(2);
  };
  const hanldeUploadFile = e => {
    e.preventDefault();
    setWizardStep(22);
  };
  const handleOpenIntegrations = e => {
    e.preventDefault();
    setWizardStep(21);
  };

  const handleCreateModel = () => {
    const newModelData = { selectedModelType, title, description };
    setTitle("");
    setWizardStep(0);
    setDescription("");
    dispatch(modalActions.closeModal());
    dispatch(modelActions.createModel(newModelData));
  };

  const onClickGoBack = () => {
    if (wizardStep === 21 || wizardStep === 22) setWizardStep(2);
    else setWizardStep(wizardStep - 1);
  };

  return (
    <ModelWizard>
      {wizardStep >= 1 && (
        <ArrowIcon icon={faArrowLeft} onClick={onClickGoBack}>
          back
        </ArrowIcon>
      )}
      {wizardStep === 0 && (
        <>
          <WizardTitle>Choose a Model Type</WizardTitle>
          <CardMenu>
            {modelTypes
              ? modelTypes.map(model => {
                  return (
                    <SmallCard
                      key={model.id}
                      id={model.id}
                      onClick={handleModelType}
                    >
                      <SmallCardIcon>{model.imageUrl}</SmallCardIcon>
                      <CardText>{model.title}</CardText>
                    </SmallCard>
                  );
                })
              : null}
          </CardMenu>
        </>
      )}
      {wizardStep === 1 && (
        <>
          <WizardTitle>Model Information</WizardTitle>
          <Form onSubmit={handleModelDetails}>
            <h3>Model Title</h3>
            <Input
              type="text"
              onChange={e => setTitle(e.target.value)}
              value={title || ""}
            />
            <h3>Model Description</h3>
            <TextArea
              onChange={e => setDescription(e.target.value)}
              value={description || ""}
            />
            <Button color="blueDark" type="submit" value="Submit">
              Next
            </Button>
          </Form>
        </>
      )}
      {wizardStep === 2 && (
        <>
          <WizardTitle>Upload Data</WizardTitle>
          <DataOptions>
            <IntegrationCard onClick={handleOpenIntegrations}>
              <h1 style={{ padding: 0, margin: 0 }}>🧩</h1>
              <IntegrationsDetails>Integrations</IntegrationsDetails>
            </IntegrationCard>
            <IntegrationCard onClick={hanldeUploadFile}>
              <CsvIcon icon={faFileCsv} />
              <IntegrationsDetails>Csv</IntegrationsDetails>
            </IntegrationCard>
            <IntegrationCard onClick={handleCreateModel}>
              <h1 style={{ padding: 0, margin: 0 }}>🔦</h1>
              <IntegrationsDetails>Empty Model</IntegrationsDetails>
            </IntegrationCard>
          </DataOptions>
        </>
      )}
      {wizardStep === 21 && (
        <>
          <WizardTitle>Upload Data</WizardTitle>
          <IntegrationCard>
            <YoutubeIcon icon={faYoutube} />
            <IntegrationsDetails>Integrations</IntegrationsDetails>
          </IntegrationCard>
          <IntegrationCard>
            <YoutubeIcon icon={faYoutube} />
            <IntegrationsDetails>Google sheets</IntegrationsDetails>
          </IntegrationCard>
        </>
      )}
      {wizardStep === 22 && (
        <UploadDataModel
          modelType={selectedModelType}
          title={title}
          description={description}
        />
      )}
    </ModelWizard>
  );
};

function mapStateToProps(state) {
  const { modelTypes } = state.models;
  return { modelTypes };
}

const connectedCreateModelWizard = connect(mapStateToProps)(CreateModelWizard);
export { connectedCreateModelWizard as CreateModelWizard };
