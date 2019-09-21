import { combineReducers } from 'redux';

import { notifications } from './notifications.reducer';

const rootReducer = combineReducers({
	notifications,
});

export default rootReducer;
