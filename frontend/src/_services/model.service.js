import { authHeader } from '../helpers';
import axios from 'axios';

export const modelService = {
  getAll,
  getModelTypes,
  createModel,
};

function getAll() {
  const requestBody = {
    query: `
	     query{
	        models{
            id
            title
            description
            modelTypeId
            modelType {
              title
              description
              imageUrl
            }
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
function getModelTypes() {
  const requestBody = {
    query: `
      {
        modelType{
            id,
            title,
            description,
            imageUrl,
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
function createModel({ selectedModelType, description, title }) {
  const requestBody = {
    query: `
    mutation {
      createModel(modelInput: {title: "${title}", description: "${description}",modelTypeId:${selectedModelType}}) {
        id
        title
        description
        modelTypeId
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
        // logout();
        window.location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data.data;
  });
}
