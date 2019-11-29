import { authHeader } from '../helpers';
import { userActions } from '../_actions';
import { store } from '../helpers';

export const backendURL = 'http://127.0.0.1:3001';

export const API = requestBody =>
  fetch(backendURL + '/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: authHeader(),
  }).then(response => handleResponse(response));

function handleResponse(response) {
  return response.text().then(text => {
    if (!response.ok) {
      if (response.status === 401) {
        store.dispatch(userActions.logout());
        window.location.reload(true);
      }
      const error = response.statusText;
      return Promise.reject(error);
    }
    const data = text && JSON.parse(text);
    console.log(data);
    return data.data;
  });
}
