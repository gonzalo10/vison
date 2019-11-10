import { uploadFileConstants } from '../constants';

export function uploadedFile(state = {}, action) {
  switch (action.type) {
    case uploadFileConstants.UPLOAD_REQUEST:
      return {
        isLoading: true,
      };
    case uploadFileConstants.UPLOAD_SUCCESS:
      return {
        isLoading: false,
        dataSetPreview: action.dataSetPreview,
      };
    case uploadFileConstants.UPLOAD_FAILURE:
      return {
        message: action.message,
      };

    default:
      return state;
  }
}
