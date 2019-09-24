import { modelConstants } from '../constants';
import { entityService } from '../_services';
import { history } from '../helpers';

import { notificationsActions } from './';

export const entityActions = {
	execute,
};

function execute(text) {
	return dispatch => {
		dispatch(request());
		entityService.execute(text).then(
			({ createEntitiesAnalysis }) => {
				dispatch(success(createEntitiesAnalysis));
			},
			error => {
				console.log('error', error);
				dispatch(failure(error.toString()));
				// dispatch(notificationsActions.error(error.toString()));
			}
		);
	};

	function request() {
		return { type: modelConstants.EXECUTE_ENTITY_REQUEST };
	}
	function success(entities) {
		return { type: modelConstants.EXECUTE_ENTITY_SUCCESS, entities };
	}
	function failure(error) {
		return { type: modelConstants.EXECUTE_ENTITY_FAILURE, error };
	}
}
