import { notificationsConstants } from '../constants';

export function notifications(state = {}, action) {
	switch (action.type) {
		case notificationsConstants.SUCCESS:
			return {
				type: 'success',
				message: action.message,
				isOpen: true,
			};
		case notificationsConstants.ERROR:
			return {
				type: 'error',
				message: action.message,
				isOpen: true,
			};
		case notificationsConstants.WARNING:
			return {
				type: 'warning',
				message: action.message,
				isOpen: true,
			};
		case notificationsConstants.INFO:
			return {
				type: 'info',
				message: action.message,
				isOpen: true,
			};
		case notificationsConstants.CLEAR:
			return {};
		default:
			return state;
	}
}
