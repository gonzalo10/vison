import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import { Mutation, gql } from 'apollo-boost';

import {
  sentimentActions,
  modelActions,
  uploadActions,
} from '../../../_actions';
import { history } from '../../../helpers';
import { Sidebar } from '../../Layout/Sidebar';
import {
  Button as ButtonBase,
  Badge,
  BadgeGroup,
  ModelBody as ModelBodyBase,
  ModelHeader,
  ModelHeaderTitle,
  ModelHeaderDescription,
  FlatCard,
} from '../../../utils/Designs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faAlignJustify,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';
import { PieChart } from '../../../components/Charts';
const gql = require('graphql-tag');
const { Mutation } = require('react-apollo');

const ModelBody = styled(ModelBodyBase)`
  flex-direction: column;
`;

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

const Icon = styled.span`
  font-size: 30px;
`;

const Left = styled.div`
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
  font-size: 16px;
  padding: 10px;
`;
const UploadFileArea = styled.div`
  min-height: 100px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  padding: 10px;
  display: flex;
`;
const Ouput = styled.div``;
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
const ContentArea = styled.div`
  margin: auto;
  margin-top: 0px;
  width: 90%;
`;
const ResultRow = styled.div`
  display: grid;
  width: 100%;
  max-height: 18px;
  grid-template-columns: 5fr 2fr 2fr;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 5px;
  padding-top: 5px;
  font-size: 14px;
`;

const ResultsArea = styled.div`
  width: 100%;
  height: 360px;
  display: flex;
`;
const DataArea = styled(FlatCard)`
  width: 60%;
  padding: 10px 10px;
  cursor: default;
  overflow: scroll;
  align-items: center;
  justify-content: ${props => (props.hasData ? 'start' : 'center')};
`;
const StatsArea = styled(FlatCard)`
  display: flex;
  justify-content: center;
  width: 50%;
  align-items: center;
  cursor: default;
`;

const LongTextDiv = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 0px 10px;
`;

const SentimentText = styled.p`
  margin: 0;
  padding: 0;
  color: ${props => props.theme.color.blueDark};
`;

const ChartIcon = styled(FontAwesomeIcon)`
  font-size: 50px;
  color: ${props => props.theme.color.blueDark};
`;
const TextIcon = styled(ChartIcon)``;
const EmptyStateText = styled.h2``;
const SqueletonCard = styled.div`
  width: 95%;
  height: 40px;
  background-color: #80808014;
  margin: 15px;
  border-radius: 5px;
`;
const Squeleton = styled.div`
  width: 100%;
  position: relative;
`;
const SqueletonIcon = styled.div`
  position: absolute;
  top: 36%;
  left: 40%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const TabList = styled.div`
  width: 100%;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
`;
const Tab = styled.button`
  width: 30%;
  border: 0px;
  cursor: pointer;
  font-size: 16px;
  margin: 0px 10px;
  border-bottom: 2px solid transparent;
  background-color: white;
  border-bottom: ${props =>
    props.isSelected && `2px solid ${props.theme.color.blueDark}`};
  &:hover {
    border-bottom: 2px solid ${props => props.theme.color.blueDark};
  }
`;

