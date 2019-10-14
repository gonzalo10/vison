import { modelConstants } from '../constants';
import { summaryService } from '../_services';

export const summaryActions = {
  execute,
};

function execute(text, summarySize, modelId) {
  return dispatch => {
    dispatch(request());
    summaryService.execute(text, summarySize, modelId).then(
      ({ createSummary }) => {
        const { text, summary } = createSummary;

        dispatch(
          success({ text: decodeURI(text), summary: decodeURI(summary) })
        );
      },
      error => {
        console.log('error', error);
        dispatch(failure(error.toString()));
        // dispatch(notificationsActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: modelConstants.EXECUTE_SUMMARY_REQUEST };
  }
  function success(createdSummary) {
    return { type: modelConstants.EXECUTE_SUMMARY_SUCCESS, createdSummary };
  }
  function failure(error) {
    return { type: modelConstants.EXECUTE_SUMMARY_FAILURE, error };
  }
}
