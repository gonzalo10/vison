import { combineReducers } from 'redux';

import { notifications } from './notifications.reducer';
import { models } from './model.reducer';
import { sentiment } from './sentiment.reducer';
import { entity } from './entity.reducer';
import { summary } from './summary.reducer';
import { uploadedFile } from './uploadFile.reducer';

const rootReducer = combineReducers({
  notifications,
  models,
  sentiment,
  entity,
  summary,
  uploadedFile,
});

export default rootReducer;
