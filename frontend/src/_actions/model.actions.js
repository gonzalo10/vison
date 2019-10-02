import { modelConstants } from '../constants';
import { modelService } from '../_services';
import { history } from '../helpers';

import { notificationsActions } from './';

export const modelActions = {
  getAll,
  createModel,
  getModelTypes,
  getModel,
};

const arrayToObject = array =>
  array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});

function getAll() {
  return dispatch => {
    dispatch(request());

    modelService.getAll().then(
      ({ models }) => {
        dispatch(success(arrayToObject(models)));
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

function createModel(newModelData) {
  return dispatch => {
    dispatch(request());

    modelService.createModel(newModelData).then(
      models => {
        // dispatch(success());
        dispatch(getAll());
      },
      error => {
        console.log('error', error);
        dispatch(failure(error.toString()));
        // dispatch(notificationsActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: modelConstants.CREATE_MODEL_REQUEST };
  }
  function success(models) {
    return { type: modelConstants.CREATE_MODEL_SUCCESS, models };
  }
  function failure(error) {
    return { type: modelConstants.CREATE_MODEL_FAILURE, error };
  }
}

function getModel(id, modelType) {
  return dispatch => {
    dispatch(request());
    let getModelType = undefined;

    switch (modelType) {
      case '1':
        getModelType = modelService.getSentimentModel;
        break;
      case '2':
        getModelType = modelService.getEntityModel;
        break;
      default:
        break;
    }
    getModelType(id).then(
      model => {
        console.log('model', model);
        dispatch(success(model));
      },
      error => {
        console.log('error', error);
        dispatch(failure(error.toString()));
        // dispatch(notificationsActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: modelConstants.GET_MODEL_REQUEST };
  }
  function success(model) {
    return { type: modelConstants.GET_MODEL_SUCCESS, model };
  }
  function failure(error) {
    return { type: modelConstants.GET_MODEL_FAILURE, error };
  }
}
