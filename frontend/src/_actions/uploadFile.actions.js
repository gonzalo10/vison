import { uploadFileConstants } from '../constants';
import { uploadService } from '../_services';

export const uploadActions = {
  uploadFile,
};

function uploadFile(data) {
  return dispatch => {
    dispatch(request());
    uploadService.uploadFile(data).then(
      response => {
        const { name, dataSet } = response.data;
        localStorage.setItem('uploadedFile', name);
        dispatch(success(dataSet));
      },
      error => {
        console.log('error', error);
        dispatch(failure(error.toString()));
      }
    );
  };
  // return dispatch => {
  //   dispatch(request());
  //   console.log(data, modelId);
  //   uploadService.uploadFile(data, modelType, modelId).then(
  //     response => {
  //       console.log(response);
  //     },
  //     error => {
  //       console.log('error', error);
  //       dispatch(failure(error.toString()));
  //     }
  //   );
  // };

  function request() {
    return { type: uploadFileConstants.UPLOAD_REQUEST };
  }
  function success(dataSetPreview) {
    return { type: uploadFileConstants.UPLOAD_SUCCESS, dataSetPreview };
  }
  function failure(error) {
    return { type: uploadFileConstants.UPLOAD_FAILURE, error };
  }
}
