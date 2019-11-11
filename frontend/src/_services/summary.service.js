import { API } from './helpers';

export const summaryService = {
  execute,
};

function execute(text, summarySize, modelId) {
  const requestBody = {
    query: `
		mutation{
			createSummary(summaryInput: {text: "${encodeURI(
        text
      )}", summarySize: ${summarySize}, modelId:${modelId}}){
				text
				summary
			}
		}
	    `,
  };
  return API(requestBody);
}
