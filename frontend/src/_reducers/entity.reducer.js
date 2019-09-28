import { modelConstants } from "../constants";

export function entity(state = {}, action) {
  switch (action.type) {
    case modelConstants.EXECUTE_ENTITY_REQUEST:
      return {
        isLoading: true
      };
    case modelConstants.EXECUTE_ENTITY_SUCCESS:
      return {
        isLoading: false,
        entities: action.entities
      };
    case modelConstants.EXECUTE_ENTITY_FAILURE:
      return {
        message: action.message
      };

    default:
      return state;
  }
}
