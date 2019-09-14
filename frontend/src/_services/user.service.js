// import { authHeader } from '../_helpers';
// import { TOKEN_URL, MYUSER_URL, GET_ACTORS_URL } from '../endpoint.js';
// import { CLIENT_ID } from '../global_constants.js';
export const userService = {
	login,
	logout,
	// register,
	// getAll,
	// getById,
	// update,
	// delete: _delete,
};

function login(username, password) {
	// const grant_type = 'password';
	// const client_id = CLIENT_ID;
	// const requestOptions = {
	// 	method: 'POST',
	// 	headers: { 'Content-Type': 'application/json' },
	// 	body: JSON.stringify({ username, password, grant_type, client_id }),
	// };
	// return fetch(`${TOKEN_URL}`, requestOptions)
	// 	.then(handleResponse)
	// 	.then(response => {
	// 		// set header for all next peticions
	// 		localStorage.setItem('token', response.data.access_token);
	// 		localStorage.setItem('refresh_token', response.data.refresh_token);
	// 		const requestOptions = {
	// 			method: 'GET',
	// 			headers: authHeader(),
	// 		};
	// 		return fetch(`${MYUSER_URL}`, requestOptions)
	// 			.then(handleResponse)
	// 			.then(user => {
	// 				localStorage.setItem('user', JSON.stringify(user.data));
	// 				return user;
	// 			});
	// 	});
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
