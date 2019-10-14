import { modelConstants } from '../constants';

export function models(state = {}, action) {
  switch (action.type) {
    case modelConstants.GETALL_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case modelConstants.GETALL_SUCCESS:
      return {
        ...state,
        modelList: action.models,
        isLoading: false,
      };

    case modelConstants.GETALL_FAILURE:
      return {
        message: action.message,
      };

    case modelConstants.GET_MODEL_TYPES_REQUEST:
      return {
        ...state,
      };

    case modelConstants.GET_MODEL_TYPES_SUCCESS:
      return {
        ...state,
        modelTypes: action.modelTypes.modelType,
      };

    case modelConstants.GET_MODEL_TYPES_FAILURE:
      return {
        message: action.message,
      };

    case modelConstants.CREATE_MODEL_REQUEST:
      return {
        ...state,
      };

    case modelConstants.CREATE_MODEL_SUCCESS:
      return {
        ...state,
        modelTypes: action.modelTypes.modelType,
      };

    case modelConstants.CREATE_MODEL_FAILURE:
      return {
        message: action.message,
      };

    case modelConstants.GET_MODEL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case modelConstants.GET_MODEL_SUCCESS:
      return {
        ...state,
        selectedModel: action.model,
        isLoading: false,
      };

    case modelConstants.GET_MODEL_FAILURE:
      return {
        message: action.message,
      };

    case modelConstants.DELETE_MODEL_REQUEST:
      return {
        ...state,
      };

    case modelConstants.DELETE_MODEL_SUCCESS:
      return {
        ...state,
      };

    case modelConstants.DELETE_MODEL_FAILURE:
      return {
        message: action.message,
      };

    default:
      return state;
  }
}
