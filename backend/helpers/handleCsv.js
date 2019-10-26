const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const analyzeSentiment = require('../ML/Amazon/sentiment');
const User = require('../models/user');

const analyseDataAndSave = async (data, modelType, modelId, user) => {
	// Select model Type
	// console.log(data, modelId, modelType);
	const text = data[0];
	if (modelType === 1) {
		// const result = await analyzeSentiment(text);
		console.log(text, user);
		// user.createSentiment({
		// 	text,
		// 	modelId,
		// 	sentiment: result.Sentiment,
		// 	positive: result.SentimentScore.Positive,
		// 	negative: result.SentimentScore.Negative,
		// 	neutral: result.SentimentScore.Neutral,
		// 	mixed: result.SentimentScore.Mixed,
		// });
	}
};

const getUser = userId => {
	return User.findByPk(userId)
		.then(user => {
			myUser = user;
		})
		.catch(err => console.log(err));
};

module.exports = async function handleCsv(name, modelType, modelId, userId) {
	let dataSet = {
		headers: [],
		rows: [],
	};

	const user = await getUser(userId);
	console.log('user', user);

	fs.createReadStream(path.join(__dirname, '../public/' + name))
		.pipe(csv({ separator: ';' }))
		.on('data', row => {
			if (!dataSet.headers.length) {
				dataSet.headers = Object.keys(row);
			}
			console.log(row);
			analyseDataAndSave(Object.values(row), +modelType, +modelId, user);
			dataSet.rows.push(Object.values(row));
		})
		.on('error', err => 'hola')
		.on('end', () => {
			// console.log('dataSet', dataSet);
			// console.log('rows', dataSet.rows.length);
			console.log('CSV file successfully processed');
		});
};
