import React, { useState } from 'react';
import styled from 'styled-components';

import { Button } from '../utils/Designs';

const UploadFileArea = styled.div`
  min-height: 100px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  padding: 10px;
  display: flex;
`;

const UploadFile = () => {
  const [fileToUpload, setFileToUpload] = useState({});

  const onClickLoadFile = e => {
    setFileToUpload({ selectedFile: e.target.files[0] });
  };
  const onClickOpenUplodBox = () => {
    document.getElementById('uploadDialog').click();
  };
  return (
    <>
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
    </>
  );
};

export default UploadFile;
