import { modelConstants } from "../constants";

export function summary(state = {}, action) {
  switch (action.type) {
    case modelConstants.EXECUTE_SUMMARY_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case modelConstants.EXECUTE_SUMMARY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        preSummaryText: action.createdSummary.text,
        summary: action.createdSummary.summary
      };
    case modelConstants.EXECUTE_SUMMARY_FAILURE:
      return {
        ...state,
        message: action.message
      };

    default:
      return state;
  }
}
