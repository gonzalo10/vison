import React, { useState } from 'react';
import styled from 'styled-components';

import { Button } from '../utils/Designs';

const UploadFileArea = styled.div`
  border-radius: 10px;
  font-size: 16px;
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
    <UploadFileArea>
      <input
        style={{ display: 'none' }}
        type='file'
        id='uploadDialog'
        name='file'
        onChange={onClickLoadFile}
      />
      <Button variant='outlined' color='blueDark' onClick={onClickOpenUplodBox}>
        {fileToUpload.selectedFile
          ? fileToUpload.selectedFile.name
          : 'Upload csv'}
      </Button>
    </UploadFileArea>
  );
};

export default UploadFile;
