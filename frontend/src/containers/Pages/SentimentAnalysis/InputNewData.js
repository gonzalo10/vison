import React, { useState } from 'react';
import styled from 'styled-components';

import { modelActions } from '../../../_actions';
import { history } from '../../../helpers';
import { ModelBody as ModelBodyBase } from '../../../utils/Designs';
import { UploadFile } from './UploadFile';
import { SingleInput } from './SingleInput';
const ModelBody = styled(ModelBodyBase)`
  flex-direction: column;
`;

const TabList = styled.div`
  width: 100%;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
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

export const InputNewData = ({ dispatch, sentimentValue, isLoading }) => {
  const [selectedTab, setSelectedTab] = useState(1);

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

  return (
    <ModelBody>
      <TabList>
        <Tab onClick={() => setSelectedTab(1)} isSelected={selectedTab === 1}>
          Upload
        </Tab>
        <Tab onClick={() => setSelectedTab(2)} isSelected={selectedTab === 2}>
          Write
        </Tab>
        <Tab onClick={() => setSelectedTab(3)} isSelected={selectedTab === 3}>
          Integrations
        </Tab>
      </TabList>
      <Content>
        {selectedTab === 1 && (
          <UploadFile dispatch={dispatch} isLoading={isLoading} />
        )}
        {selectedTab === 2 && (
          <SingleInput
            dispatch={dispatch}
            isLoading={isLoading}
            sentimentValue={sentimentValue}
          />
        )}
      </Content>
    </ModelBody>
  );
};
