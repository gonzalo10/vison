import { modelConstants } from "../constants";

export function entity(state = {}, action) {
  switch (action.type) {
    case modelConstants.EXECUTE_ENTITY_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case modelConstants.EXECUTE_ENTITY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entities: action.entities
      };
    case modelConstants.EXECUTE_ENTITY_FAILURE:
      return {
        ...state,
        message: action.message
      };

    default:
      return state;
  }
}
