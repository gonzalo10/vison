import { API } from './helpers';
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
  createModelFromFile,
};

async function getAll() {
  const requestBody = {
    query: `
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
  };

  return API(requestBody);

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
  return API(requestBody);
}
function createModel({ selectedModelType, description, title }) {
  const requestBody = {
    query: `
    mutation {
      createModel(modelInput: {title:"${title}", description:"${description}", modelTypeId:${selectedModelType}}) {
        id
        title
        description
        modelTypeId
      }
    }
	    `,
  };

  return API(requestBody);
}
function populateModelFromFile({ fileName, modelId, modelType }) {
  const requestBody = {
    query: `
    mutation {
      populateModel(populateModelInput: {fileName: "${fileName}", modelId:${modelId}, modelType:${modelType}}) 
    }
	    `,
  };
  return API(requestBody);
}
async function createModelFromFile({
  fileName,
  modelType,
  title,
  description,
}) {
  const response = await createModel({
    selectedModelType: modelType,
    title,
    description,
  });
  const { id } = response.createModel;

  await populateModelFromFile({
    fileName,
    modelId: id,
    modelType,
  });

  return { modelId: id, modelType };
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
  return API(requestBody);
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

  return API(requestBody);
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
  return API(requestBody);
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
  return API(requestBody);
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
  return API(requestBody);
}
