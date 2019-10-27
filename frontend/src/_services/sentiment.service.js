import { authHeader } from '../helpers';
import { userService } from './user.service';
import axios from 'axios';

export const sentimentService = {
  execute,
  analyzeYoutubeVideo,
};

function execute(text, modelId) {
  console.log('execute', text);
  const requestBody = {
    query: `
		mutation{
			createSentimentAnalysis(sentimentInput: {text: "${text}", modelId:${modelId}}){
				text
				sentiment
				positive
				negative
				neutral
				mixed
			}
		}
	    `,
  };
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: authHeader(),
  };

  return fetch('http://localhost:3000/graphql', requestOptions).then(response =>
    handleResponse(response)
  );
}
function analyzeYoutubeVideo(url, modelId) {
  console.log('analyzeYoutubeVideo', url);
  const requestBody = {
    query: `
		mutation{
			analyzeYoutubeVideo(url: "${url}", modelId:${+modelId}){
				text
				sentiment
				positive
				negative
				neutral
				mixed
			}
		}
	    `,
  };
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: authHeader(),
  };

  return fetch('http://localhost:3000/graphql', requestOptions).then(response =>
    handleResponse(response)
  );
}

function handleResponse(response) {
  return response.text().then(text => {
    console.log(response);
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        userService.logout();
        window.location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data.data;
  });
}
