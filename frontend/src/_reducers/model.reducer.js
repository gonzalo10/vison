import { modelConstants } from "../constants";

const initialState = {
  modelList: {},
  isModelListLoading: false,
  areModelsLoaded: false
};

export function models(state = { ...initialState }, action) {
  switch (action.type) {
    case modelConstants.GETALL_REQUEST:
      return {
        ...state,
        isModelListLoading: true,
        areModelsLoaded: false
      };

    case modelConstants.GETALL_SUCCESS:
      return {
        ...state,
        modelList: action.models,
        isModelListLoading: false,
        areModelsLoaded: true
      };

    case modelConstants.GETALL_FAILURE:
      return {
        ...state,
        message: action.message,
        isModelListLoading: false,
        areModelsLoaded: false
      };

    case modelConstants.GET_MODEL_TYPES_REQUEST:
      return {
        ...state
      };

    case modelConstants.GET_MODEL_TYPES_SUCCESS:
      return {
        ...state,
        modelTypes: action.modelTypes.modelType
      };

    case modelConstants.GET_MODEL_TYPES_FAILURE:
      return {
        ...state,
        message: action.message
      };

    case modelConstants.CREATE_MODEL_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case modelConstants.CREATE_MODEL_SUCCESS:
      return {
        ...state,
        modelTypes: action.modelTypes.modelType,
        isLoading: false
      };

    case modelConstants.CREATE_MODEL_FAILURE:
      return {
        ...state,
        message: action.message
      };

    case modelConstants.GET_MODEL_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case modelConstants.GET_MODEL_SUCCESS:
      return {
        ...state,
        selectedModel: action.model,
        isLoading: false
      };

    case modelConstants.GET_MODEL_FAILURE:
      return {
        ...state,
        message: action.message
      };

    case modelConstants.DELETE_MODEL_REQUEST:
      return {
        ...state
      };

    case modelConstants.DELETE_MODEL_SUCCESS:
      return {
        ...state
      };

    case modelConstants.DELETE_MODEL_FAILURE:
      return {
        message: action.message
      };

    default:
      return state;
  }
}
