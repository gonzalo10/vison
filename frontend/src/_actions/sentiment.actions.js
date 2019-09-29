import { modelConstants } from '../constants';
import { sentimentService } from '../_services';
import { history } from '../helpers';

import { notificationsActions } from './';

export const sentimentActions = {
  execute,
};

const getSentimentIcon = sentiment => {
  switch (sentiment) {
    case (sentiment = 'POSITIVE'):
      return '😍';
    case (sentiment = 'NEGATIVE'):
      return '😡';
    case (sentiment = 'NEUTRAL'):
      return '😐';
    case (sentiment = 'MIXED'):
      return '🤪';
    default:
  }
};

const formatString = str => {
  return str
    .replace(/(\B)[^ ]*/g, match => match.toLowerCase())
    .replace(/^[^ ]/g, match => match.toUpperCase());
};

function execute(text, modelId) {
  return dispatch => {
    dispatch(request());
    sentimentService.execute(text, modelId).then(
      ({
        createSentimentAnalysis: {
          mixed,
          positive,
          neutral,
          negative,
          sentiment,
        },
      }) => {
        const value = Math.max(mixed, positive, negative, neutral);
        const icon = getSentimentIcon(sentiment);

        const analysis = {
          sentiment: formatString(sentiment),
          value: (value * 100).toFixed(2),
          icon,
        };
        dispatch(success(analysis));
      },
      error => {
        console.log('error', error);
        dispatch(failure(error.toString()));
        // dispatch(notificationsActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: modelConstants.EXECUTE_SENTIMENT_REQUEST };
  }
  function success(sentiment) {
    return { type: modelConstants.EXECUTE_SENTIMENT_SUCCESS, sentiment };
  }
  function failure(error) {
    return { type: modelConstants.EXECUTE_SENTIMENT_FAILURE, error };
  }
}
