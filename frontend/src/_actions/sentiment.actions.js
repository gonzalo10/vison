import { modelConstants } from '../constants';
import { sentimentService } from '../_services';
import { history } from '../helpers';

import { notificationsActions } from './';

export const sentimentActions = {
	execute,
};

function execute({ text }) {
	return dispatch => {
		dispatch(request());

		console.log(text);
		sentimentService.execute(text).then(
			sentiment => {
				console.log(sentiment);
				dispatch(success(sentiment));
			},
			error => {
				console.log('error', error);
				dispatch(failure(error.toString()));
				// dispatch(notificationsActions.error(error.toString()));
			}
		);
	};

	function request() {
		return { type: modelConstants.EXECUTE_SENTIMENT_REQUEST };
	}
	function success(models) {
		return { type: modelConstants.EXECUTE_SENTIMENT_SUCCESS, models };
	}
	function failure(error) {
		return { type: modelConstants.EXECUTE_SENTIMENT_FAILURE, error };
	}
}
