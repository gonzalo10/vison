import { modelConstants } from '../constants';

export function sentiment(state = {}, action) {
	switch (action.type) {
		case modelConstants.EXECUTE_SENTIMENT_REQUEST:
			return {
				isLoading: true,
			};
		case modelConstants.EXECUTE_SENTIMENT_SUCCESS:
			return {
				isLoading: false,
				sentimentResult: { ...action.sentiment.sentimentAnalysis[0] },
			};
		case modelConstants.EXECUTE_SENTIMENT_FAILURE:
			return {
				message: action.message,
			};

		default:
			return state;
	}
}
