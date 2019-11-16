import { client } from '../index';
import { gql } from 'apollo-boost';
import { API, backendURL } from './helpers';
import { store } from '../helpers';
import { object } from 'prop-types';

const login = async (username, password) => {
  try {
    //   const {
    //     data: { login: result },
    //   } = await client.query(
    //     {
    //       query: gql`
    //         query login(username: $String, password: $String) {
    //           login(email: $username, password: $password) {
    //             userId
    //             token
    //             tokenExpiration
    //             error
    //           }
    //         }
    //       `,
    //     },
    //     { variables: { username, password } }
    //   );

    //   const { data: { login: result } } = await client.query({
    //     query: UserQuery
    //  });

    //   if (result.error) {
    //     throw new Error(result.error);
    //   }
    //   return result;
    const requestBody = {
      query: `
      {
        login(email: "${username}", password: "${password}") {
          userId
          token
          tokenExpiration
          error
        }
      }
      `,
    };
    const response = await fetch(backendURL + '/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' },
    });
    const text = await response.text();
    const data = text && JSON.parse(text);
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

function register(username, password) {
  const requestBody = {
    query: `
	  mutation{
      createUser(userInput:{email: "${username}", password: "${password}"}) {
       id
      }
    }
    `,
  };
  return fetch(backendURL + '/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: { 'Content-Type': 'application/json' },
  }).then(response => handleResponse(response));
}
function getUserAccount() {
  const requestBody = {
    query: `
		query {
			getAccount {
        user {
          email
          modelsUsage
          requestsUsage
          createdAt
          userTypeId
        }
        userType {
          name
          price
          models
          modelRow
          requests
        }
			}
		  }
    `,
  };
  return API(requestBody);
}
function getAllUsers() {
  const requestBody = {
    query: `
		{
			getAllUsers {
        
          email
          modelsUsage
          requestsUsage
          createdAt
          userTypeId
          createdAt
        
			}
		}
    `,
  };
  return API(requestBody);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        store.dispatch(logout());
        window.location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    console.log({ ...data });
    return data;
  });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
}

export const userService = {
  login,
  logout,
  register,
  getUserAccount,
  getAllUsers,
  // getAll,
  // getById,
  // update,
  // delete: _delete,
};
