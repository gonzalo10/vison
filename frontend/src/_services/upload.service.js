import { authHeader } from '../helpers';
import { client } from '../index';
import { gql } from 'apollo-boost';

export const uploadService = {
  uploadFile,
};

const axios = require('axios');

async function uploadFile(formData, modelId) {
  console.log('uploadFile', formData);

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  try {
    const response = await axios.post(
      'http://localhost:3000/upload',
      formData,
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
