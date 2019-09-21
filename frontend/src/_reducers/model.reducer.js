import { modelConstants } from '../constants';

export function notifications(state = {}, action) {
	switch (action.type) {
		case modelConstants.GETALL_REQUESTED:
			return {};
		case modelConstants.GETALL_SUCCESS:
			return {};
		case modelConstants.GETALL_FAILURE:
			return {
				message: action.message,
			};

		default:
			return state;
	}
}
