import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import visionLogo from '../../../assets/images/vision.svg';
import { modelActions } from '../../../_actions';
import { Sidebar } from '../../Layout/Sidebar';

import { Button } from '../../../utils/Designs';

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

const CardIcon = styled.h1``;
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
`;

const Dashboard = ({ dispatch, modelList }) => {
  useEffect(() => {
    dispatch(modelActions.getAll());
  }, []);
  const [modelWizar, setModelWizar] = useState(false);
  const handleStartProject = e => {
    const modelType = dispatch(modelActions.createModel());
    console.log(e.target.id);
  };
  const handleCreateModel = e => {
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
            <Button color='blueDark' onClick={handleCreateModel}>
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
        <Modal>
          <ModelWizard>
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
                      </Card>
                    );
                  })
                : null}
            </CardMenu>
          </ModelWizard>
        </Modal>
      ) : null}
    </>
  );
};

function mapStateToProps(state) {
  const { modelList } = state.models;
  console.log('state', state);
  return { modelList };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };
