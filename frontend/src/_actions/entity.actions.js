import { modelConstants } from '../constants';
import { entityService } from '../_services';
import { history } from '../helpers';
import { modelActions } from './model.actions';
import { notificationsActions } from './';

export const entityActions = {
  execute,
};

function execute(text, modelId) {
  return dispatch => {
    dispatch(request());
    entityService.execute(text, modelId).then(
      ({ createEntitiesAnalysis }) => {
        dispatch(success(createEntitiesAnalysis));
        dispatch(modelActions.getModel(modelId, '2'));
      },
      error => {
        console.log('error', error);
        dispatch(failure(error.toString()));
        // dispatch(notificationsActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: modelConstants.EXECUTE_ENTITY_REQUEST };
  }
  function success(entities) {
    return { type: modelConstants.EXECUTE_ENTITY_SUCCESS, entities };
  }
  function failure(error) {
    return { type: modelConstants.EXECUTE_ENTITY_FAILURE, error };
  }
}
