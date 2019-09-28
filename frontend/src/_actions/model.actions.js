import { modelConstants } from "../constants";
import { modelService } from "../_services";
import { history } from "../helpers";

import { notificationsActions } from "./";

export const modelActions = {
  getAll
};

function getAll() {
  return dispatch => {
    dispatch(request());

    modelService.getAll().then(
      models => {
        console.log(models);
        dispatch(success(models));
      },
      error => {
        console.log("error", error);
        dispatch(failure(error.toString()));
        // dispatch(notificationsActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: modelConstants.GETALL_REQUEST };
  }
  function success(models) {
    return { type: modelConstants.GETALL_SUCCESS, models };
  }
  function failure(error) {
    return { type: modelConstants.GETALL_FAILURE, error };
  }
}
