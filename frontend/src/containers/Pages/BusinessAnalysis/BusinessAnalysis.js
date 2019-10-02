import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { entityActions, modelActions } from '../../../_actions';

import { Sidebar } from '../../Layout/Sidebar';
import { history } from '../../../helpers';
import {
  Button as ButtonBase,
  Card,
  Badge,
  BadgeGroup,
  ModelBody,
  ModelHeader,
  ModelHeaderDescription,
  ModelHeaderTitle,
} from '../../../utils/Designs';
import { PieChart } from '../../../components/Charts';

const Container = styled.div`
  margin-left: 100px;
  height: 100vh;
  background-color: ${props => props.theme.color.beigeWhite}
  display: flex;
  flex-direction: column;
`;
const Button = styled(ButtonBase)`
  width: 200px;
  margin: auto;
`;
const ContentArea = styled.div`
  margin: auto;
  margin-top: 0px;
  width: 90%;
`;

const Icon = styled.span`
  font-size: 40px;
`;

const Left = styled.div`
  border-right: 1px solid grey;
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding: 10px 30px;
`;
const Right = styled.div`
  width: 100%;
  justify-content: space-around;
  display: flex;
  flex-direction: column;
`;

const BodyTitle = styled.h3``;
const TextArea = styled.textarea`
  min-height: 100px;
  border-radius: 10px;
  margin-bottom: 20px;
`;
const Ouput = styled.div``;
const ResultsArea = styled.div`
  width: 100%;
  height: 400px;
  overflow: scroll;
  display: flex;
`;
const OutputTitle = styled.h5``;
const OutputStats = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const Col = styled.div``;
const StatTitle = styled.div`
  margin-bottom: 10px;
  border-bottom: 1px solid blue;
`;
const StatResult = styled.div``;

const BusinessCard = styled(Card)`
  padding: 10px;
`;

const CardHeader = styled.div`
  grid-template-columns: 1fr 1fr 1fr;
  display: grid;
  width: 100%;
  justify-content: space-between;
`;
const CardBody = styled.div`
  margin: 10px 0px;
  font-size: 12px;
`;
const CardUrl = styled.a`
  font-size: 14px;
`;
const CardName = styled.h4`
  color: blue;
  margin: 0px;
`;
const CardType = styled.h4`
  color: green;
  margin: 0px;
`;
const DataArea = styled.div`
  width: 55%;
  overflow: scroll;
  height: 98%;
`;
const StatsArea = styled(Card)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 45%;
  padding: 0;
`;
const CardDesc = styled.h5`
  margin: 0px;
`;

const DownCaret = styled.div`
  left: 0;
  position: absolute;
  bottom: -13px;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  font-size: 10px;
  cursor: pointer;
