import { combineReducers } from 'redux';

import { notifications } from './notifications.reducer';
import { models } from './model.reducer';
import { sentiment } from './sentiment.reducer';
import { entity } from './entity.reducer';
import { summary } from './summary.reducer';

const rootReducer = combineReducers({
  notifications,
  models,
  sentiment,
  entity,
  summary,
});

export default rootReducer;
