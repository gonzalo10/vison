import React, { useState } from 'react';
import styled from 'styled-components';

import { history } from '../../../helpers';
import { uploadActions } from '../../../_actions';
import { Button as ButtonBase } from '../../../utils/Designs';
import previewData from './previewData';

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

const DataPreview = styled.div``;

export const UploadFile = ({ dispatch, isLoading }) => {
  const [fileToUpload, setFileToUpload] = useState({});

  const onClickLoadFile = e => {
    setFileToUpload({ selectedFile: e.target.files[0] });
  };
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

  return (
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
  );
};
