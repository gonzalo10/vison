import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { Input, Button, Card } from '../../../utils/Designs';

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
  width: 50vw;
  height: 60vh;
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

export const CreateModelWizard = ({ modelTypes, createModel }) => {
  const [wizardStep, setWizardStep] = useState(0);
  const [selectedModelType, setModelType] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleModelType = e => {
    e.preventDefault();
    const id = e.currentTarget.id;
    setModelType(id);
    setWizardStep(1);
  };

  const handleModelDetails = e => {
    e.preventDefault();
    handleCreateModel();
  };

  const handleCreateModel = () => {
    const newModelData = { selectedModelType, title, description };
    setTitle('');
    setWizardStep(0);
    setDescription('');
    createModel(newModelData);
  };

  return (
    <ModelWizard>
      {wizardStep === 1 && (
        <ArrowIcon
          icon={faArrowLeft}
          onClick={() => setWizardStep(wizardStep - 1)}>
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
                      onClick={handleModelType}>
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
              type='text'
              onChange={e => setTitle(e.target.value)}
              value={title || ''}
            />
            <h3>Model Description</h3>
            <TextArea
              onChange={e => setDescription(e.target.value)}
              value={description || ''}
            />
            <Button color='blueDark' type='submit' value='Submit'>
              Create
            </Button>
          </Form>
        </>
      )}
    </ModelWizard>
  );
};
