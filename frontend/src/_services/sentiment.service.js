import { API } from './helpers';

export const sentimentService = {
  execute,
  analyzeYoutubeVideo,
};

function execute(text, modelId) {
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
  return API(requestBody);
}
function analyzeYoutubeVideo(url, modelId) {
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
  return API(requestBody);
}
