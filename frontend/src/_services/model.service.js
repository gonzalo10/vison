import { authHeader } from '../helpers';
import axios from 'axios';
import { userActions } from '../_actions';
import { store } from '../helpers';
import { client } from '../index';
import { gql } from 'apollo-boost';

export const modelService = {
  getAll,
  getModelTypes,
  createModel,
  getSentimentModel,
  getEntityModel,
  getSummaryModel,
  deleteModel,
  getYoutubeCommentsModel,
};

async function getAll() {
  const { data } = await client.query({
    query: gql`
      {
        models {
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
  });

  return data;
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

function getSentimentModel(id) {
  const requestBody = {
    query: `
    {
      sentimentModel(id: ${id}) {
        id
        title
        description
        modelTypeId
        data {
          text
          sentiment
          positive
          negative
          neutral
          mixed
          modelId
        }
        stats {
          NEGATIVE
          NEUTRAL
          MIXED
          POSITIVE
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
function getEntityModel(id) {
  const requestBody = {
    query: `
    {
      entityModel(id: ${id}){
        id
        title
        description
        data {
          text
          score
          type
          name
          description
          articleBody
          wikiUrl
          modelId
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
function getSummaryModel(id) {
  const requestBody = {
    query: `
    {
      summaryModel(id: ${id}){
        id
        title
        description
        data {
          text
          score
          type
          name
          description
          articleBody
          wikiUrl
          modelId
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
function getYoutubeCommentsModel(id) {
  const requestBody = {
    query: `
    {
      youtubeModel(id: ${id}){
          id
          title
          description
          data 
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
function deleteModel(id) {
  const requestBody = {
    query: `
      mutation {
        deleteModel(id: ${id}){
          text
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
    if (!response.ok) {
      if (response.status === 401) {
        store.dispatch(userActions.logout());
        window.location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    const data = text && JSON.parse(text);
    return data.data;
  });
}
