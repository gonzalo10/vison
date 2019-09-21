import { userConstants } from '../constants';

export function notifications(state = {}, action) {
	switch (action.type) {
		case userConstants.LOGIN_REQUEST:
			return {};
		case userConstants.LOGIN_SUCCESS:
			return {
				userId: action.userId,
				token: action.token,
				tokenExpiration: action.tokenExpiration,
			};
		case userConstants.LOGIN_FAILURE:
			return {
				message: action.message,
			};

		default:
			return state;
	}
}