`;

const BusinessAnalysis = ({ dispatch, entities, isLoading, selectedModel }) => {
  const [text, setText] = useState('');
  const [openInfoList, setOpenInfo] = useState([]);

  useEffect(() => {
    getModel();
  }, []);
  const getModelId = () => {
    const url = history.location.pathname.split('/');
    const id = url[url.length - 1];
    return id;
  };
  const getModel = () => {
    const url = history.location.pathname.split('/');
    const id = getModelId();
    const modelType = url[url.length - 2];
    dispatch(modelActions.getModel(id, modelType));
  };
  const handleChange = e => {
    setText(e.target.value);
  };
  const execute = () => {
    const modelId = getModelId();
    dispatch(entityActions.execute(text, modelId));
    getModel();
  };
  const hanldeClickOpen = key => {
    if (openInfoList && openInfoList.includes(key)) {
      const newOpenInfoList = [...openInfoList];
      console.log('newOpenInfoList', newOpenInfoList);
      console.log('openInfoList.indexOf(key)', openInfoList.indexOf(key));
      console.log(
        'newOpenInfoList.splice(openInfoList.indexOf(key), 1)',
        newOpenInfoList.splice(openInfoList.indexOf(key), 1)
      );
      setOpenInfo(newOpenInfoList.splice(openInfoList.indexOf(key), 1));
    } else {
      console.log(openInfoList, key);
      setOpenInfo([...openInfoList, key]);
    }
  };
  // const StatTable = () => (
  // 	<OutputStats>
  // 		<Col>
  // 			<StatTitle>Icon</StatTitle>
  // 			<StatResult>{icon}</StatResult>
  // 		</Col>
  // 		<Col>
  // 			<StatTitle>Result</StatTitle>
  // 			<StatResult>
  // 				<Badge>{sentimentTitle}</Badge>
  // 			</StatResult>
  // 		</Col>
  // 		<Col>
  // 			<StatTitle>Confidence</StatTitle>
  // 			<StatResult>{sentimentValue}%</StatResult>
  // 		</Col>
  // 	</OutputStats>
  // );
  console.log('openInfoList', openInfoList);
  return (
    <>
      <Sidebar />
      <Container>
        <ModelHeader>
          <ModelHeaderTitle>
            Business Analysis
            <br />
            <Icon>💰</Icon>
          </ModelHeaderTitle>
          <ModelHeaderDescription>
            <BadgeGroup>
              <Badge>Business</Badge>
              <Badge>Person</Badge>
              <Badge>Location</Badge>
              <Badge>Date</Badge>
              <Badge>Event</Badge>
              <Badge>Quantity</Badge>
              <Badge>Brand</Badge>
              <Badge>Title</Badge>
            </BadgeGroup>
          </ModelHeaderDescription>
        </ModelHeader>
        <ContentArea>
          <ModelBody>
            <Left>
              <BodyTitle>Test with your own text</BodyTitle>
              <TextArea onChange={handleChange}></TextArea>
              <Button color='blueDark' onClick={execute}>
                Analyse
              </Button>
            </Left>
            <Right>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <Ouput>
                  <OutputTitle>Business Analysis</OutputTitle>
                  {entities &&
                    entities.map(business => {
                      return (
                        <div>
                          <div>{business.name}</div>
                          <div>{business.score}</div>
                          <div>{business.type}</div>
                          <div>{business.description}</div>
                          <div>{business.articleBody}</div>
                          <div>{business.wikiUrl}</div>
                          <div>{business.url}</div>
                        </div>
                      );
                    })}
                </Ouput>
              )}
            </Right>
          </ModelBody>
          <ResultsArea>
            <DataArea>
              {selectedModel &&
                selectedModel.entityModel &&
                selectedModel.entityModel.data.map((business, key) => {
                  console.log('openInfoList', openInfoList);
                  return (
                    <BusinessCard key={key}>
                      <CardHeader>
                        <CardName>{business.name}</CardName>
                        <CardType>{business.type}</CardType>
                        <CardDesc>{business.description}</CardDesc>
                      </CardHeader>
                      {openInfoList && openInfoList.includes(key) ? (
                        <>
                          <CardBody>{business.articleBody}</CardBody>
                          <CardUrl href={business.wikiUrl} target='_blank'>
                            {business.wikiUrl}
                          </CardUrl>
                          <DownCaret onClick={() => hanldeClickOpen(key)}>
                            close
                          </DownCaret>
                          <div>{business.url}</div>
                        </>
                      ) : (
                        <DownCaret onClick={() => hanldeClickOpen(key)}>
                          open
                        </DownCaret>
                      )}
                    </BusinessCard>
                  );
                })}
            </DataArea>
            <StatsArea>
              <PieChart />
              <PieChart />
              <PieChart />
              <PieChart />
            </StatsArea>
          </ResultsArea>
        </ContentArea>
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  const { entities } = state.entity;
  const { selectedModel } = state.models;
  return {
    entities,
    selectedModel,
  };
}

const connected = connect(mapStateToProps)(BusinessAnalysis);
export { connected as BusinessAnalysis };
