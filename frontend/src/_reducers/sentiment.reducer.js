import { modelConstants } from "../constants";

export function sentiment(state = {}, action) {
  switch (action.type) {
    case modelConstants.EXECUTE_SENTIMENT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case modelConstants.EXECUTE_SENTIMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sentimentTitle: action.sentiment.sentiment,
        sentimentValue: action.sentiment.value,
        icon: action.sentiment.icon
      };
    case modelConstants.EXECUTE_SENTIMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.message
      };

    default:
      return state;
  }
}
