import { combineReducers } from "redux";

import { notifications } from "./notifications.reducer";
import { models } from "./model.reducer";
import { sentiment } from "./sentiment.reducer";
import { entity } from "./entity.reducer";
import { summary } from "./summary.reducer";
import { uploadedFile } from "./uploadFile.reducer";
import { user } from "./user.reducer";
import { modal } from "./modal.reducer";

const rootReducer = combineReducers({
  notifications,
  models,
  sentiment,
  entity,
  summary,
  uploadedFile,
  user,
  modal
});

export default rootReducer;
