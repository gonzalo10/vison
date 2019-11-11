import { API } from './helpers';
import { authHeader } from '../helpers';
import axios from 'axios';

export const entityService = {
  execute,
};

function execute(text, modelId) {
  const encodedText = encodeURI(text);
  const requestBody = {
    query: `
		mutation{
      createEntitiesAnalysis(entityInput: {text: "${encodedText}", modelId:${modelId}}){
        text
        score
        type
        name
        description
        articleBody
        wikiUrl
      }
		}
	    `,
  };
  return API(requestBody);
}
