import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { summaryActions, modelActions } from '../../../_actions';
import { history } from '../../../helpers';
import { Sidebar } from '../../Layout/Sidebar';
import {
  Button as ButtonBase,
  ModelBody as ModelBodyBase,
  ModelHeader,
  ModelHeaderTitle,
  Card,
} from '../../../utils/Designs';

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
const ModelBody = styled(ModelBodyBase)`
  height: 80vh;
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

const SummaryCreator = ({ dispatch, preSummaryText, isLoading, summary }) => {
  const [text, setText] = useState('');

  //   useEffect(() => {
  //     getModel();
  //   }, []);

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
    dispatch(summaryActions.execute(text, modelId));
    // getModel();
  };

  return (
    <>
      <Sidebar />
      <Container>
        <ModelHeader>
          <ModelHeaderTitle>
            Text summary
            <br />
            <Icon>📝</Icon>
          </ModelHeaderTitle>
        </ModelHeader>
        <ContentArea>
          <ModelBody>
            <Left>
              <BodyTitle>Text to summarize</BodyTitle>
              <TextArea onChange={handleChange}></TextArea>
              <Button color='blueDark' onClick={execute}>
                Summarize
              </Button>
            </Left>
            <Right>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <Ouput>
                  <OutputTitle>Summary</OutputTitle>
                  {summary}
                </Ouput>
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
