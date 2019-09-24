import { authHeader } from '../helpers';
import axios from 'axios';

export const entityService = {
	execute,
};

function execute(text) {
	console.log('execute', text);
	const requestBody = {
		query: `
		mutation{
            createEntitiesAnalysis(entityInput: {text: "${text}"}){
                text
                score
                type
                name
                description
                articleBody
                wikiUrl
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
