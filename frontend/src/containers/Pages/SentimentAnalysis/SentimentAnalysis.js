import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { sentimentActions, modelActions } from '../../../_actions';
import { history } from '../../../helpers';
import { Sidebar } from '../../Layout/Sidebar';
import {
  Button as ButtonBase,
  Badge,
  BadgeGroup,
  ModelBody,
  ModelHeader,
  ModelHeaderTitle,
  ModelHeaderDescription,
  Card,
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

const Icon = styled.span`
  font-size: 30px;
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
  grid-template-columns: 3fr 1fr 1fr;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 5px;
  padding-top: 5px;
  overflow: scroll;
`;

const ResultsArea = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
`;
const DataArea = styled(Card)`
  width: 60%;
  overflow: scroll;
`;
const StatsArea = styled(Card)`
  display: flex;
  justify-content: center;
  width: 50%;
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
    dispatch(sentimentActions.execute(text, modelId));
    getModel();
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
            <Left>
              <BodyTitle>Analyze your text</BodyTitle>
              <TextArea onChange={handleChange}></TextArea>
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
                  {console.log(icon)}
                  {sentimentValue ? <StatTable /> : null}
                </Ouput>
              )}
            </Right>
          </ModelBody>
          <ResultsArea>
            <DataArea>
              <ResultRow>
                <div>
                  <strong>text</strong>
                </div>
                <div>
                  <strong>sentiment</strong>
                </div>
                <div>
                  <strong>Accuracy</strong>
                </div>
              </ResultRow>
              {sentimentModel
                ? sentimentModel.data.map(
                    (
                      { text, sentiment, mixed, neutral, positive, negative },
                      key
                    ) => {
                      return (
                        <ResultRow key={key}>
                          <div>{text}</div>
                          <div>{sentiment}</div>
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
                  )
                : null}
            </DataArea>
            <StatsArea>
              {sentimentModel && sentimentModel.stats && (
                <PieChart data={sentimentModel.stats} />
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
