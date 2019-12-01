import React, { useState } from "react";
import styled from "styled-components";

import { Button } from "../utils/Designs";
import { store } from "../helpers";
import { uploadActions } from "../_actions";

const UploadFileArea = styled.div`
  border-radius: 10px;
  font-size: 16px;
`;

const UploadFile = ({ modelType }) => {
  const [fileToUpload, setFileToUpload] = useState({});
  const [uploadedFile, setUploadedFile] = useState(false);

  const onClickLoadFile = e => {
    setFileToUpload({ selectedFile: e.target.files[0] });
    setUploadedFile(true);
  };
  const onClickOpenUplodBox = () => {
    document.getElementById("uploadDialog").click();
  };
  const onClickHandlerUpload = () => {
    const data = new FormData();
    data.append("file", fileToUpload.selectedFile);
    store.dispatch(uploadActions.uploadFile(data));
  };

  const { selectedFile } = fileToUpload;
  return (
    <UploadFileArea>
      <input
        style={{ display: "none" }}
        type="file"
        id="uploadDialog"
        name="file"
        onChange={onClickLoadFile}
      />
      <Button variant="outlined" color="blueDark" onClick={onClickOpenUplodBox}>
        {selectedFile ? selectedFile.name : "Upload csv"}
      </Button>
      <Button
        color="blueDark"
        onClick={onClickHandlerUpload}
        disabled={!uploadedFile}
      >
        Upload
      </Button>
    </UploadFileArea>
  );
};

export default UploadFile;
