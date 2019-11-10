import React, { useState } from 'react';
import styled from 'styled-components';

import {
  sentimentActions,
  modelActions,
  uploadActions,
} from '../../../_actions';
import { history } from '../../../helpers';
import {
  Button as ButtonBase,
  Badge,
  ModelBody as ModelBodyBase,
  FlatCard,
  Input,
} from '../../../utils/Designs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import previewData from './previewData';

const ModelBody = styled(ModelBodyBase)`
  flex-direction: column;
`;

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
const UploadFileArea = styled.div`
  min-height: 100px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  padding: 10px;
  display: flex;
`;
const Ouput = styled.div`
  align-items: start;
  display: flex;
  justify-content: center;
  height: 100%;
`;
const OutputTitle = styled.h3``;

const IntegrationIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 30px;
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

const YoutubeIcon = styled(IntegrationIcon)`
  color: #ff0000;
`;

const IntegrationsDetails = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

const IntegrationCard = styled(FlatCard)`
  height: 50px;
  padding: 0px 10px;
`;

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

const DataPreview = styled.div``;

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

export const InputNewData = ({ dispatch, sentimentValue, isLoading }) => {
  const [text, setText] = useState('');
  const [fileToUpload, setFileToUpload] = useState({});
  const [selectedTab, setSelectedTab] = useState(1);
  const [youtubeUrl, setYotubeUrl] = useState();

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

  const handleYoutubeChange = e => {
    const { value } = e.target;
    setYotubeUrl(value);
  };

  const onClickAnalyseComments = () => {
    const modelId = getModelId();
    dispatch(sentimentActions.youtubeVideo(youtubeUrl, modelId));
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
                  <OutputTitle>Upload Preview</OutputTitle>
                  <DataPreview previewData={previewData} />
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
                  <OutputTitle> Analysis</OutputTitle>
                  {sentimentValue ? <StatTable /> : null}
                </Ouput>
              )}
            </Right>
          </>
        )}
        {selectedTab === 3 && (
          <>
            <Left>
              <BodyTitle>Integrations</BodyTitle>
              <IntegrationCard>
                <YoutubeIcon icon={faYoutube} />
              </IntegrationCard>
              <Input
                placeholder='Video Url or Id...'
                onChange={handleYoutubeChange}
              />
              <Button color='blueDark' onClick={onClickAnalyseComments}>
                Integrate
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
        )}
      </Content>
    </ModelBody>
  );
};
