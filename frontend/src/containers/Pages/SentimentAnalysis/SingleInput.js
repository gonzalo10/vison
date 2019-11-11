import React, { useState } from 'react';
import styled from 'styled-components';

import { sentimentActions, modelActions } from '../../../_actions';
import { history } from '../../../helpers';
import { Button as ButtonBase, Badge } from '../../../utils/Designs';

const Button = styled(ButtonBase)`
  width: 200px;
  margin: auto;
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
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding: 10px 30px;
`;

const BodyTitle = styled.h3``;
const TextArea = styled.textarea`
  min-height: 100px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  padding: 10px;
`;

const Ouput = styled.div`
  align-items: start;
  display: flex;
  justify-content: center;
  height: 100%;
`;
const OutputTitle = styled.h3``;

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

const StatTable = ({ icon, sentimentTitle, sentimentValue }) => (
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

export const SingleInput = ({ dispatch, sentimentValue, isLoading }) => {
  const [text, setText] = useState('');

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

  return (
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
            <OutputTitle> Analysis</OutputTitle>
            {sentimentValue ? <StatTable /> : null}
          </Ouput>
        )}
      </Right>
    </>
  );
};
