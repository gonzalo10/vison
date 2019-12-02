import { uploadFileConstants } from "../constants";

export function uploadedFile(state = {}, action) {
  switch (action.type) {
    case uploadFileConstants.UPLOAD_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case uploadFileConstants.UPLOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataSetPreview: action.dataSetPreview
      };
    case uploadFileConstants.UPLOAD_FAILURE:
      return {
        ...state,
        message: action.message
      };

    default:
      return state;
  }
}
