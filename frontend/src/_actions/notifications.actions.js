import { notificationsConstants } from '../constants';

export const notificationsActions = {
	success,
	error,
	info,
	warning,
	clear,
};

function success(message) {
	return { type: notificationsConstants.SUCCESS, message };
}

function error(message) {
	return { type: notificationsConstants.ERROR, message };
}
function warning(message) {
	return { type: notificationsConstants.WARNING, message };
}

function info(message) {
	return { type: notificationsConstants.INFO, message };
}

function clear() {
	return { type: notificationsConstants.CLEAR };
}
