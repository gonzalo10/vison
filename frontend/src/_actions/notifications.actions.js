import { notificationsConstants } from '../constants';
import { store } from '../helpers/store';

export const notificationsActions = {
  success,
  error,
  info,
  warning,
  clear,
};

const waitAndClear = () => {
  setTimeout(() => store.dispatch(clear()), 10000);
};

function success(message) {
  waitAndClear();
  return { type: notificationsConstants.SUCCESS, message };
}

function error(message) {
  waitAndClear();
  return { type: notificationsConstants.ERROR, message };
}
function warning(message) {
  waitAndClear();
  return { type: notificationsConstants.WARNING, message };
}

function info(message) {
  waitAndClear();
  return { type: notificationsConstants.INFO, message };
}

function clear() {
  return { type: notificationsConstants.CLEAR };
}
