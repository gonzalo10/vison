import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import welcomeImg from '../../../assets/images/welcome2.jpg';
import visionLogo from '../../../assets/images/vision.svg';
import { modelActions } from '../../../_actions';
import { Sidebar } from '../../Layout/Sidebar';
import { history } from '../../../helpers';
import { Button, Input, Card, CardMenu } from '../../../utils/Designs';
import { CreateModelWizard } from '../../../components/Wizard/CreateModel';

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
  color: ${props => (props.delete ? 'red' : '')};
  &:hover {
    background-color: ${props => (props.delete ? 'red' : 'lightgray')};
    color: ${props => (props.delete ? 'white' : '')};
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

const ModelCard = styled(Card)`
  max-height: 200px;
`;

const EmtpyDashboardImg = styled.img`
  width: 100%;
  max-width: 600px;
  margin: auto;
`;
const EmtpyDashboard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
`;
const EmptyDashboardTitle = styled.h1`
  color: #060aad;
  text-align: center;
`;
const CreateModelStepsText = styled.ol`
  font-size: 18px;
  margin: auto;
`;
const CreateModelStepItem = styled.li`
  padding: 5px 25px;
  color: #060aad;
`;

const Dashboard = ({ dispatch, modelList, modelTypes, isLoading }) => {
  const [menuOpenId, setMenuOpen] = useState();
  useEffect(() => {
    dispatch(modelActions.getAll());
  }, []);
  const [modelWizar, setModelWizar] = useState(false);

  const handleStartProject = e => {
    const { id } = e.currentTarget;
    const modelType = modelList[id].modelTypeId;
    history.push(`/model/${modelType}/${id}`);
  };

  const handleClickModal = e => {
    const id = e.target.id;
    if (id === 'modal') setModelWizar(false);
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
        {console.log('modelList', modelList)}
        {modelList && Object.keys(modelList).length ? (
          <Models>
            <CardMenu>
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
                      id='optionsMenu'
                      icon={faEllipsisV}
                      onClick={() => handleOpenMenu(model.id)}
                    />
                    {menuOpenId === model.id && (
                      <OptionsMenu>
                        <OptionsMenuItem>Edit</OptionsMenuItem>
                        <OptionsMenuItem
                          delete
                          onClick={() => handleDeleteModel(model.id)}>
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
        ) : (
          modelList &&
          Object.keys(modelList).length === 0 && (
            <EmtpyDashboard>
              {console.log(isLoading)}
              <EmtpyDashboardImg src={welcomeImg} />
              <EmptyDashboardTitle>
                Create your first Model 😊
              </EmptyDashboardTitle>
              <CreateModelStepsText>
                <CreateModelStepItem>
                  Click <strong>+ Create Model</strong> button 👆
                </CreateModelStepItem>
                <CreateModelStepItem>
                  Choose <strong>model</strong> type
                </CreateModelStepItem>
                <CreateModelStepItem>
                  Fill title and description ✍️
                </CreateModelStepItem>
              </CreateModelStepsText>
            </EmtpyDashboard>
          )
        )}
      </Container>
      {modelWizar ? (
        <Modal id={'modal'} onClick={handleClickModal}>
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
