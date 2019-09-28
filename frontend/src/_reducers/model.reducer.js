import { modelConstants } from '../constants';

export function models(state = {}, action) {
  switch (action.type) {
    case modelConstants.GETALL_REQUESTED:
      return { ...state };
    case modelConstants.GETALL_SUCCESS:
      return {
        ...state,
        modelList: action.models,
      };
    case modelConstants.GETALL_FAILURE:
      return {
        message: action.message,
      };
    case modelConstants.GET_MODEL_TYPES_REQUEST:
      return { ...state };
    case modelConstants.GET_MODEL_TYPES_SUCCESS:
      return {
        ...state,
        modelTypes: action.modelTypes,
      };
    case modelConstants.GET_MODEL_TYPES_FAILURE:
      return {
        message: action.message,
      };

    default:
      return state;
  }
}
