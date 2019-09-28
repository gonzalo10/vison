import { modelConstants } from '../constants';
import { modelService } from '../_services';
import { history } from '../helpers';

import { notificationsActions } from './';

export const modelActions = {
  getAll,
  createModel,
  getModelTypes,
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
        console.log('error', error);
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
function getModelTypes() {
  return dispatch => {
    dispatch(request());

    modelService.getModelTypes().then(
      modelTypes => {
        console.log(modelTypes);
        dispatch(success(modelTypes));
      },
      error => {
        console.log('error', error);
        dispatch(failure(error.toString()));
        // dispatch(notificationsActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: modelConstants.GET_MODEL_TYPES_REQUEST };
  }
  function success(modelTypes) {
    return { type: modelConstants.GET_MODEL_TYPES_SUCCESS, modelTypes };
  }
  function failure(error) {
    return { type: modelConstants.GET_MODEL_TYPES_FAILURE, error };
  }
}
function createModel() {
  return dispatch => {
    dispatch(request());

    modelService.getAll().then(
      models => {
        console.log(models);
        dispatch(success(models));
      },
      error => {
        console.log('error', error);
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
