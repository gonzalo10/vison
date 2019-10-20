import { uploadFileConstants } from '../constants';
import { uploadService } from '../_services';

export const uploadActions = {
  uploadFile,
};

function uploadFile(data, modelId) {
  return dispatch => {
    dispatch(request());
    console.log(data, modelId);
    uploadService.uploadFile(data, modelId).then(
      response => {
        console.log(response);
      },
      error => {
        console.log('error', error);
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: uploadFileConstants.UPLOAD_REQUEST };
  }
  function success(createdSummary) {
    return { type: uploadFileConstants.UPLOAD_SUCCESS, createdSummary };
  }
  function failure(error) {
    return { type: uploadFileConstants.UPLOAD_FAILURE, error };
  }
}
