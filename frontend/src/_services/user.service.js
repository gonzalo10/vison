import axios from 'axios';

import { authHeader } from '../helpers';

const login = async (username, password) => {
	try {
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
		const response = await axios({
			url: 'http://localhost:3000/graphql',
			method: 'POST',
			data: requestBody,
		});
		// const response = await fetch('http://localhost:3000/graphql', {
		// 	method: 'POST',
		// 	body: JSON.stringify(requestBody),
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	credentials: 'same-origin',
		// });
		const {
			data: { login: result },
		} = await response.data;
		if (result.error) {
			return Promise.reject(result.error);
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
	return fetch('http://localhost:3000/graphql', {
		method: 'POST',
		body: JSON.stringify(requestBody),
		headers: authHeader(),
	}).then(response => handleResponse(response));
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
