import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

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

const Dashboard = ({ dispatch, modelList, modelTypes }) => {
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
              ? Object.keys(modelList).map(modelId => {
                  const model = modelList[modelId];
                  return (
                    <Card
                      key={model.id}
                      id={model.id}
                      name={model.modelTypeId}
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
  const { modelList, modelTypes } = state.models;
  return { modelList, modelTypes };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };
