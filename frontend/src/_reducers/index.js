import { combineReducers } from 'redux';

import { notifications } from './notifications.reducer';
import { models } from './model.reducer';

const rootReducer = combineReducers({
	notifications,
	models,
});

export default rootReducer;
