import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faPoll,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';

import { entityActions, modelActions } from '../../../_actions';
import { Sidebar } from '../../Layout/Sidebar';
import { history } from '../../../helpers';
import {
  Button as ButtonBase,
  PlainCard,
  Badge,
  BadgeGroup,
  ModelBody,
  ModelHeader,
  ModelHeaderDescription,
  ModelHeaderTitle,
} from '../../../utils/Designs';
import { BussinessPieChart } from '../../../components/Charts';

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
  padding: 10px 0px;
  align-items: center;
`;

const BodyTitle = styled.h3``;
const TextArea = styled.textarea`
  min-height: 100px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 14px;
`;
const Ouput = styled.div`
  height: 225px;
  overflow: scroll;
`;
const ResultsArea = styled.div`
  width: 100%;
  height: 360px;
  overflow: scroll;
  display: flex;
`;
const OutputTitle = styled.h3``;
const OutputStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
const Col = styled.div`
  font-size: 14px;
`;
const StatTitle = styled.div`
  margin-bottom: 10px;
  border-bottom: 1px solid blue;
`;
const StatResult = styled.p`
  margin: 0;
  padding: 0;
`;

const ResultType = styled(StatResult)`
  color: ${props => props.theme.color.blueDark};
`;

const BusinessCard = styled(PlainCard)`
  padding: 10px;
`;
const SqueletonCard = styled.div`
  width: 95%;
  height: 40px;
  background-color: #80808014;
  margin: 15px;
  border-radius: 5px;
`;
const Squeleton = styled.div`
  position: relative;
`;
const SqueletonIcon = styled.div`
  position: absolute;
  top: 100px;
  left: 115px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const CardHeader = styled.div`
  grid-template-columns: 1fr 1fr 1fr;
  display: grid;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const CardBody = styled.div`
  margin: 10px 0px;
  font-size: 12px;
`;
const CardUrl = styled.a`
  font-size: 14px;
`;
const CardName = styled.h5`
  color: blue;
  margin: 0px;
`;
const CardType = styled.h5`
  color: green;
  margin: 0px;
`;
const DataArea = styled.div`
  width: 55%;
  overflow: scroll;
  height: 98%;
`;
const StatsArea = styled(PlainCard)`
  width: 45%;
  padding: 0;
  align-items: center;
`;
const CardDesc = styled.h6`
  margin: 0px;
`;

const DownCaret = styled(FontAwesomeIcon)`
  left: 0;
  position: absolute;
  bottom: -3px;
  background-color: transparent;
  border-radius: 10px;
  padding: 0px 10px;
  font-size: 18px;
  cursor: pointer;
`;

const ChartIcon = styled(FontAwesomeIcon)`
  font-size: 50px;
  color: ${props => props.theme.color.blueDark};
`;
const TextIcon = styled(ChartIcon)``;
const EmptyStateText = styled.h2``;

const Results = ({ data }) => {
  if (!data) return null;
  return (
    <OutputStats>
      <Col>
        <StatTitle>Name</StatTitle>
      </Col>
      <Col>
        <StatTitle>Type</StatTitle>
      </Col>
      <Col>
        <StatTitle>Confidence</StatTitle>
      </Col>
      {data.map(entity => {
        const { name, score, type } = entity;
        return (
          <>
            <Col>
              <StatResult>{name}</StatResult>
            </Col>
            <Col>
              <ResultType>{type}</ResultType>
            </Col>
            <Col>
              <StatResult>{(score * 100).toFixed(2)}%</StatResult>
            </Col>
          </>
        );
      })}
    </OutputStats>
  );
};

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
  };
  const hanldeClickOpen = key => {
    if (openInfoList && openInfoList.includes(key)) {
      const indexOfKey = openInfoList.indexOf(key);
      const newArray = [...openInfoList];
      newArray.splice(indexOfKey, 1);
      setOpenInfo([...newArray]);
    } else {
      const newList = openInfoList;
      newList.push(key);
      setOpenInfo([...newList]);
    }
  };

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
              <BodyTitle>Analyze your text</BodyTitle>
              <TextArea
                placeholder='Write here your text to analyze...'
                onChange={handleChange}></TextArea>
              <Button color='blueDark' onClick={execute}>
                Analyze
              </Button>
            </Left>
            <Right hasData={entities}>
              {isLoading ? (
                <div>Loading...</div>
              ) : entities ? (
                <Ouput>
                  <OutputTitle>Business Analysis</OutputTitle>
                  <Results data={entities} />
                </Ouput>
              ) : (
                <>
                  <ChartIcon icon={faPoll} />
                  <EmptyStateText>No Analysis yet!</EmptyStateText>
                </>
              )}
            </Right>
          </ModelBody>
          <ResultsArea>
            <DataArea>
              {selectedModel &&
              selectedModel.entityModel &&
              selectedModel.entityModel.data.length ? (
                selectedModel.entityModel.data.map((business, key) => {
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
                          <DownCaret
                            icon={faCaretUp}
                            onClick={() => hanldeClickOpen(key)}
                          />
                        </>
                      ) : (
                        <DownCaret
                          icon={faCaretDown}
                          onClick={() => hanldeClickOpen(key)}
                        />
                      )}
                    </BusinessCard>
                  );
                })
              ) : (
                <Squeleton>
                  <SqueletonCard />
                  <SqueletonCard />
                  <SqueletonCard />
                  <SqueletonCard />
                  <SqueletonCard />
                  <SqueletonCard />
                  <SqueletonIcon>
                    <ChartIcon icon={faFileAlt} />
                    <EmptyStateText>No history </EmptyStateText>
                  </SqueletonIcon>
                </Squeleton>
              )}
            </DataArea>
            <StatsArea>
              <BussinessPieChart data={selectedModel} />
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
