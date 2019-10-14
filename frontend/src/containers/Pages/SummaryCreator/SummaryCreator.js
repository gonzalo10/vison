import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { summaryActions, modelActions } from '../../../_actions';
import { history } from '../../../helpers';
import { Sidebar } from '../../Layout/Sidebar';
import {
  Button as ButtonBase,
  ModelBody as ModelBodyBase,
  ModelHeader as ModelHeaderBase,
  ModelHeaderTitle as ModelHeaderTitleBase,
  Card,
} from '../../../utils/Designs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faAlignJustify,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  margin-left: 100px;
  height: 100vh;
  background-color: ${props => props.theme.color.beigeWhite}
  display: flex;
  flex-direction: column;
`;

const ModelHeader = styled(ModelHeaderBase)`
  height: 60px;
`;
const ModelHeaderTitle = styled(ModelHeaderTitleBase)`
  flex-direction: row;
  align-items: center;
`;

const Button = styled(ButtonBase)`
  width: 200px;
  margin: auto;
`;

const Icon = styled.span`
  font-size: 30px;
  margin-left: 10px;
`;

const Left = styled.div`
  border-right: 1px solid grey;
  height: 97%;
  width: 50%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
`;
const Right = styled.div`
  width: 50%;
  justify-content: space-around;
  display: flex;
  flex-direction: column;
`;

const BodyTitle = styled.h3``;
const TextArea = styled.textarea`
  min-height: 100px;
  border-radius: 10px;
  margin-bottom: 10px;
  height: 100%;
  font-size: 16px;
`;
const Ouput = styled.div`
  overflow: scroll;
  height: 630px;
  padding: 10px 20px;
`;
const OutputTitle = styled.h3``;
const ModelBody = styled(ModelBodyBase)`
  height: 80vh;
  width: 100%;
`;

const EmptySate = styled.div`
  align-items: center;
`;

const ContentArea = styled.div`
  margin: auto;
  margin-top: 0px;
  width: 90%;
`;
const OutputText = styled.p`
  text-align: justify;
  display: flex;
`;

const SummarySizeArea = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SummarySizeInput = styled.input`
  font-size: 14px;
  width: 40px;
  padding: 5px;
  margin-left: 15px;
  border: none;
  border-bottom: 2px solid ${props => props.theme.color.blueDark};
  text-align: center;
`;

const ChartIcon = styled(FontAwesomeIcon)`
  font-size: 50px;
  color: ${props => props.theme.color.blueDark};
`;
const TextIcon = styled(ChartIcon)``;
const EmptyStateText = styled.h2``;

const SummaryCreator = ({ dispatch, preSummaryText, isLoading, summary }) => {
  const [text, setText] = useState('');
  const [summarySize, setSummarySize] = useState(80);

  //   useEffect(() => {
  //     getModel();
  //   }, []);

  const handleSummarySizeChange = e => {
    const { value } = e.target;
    setSummarySize(+value);
  };

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
    dispatch(summaryActions.execute(text, summarySize, modelId));
    // getModel();
  };

  return (
    <>
      <Sidebar />
      <Container>
        <ModelHeader>
          <ModelHeaderTitle>
            Text summary<Icon>📝</Icon>
          </ModelHeaderTitle>
        </ModelHeader>
        <ContentArea>
          <ModelBody>
            <Left>
              <BodyTitle>Text to summarize</BodyTitle>
              <TextArea
                placeholder='Write here the text you want to summarize...'
                onChange={handleChange}></TextArea>
              <SummarySizeArea>
                Sumarize to
                <SummarySizeInput
                  placeholder='80'
                  type='number'
                  onChange={handleSummarySizeChange}
                />
                %
              </SummarySizeArea>
              <Button color='blueDark' onClick={execute}>
                Summarize
              </Button>
            </Left>
            <Right>
              {isLoading ? (
                <div>Loading...</div>
              ) : summary ? (
                <Ouput>
                  <OutputTitle>Summary</OutputTitle>
                  <OutputText>{summary}</OutputText>
                </Ouput>
              ) : (
                <EmptySate>
                  <ChartIcon icon={faFileAlt} />
                  <EmptyStateText>No summary yet!</EmptyStateText>
                </EmptySate>
              )}
            </Right>
          </ModelBody>
        </ContentArea>
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  const { preSummaryText, summary, isLoading } = state.summary;
  return {
    preSummaryText,
    summary,
    isLoading,
  };
}

const connectedSummary = connect(mapStateToProps)(SummaryCreator);
export { connectedSummary as SummaryCreator };
