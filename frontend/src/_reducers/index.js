import { combineReducers } from 'redux';

import { notifications } from './notifications.reducer';
import { models } from './model.reducer';
import { sentiment } from './sentiment.reducer';

const rootReducer = combineReducers({
	notifications,
	models,
	sentiment,
});

export default rootReducer;
