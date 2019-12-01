import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import UploadFile from "../../../helpers/uploadData";
import PreviewData from "../../../components/PreviewData";
import { Button } from "../../../utils/Designs";
import { modelActions, modalActions } from "../../../_actions";

const WizardTitle = styled.h1`
  text-align: center;
`;
const UploadFileWrapper = styled.div`
  justify-content: center;
  display: flex;
`;

const PreviewWrapper = styled.div`
  justify-content: center;
  display: flex;
  min-height: 40%;
  align-items: center;
  flex-direction: column;
`;

const UploadDataModel = ({
  dataSetPreview,
  modelType,
  title,
  description,
  dispatch
}) => {
  const onClickCreateModel = () => {
    const fileName = localStorage.getItem("uploadedFile");
    dispatch(
      modelActions.createModelFromFile({
        fileName,
        modelType,
        title,
        description
      })
    );
    dispatch(modalActions.closeModal());
  };
  return (
    <>
      <WizardTitle>Upload Data</WizardTitle>
      <UploadFileWrapper>
        <UploadFile />
      </UploadFileWrapper>
      <PreviewWrapper style={{ display: "flex", justifyContent: "center" }}>
        <PreviewData data={dataSetPreview || null} />
        <Button
          color="blueDark"
          onClick={onClickCreateModel}
          disabled={!dataSetPreview}
        >
          Create Model
        </Button>
      </PreviewWrapper>
    </>
  );
};

function mapStateToProps(state) {
  const { dataSetPreview } = state.uploadedFile;
  return {
    dataSetPreview
  };
}

const connectedUploadDataModel = connect(mapStateToProps)(UploadDataModel);
export { connectedUploadDataModel as UploadDataModel };
