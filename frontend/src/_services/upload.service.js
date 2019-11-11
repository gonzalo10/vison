import { authHeader } from '../helpers';
import { backendURL } from './helpers';

export const uploadService = {
  uploadFile,
};

const axios = require('axios');

async function uploadFile(formData) {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: authHeader().Authorization,
    },
  };
  try {
    const response = await axios.post(
      `${backendURL}/upload`,
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
// async function uploadFile(formData, modelType, modelId) {
//   const config = {
//     headers: {
//       'content-type': 'multipart/form-data',
//       Authorization: authHeader().Authorization,
//     },
//   };
//   console.log('query parameters', modelId, modelType);
//   try {
//     const response = await axios.post(
//       `http://localhost:3000/upload?modelType=${modelType}&modelId=${modelId}`,
//       formData,
//       config,
//       {
//         onUploadProgress: ProgressEvent => {
//           console.log(
//             'Progess',
//             (ProgressEvent.loaded / ProgressEvent.total) * 100
//           );
//         },
//       }
//     );
//     return response;
//   } catch (err) {
//     console.log(err);
//   }
// }
