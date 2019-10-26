import { authHeader } from '../helpers';
import { client } from '../index';
import { gql } from 'apollo-boost';

export const uploadService = {
  uploadFile,
};

const axios = require('axios');

async function uploadFile(formData, modelType, modelId) {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: authHeader().Authorization,
    },
  };
  console.log('query parameters', modelId, modelType);
  try {
    const response = await axios.post(
      `http://localhost:3000/upload?modelType=${modelType}&modelId=${modelId}`,
      formData,
      config,
      {
        onUploadProgress: ProgressEvent => {
          console.log(
            'Progess',
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
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
