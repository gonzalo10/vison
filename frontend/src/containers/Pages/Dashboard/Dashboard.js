import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import visionLogo from '../../../assets/images/vision.svg';
import { modelActions } from '../../../_actions';
import { Sidebar } from '../../Layout/Sidebar';

import { Button, Input } from '../../../utils/Designs';

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

const Models = styled.div`
  display: flex;
`;
const CardMenu = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 85vh;
  overflow: scroll;
`;

const Card = styled.div`
  cursor: pointer;
  margin: 15px;
  max-height: 300px;
  position: relative;
  display: flex;
  text-align: center;
  justify-content: space-evenly;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  transition-property: color, background-color, box-shadow, transform;
  transition-duration: 0.15s;
  &:hover {
    box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
      0 18px 36px -18px rgba(0, 0, 0, 0.3),
      0 -12px 36px -8px rgba(0, 0, 0, 0.025);
  }
`;

const SmallCard = styled(Card)`
  height: 130px;
  width: 110px;
  border: 2px solid transparent;
  &:hover {
    border: 2px solid ${props => props.theme.color.blueDark};
  }
`;
const CardIcon = styled.h1``;
const SmallCardIcon = styled(CardIcon)`
  margin: 0px;
`;

const CardText = styled.h3``;
const CardDescription = styled.p``;
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
const ModelWizard = styled.div`
  width: 50vh;
  height: 50vw;
  background-color: white;
  padding: 20px;
  border-radius: 15px;
`;
const WizardTitle = styled.h1`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  width: 95%;
  margin-bottom: 20px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  height: 100px;
  max-height: 400px;
`;

const Dashboard = ({ dispatch, modelList, modelTypes }) => {
  useEffect(() => {
    dispatch(modelActions.getAll());
  }, []);
  const [modelWizar, setModelWizar] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [selectedModelType, setModelType] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleStartProject = e => {
    // const modelType = dispatch(modelActions.createModel(newModelData));
    console.log(e.target.id);
  };

  const handleModelDetails = e => {
    e.preventDefault();
    console.log(e.target.value);
    console.log(title, description);
    handleCreateModel();
  };

  const handleModelType = e => {
    e.preventDefault();
    const id = e.currentTarget.id;
    setModelType(id);
    setWizardStep(1);
  };

  const handleClickModal = e => {
    const id = e.target.id;
    if (id === 'modal') setModelWizar(false);
  };

  const handleCreateModel = () => {
    const newModelData = { selectedModelType, title, description };
    setTitle('');
    setWizardStep(0);
    setDescription('');
    dispatch(modelActions.createModel(newModelData));
    setModelWizar(false);
  };

  const handleOpenWizard = () => {
    dispatch(modelActions.getModelTypes());
    setModelWizar(true);
  };
  return (
    <>
      <Sidebar />
      <Container>
        <Header>
          <HeaderLeft>
            <Logo src={visionLogo} />
            <TitleHeader>My Models</TitleHeader>
            <Button
              color='lightGrey'
              onClick={() => dispatch(modelActions.getAll())}>
              RFRESH
            </Button>
          </HeaderLeft>
          <HeaderRight>
            <Button color='blueDark' onClick={handleOpenWizard}>
              + Create Model
            </Button>
          </HeaderRight>
        </Header>
        <Models>
          <CardMenu>
            {modelList
              ? modelList.models.map(model => {
                  return (
                    <Card
                      key={model.id}
                      id={model.id}
                      onClick={handleStartProject}>
                      <CardIcon>{model.modelType.imageUrl}</CardIcon>
                      <CardText>{model.title}</CardText>
                      <CardDescription>{model.description}</CardDescription>
                    </Card>
                  );
                })
              : null}
          </CardMenu>
        </Models>
      </Container>
      {modelWizar ? (
        <Modal id={'modal'} onClick={handleClickModal}>
          <ModelWizard>
            {wizardStep === 1 && (
              <div onClick={() => setWizardStep(wizardStep - 1)}>back</div>
            )}
            {wizardStep === 0 && (
              <>
                <WizardTitle>Choose a Model Type</WizardTitle>
                <CardMenu>
                  {console.log(modelTypes)}
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
                    Login
                  </Button>
                </Form>
              </>
            )}
          </ModelWizard>
        </Modal>
      ) : null}
    </>
  );
};

function mapStateToProps(state) {
  const { modelList, modelTypes } = state.models;
  return { modelList, modelTypes };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };
