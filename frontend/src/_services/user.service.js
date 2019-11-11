import axios from 'axios';
import { client } from '../index';
import { gql } from 'apollo-boost';
import { API } from './helpers';

import { authHeader } from '../helpers';

const login = async (username, password) => {
  try {
    const {
      data: { login: result },
    } = await client.query({
      query: gql`
        {
          login(email: "hola", password: "hola") {
            userId
            token
            tokenExpiration
            error
          }
        }
      `,
    });

    if (result.error) {
      throw new Error(result.error);
    }
    return result;
  } catch (err) {
    console.log(err);
  }
};

function register(username, password) {
  const requestBody = {
    query: `
		mutation {
			createUser(userInput: {email: "${username}", password: "${password}"}) {
			  id
			  email
			  password
			}
		  }
        `,
  };
  return API(requestBody);
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        console.log('error 401');
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
export const userService = {
  login,
  logout,
  register,
  // getAll,
  // getById,
  // update,
  // delete: _delete,
};
