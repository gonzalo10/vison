import { combineReducers } from 'redux';

import { notifications } from './notifications.reducer';
import { models } from './model.reducer';
import { sentiment } from './sentiment.reducer';
import { entity } from './entity.reducer';

const rootReducer = combineReducers({
	notifications,
	models,
	sentiment,
	entity,
});

export default rootReducer;