const SentimentAnalysis = ({
  dispatch,
  sentimentTitle,
  sentimentValue,
  icon,
  isLoading,
  sentimentModel,
}) => {
  const [text, setText] = useState('');
  const [fileToUpload, setFileToUpload] = useState({});
  const [selectedTab, setSelectedTab] = useState(1);

  useEffect(() => {
    getModel();
  }, []);

  const getModelId = () => {
    const url = history.location.pathname.split('/');
    const id = url[url.length - 1];
    return id;
  };
  const getModelType = () => {
    const url = history.location.pathname.split('/');
    const modeType = url[url.length - 2];
    return modeType;
  };

  const getModel = () => {
    const id = getModelId();
    const modelType = getModelType();
    dispatch(modelActions.getModel(id, modelType));
  };

  const handleChange = e => {
    setText(e.target.value);
  };
  const execute = () => {
    const modelId = getModelId();
    dispatch(sentimentActions.execute(text, modelId));
    getModel();
  };

  const onClickLoadFile = e => {
    setFileToUpload({ selectedFile: e.target.files[0] });
  };

  const onClickHandlerUpload = () => {
    const data = new FormData();
    const modelId = getModelId();
    const modelType = getModelType();
    data.append('file', fileToUpload.selectedFile);
    dispatch(uploadActions.uploadFile(data, modelType, modelId));
  };

  const onClickOpenUplodBox = () => {
    document.getElementById('uploadDialog').click();
  };

  const StatTable = () => (
    <OutputStats>
      <Col>
        <StatTitle>Icon</StatTitle>
        <StatResult>{icon}</StatResult>
      </Col>
      <Col>
        <StatTitle>Result</StatTitle>
        <StatResult>
          <Badge>{sentimentTitle}</Badge>
        </StatResult>
      </Col>
      <Col>
        <StatTitle>Confidence</StatTitle>
        <StatResult>{sentimentValue}%</StatResult>
      </Col>
    </OutputStats>
  );
  return (
    <>
      <Sidebar />
      <Container>
        <ModelHeader>
          <ModelHeaderTitle>
            Sentiment Analysis
            <br />
            <Icon>😍/😡</Icon>
          </ModelHeaderTitle>
          <ModelHeaderDescription>
            <BadgeGroup>
              <Badge>Positive</Badge>
              <Badge>Neutral</Badge>
              <Badge>Negative</Badge>
              <Badge>Mixed</Badge>
            </BadgeGroup>
          </ModelHeaderDescription>
        </ModelHeader>
        <ContentArea>
          <ModelBody>
            <TabList>
              <Tab
                onClick={() => setSelectedTab(1)}
                isSelected={selectedTab === 1}>
                Upload
              </Tab>
              <Tab
                onClick={() => setSelectedTab(2)}
                isSelected={selectedTab === 2}>
                Write
              </Tab>
              <Tab
                onClick={() => setSelectedTab(3)}
                isSelected={selectedTab === 3}>
                Integrations
              </Tab>
            </TabList>
            <Content>
              {selectedTab === 1 && (
                <>
                  <Left>
                    <BodyTitle>Analyze your text</BodyTitle>
                    <input
                      style={{ display: 'none' }}
                      type='file'
                      id='uploadDialog'
                      name='file'
                      onChange={onClickLoadFile}
                    />
                    <UploadFileArea>
                      <Button
                        variant='outlined'
                        color='blueDark'
                        onClick={onClickOpenUplodBox}>
                        {fileToUpload.selectedFile
                          ? fileToUpload.selectedFile.name
                          : 'Upload csv'}
                      </Button>
                    </UploadFileArea>
                    <Button color='blueDark' onClick={onClickHandlerUpload}>
                      Classify Text
                    </Button>
                  </Left>
                  <Right>
                    {isLoading ? (
                      <div>Loading...</div>
                    ) : (
                      <Ouput>
                        <OutputTitle>Sentiment Analysis</OutputTitle>
                        {sentimentValue ? <StatTable /> : null}
                      </Ouput>
                    )}
                  </Right>
                </>
              )}
              {selectedTab === 2 && (
                <>
                  <Left>
                    <BodyTitle>Analyze your text</BodyTitle>
                    <TextArea
                      placeholder='Write your text here to analyze....'
                      onChange={handleChange}></TextArea>
                    <Button color='blueDark' onClick={execute}>
                      Classify Text
                    </Button>
                  </Left>
                  <Right>
                    {isLoading ? (
                      <div>Loading...</div>
                    ) : (
                      <Ouput>
                        <OutputTitle>Sentiment Analysis</OutputTitle>
                        {sentimentValue ? <StatTable /> : null}
                      </Ouput>
                    )}
                  </Right>
                </>
              )}
              {selectedTab === 3 && (
                <>
                  <TextArea
                    placeholder='Write your text here to analyze....'
                    onChange={handleChange}></TextArea>
                  <Button color='blueDark' onClick={execute}>
                    Integrate
                  </Button>
                </>
              )}
            </Content>
          </ModelBody>
          <ResultsArea>
            <DataArea hasData={sentimentModel && sentimentModel.data.length} h>
              {sentimentModel && sentimentModel.data.length ? (
                <>
                  <ResultRow>
                    <div>
                      <strong>Text</strong>
                    </div>
                    <div>
                      <strong>Sentiment</strong>
                    </div>
                    <div>
                      <strong>Confidence</strong>
                    </div>
                  </ResultRow>
                  {sentimentModel.data.map(
                    (
                      { text, sentiment, mixed, neutral, positive, negative },
                      key
                    ) => {
                      return (
                        <ResultRow key={key}>
                          <LongTextDiv>{text}</LongTextDiv>
                          <SentimentText>{sentiment}</SentimentText>
                          <div>
                            {Math.max(
                              mixed,
                              neutral,
                              negative,
                              positive
                            ).toFixed(2)}
                          </div>
                        </ResultRow>
                      );
                    }
                  )}
                </>
              ) : (
                !isLoading && (
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
                )
              )}
            </DataArea>
            {console.log(
              'sentimentModel',
              sentimentModel && sentimentModel.data
            )}
            <StatsArea>
              {sentimentModel &&
              sentimentModel.data.length &&
              sentimentModel.stats ? (
                <PieChart data={sentimentModel.stats} />
              ) : (
                <>
                  <ChartIcon icon={faChartPie} />
                  <EmptyStateText>No charts yet!</EmptyStateText>
                </>
              )}
            </StatsArea>
          </ResultsArea>
        </ContentArea>
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  const { sentimentTitle, sentimentValue, isLoading, icon } = state.sentiment;
  const { selectedModel } = state.models;
  let sentimentModel = undefined;
  if (selectedModel) sentimentModel = selectedModel.sentimentModel;
  return {
    sentimentTitle,
    sentimentValue,
    isLoading,
    icon,
    sentimentModel,
  };
}

const connectedSentiment = connect(mapStateToProps)(SentimentAnalysis);
export { connectedSentiment as SentimentAnalysis };
