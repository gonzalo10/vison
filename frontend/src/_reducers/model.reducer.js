import { modelConstants } from '../constants';

export function models(state = {}, action) {
	switch (action.type) {
		case modelConstants.GETALL_REQUESTED:
			return {};
		case modelConstants.GETALL_SUCCESS:
			return {
				modelList: action.models,
			};
		case modelConstants.GETALL_FAILURE:
			return {
				message: action.message,
			};

		default:
			return state;
	}
}
