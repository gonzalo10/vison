import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { modelActions } from '../../../_actions';
import { history } from '../../../helpers';
import { Sidebar } from '../../Layout/Sidebar';
import {
  Badge,
  BadgeGroup,
  ModelHeader,
  ModelHeaderTitle,
  ModelHeaderDescription,
  FlatCard,
} from '../../../utils/Designs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { PieChart } from '../../../components/Charts';
import { InputNewData } from './InputNewData';

const Container = styled.div`
  margin-left: 100px;
  height: 100vh;
  background-color: ${props => props.theme.color.beigeWhite}
  display: flex;
  flex-direction: column;
`;

const Icon = styled.span`
  font-size: 30px;
`;

const ContentArea = styled.div`
  margin: auto;
  margin-top: 0px;
  width: 90%;
  height: 100%;
  display: ${props => !props.isLoad && 'none'};
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
  display: flex;
  flex-direction: column;
`;
const DataArea = styled(FlatCard)`
  padding: 10px 10px;
  cursor: default;
  height: 300px;
  align-items: center;
  justify-content: ${props => (props.hasData ? 'start' : 'center')};
`;

const StatsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
const StatsArea = styled(FlatCard)`
  display: flex;
  justify-content: center;
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

const TableBody = styled.div`
  overflow: scroll;
`;

const SentimentAnalysis = ({
  dispatch,
  sentimentTitle,
  sentimentValue,
  icon,
  isLoading,
  sentimentModel,
}) => {
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

  const areStatsReady = () => {
    return (
      sentimentModel &&
      sentimentModel.data.length &&
      sentimentModel.stats &&
      !isLoading
    );
  };
  return (
    <>
      <Sidebar />
      <Container>
        <ModelHeader>
          <ModelHeaderTitle>
            <div
              contentEditable='true'
              // onInput={e => console.log('has changed', e.target.textContent)}
              onBlur={e => console.log('has stopeed', e.target.textContent)}>
              {sentimentModel && sentimentModel.title}
            </div>
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
        {/* <InputNewData
          dispatch={dispatch}
          sentimentTitle={sentimentTitle}
          sentimentValue={sentimentValue}
          icon={icon}
          isLoading={isLoading}
        /> */}
        <ContentArea isLoad={!!sentimentModel}>
          <ResultsArea>
            <DataArea hasData={sentimentModel && sentimentModel.data.length}>
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
                  <TableBody>
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
                  </TableBody>
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
            <StatsWrapper>
              <StatsArea>
                {areStatsReady() ? (
                  <PieChart data={sentimentModel.stats} />
                ) : (
                  <>
                    <ChartIcon icon={faChartPie} />
                    <EmptyStateText>No charts yet!</EmptyStateText>
                  </>
                )}
              </StatsArea>
              <StatsArea>
                {areStatsReady() ? (
                  <PieChart data={sentimentModel.stats} />
                ) : (
                  <>
                    <ChartIcon icon={faChartPie} />
                    <EmptyStateText>No charts yet!</EmptyStateText>
                  </>
                )}
              </StatsArea>
              <StatsArea>
                {areStatsReady() ? (
                  <PieChart data={sentimentModel.stats} />
                ) : (
                  <>
                    <ChartIcon icon={faChartPie} />
                    <EmptyStateText>No charts yet!</EmptyStateText>
                  </>
                )}
              </StatsArea>
            </StatsWrapper>
          </ResultsArea>
        </ContentArea>
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  const { sentimentTitle, sentimentValue, icon } = state.sentiment;
  const { selectedModel, isLoading } = state.models;
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
