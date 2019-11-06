const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const analyzeSentiment = require('../ML/Amazon/sentiment');
const User = require('../models/user');

const sentimentAnalysis = async (text, modelId, user) => {
	const result = await analyzeSentiment(text);
	const { SentimentScore, Sentiment } = result;
	user.createSentiment({
		text,
		modelId,
		sentiment: Sentiment,
		positive: SentimentScore.Positive,
		negative: SentimentScore.Negative,
		neutral: SentimentScore.Neutral,
		mixed: SentimentScore.Mixed,
	});
};

const analyseDataAndSave = async (data, modelType, modelId, user) => {
	const text = data[0];
	if (modelType === 1) sentimentAnalysis(text, modelId, user);
};

const getUser = userId => {
	return User.findByPk(userId)
		.then(user => user)
		.catch(err => console.log(err));
};

module.exports = async function handleCsv(
	name,
	modelType,
	modelId,
	userId,
	res
) {
	let dataSet = {
		headers: [],
		rows: [],
	};

	const user = await getUser(userId);

	return fs
		.createReadStream(path.join(__dirname, '../public/' + name))
		.pipe(csv({ separator: ';' }))
		.on('data', row => {
			if (!dataSet.headers.length) {
				dataSet.headers = Object.keys(row);
			}
			// analyseDataAndSave(Object.values(row), +modelType, +modelId, user);
			dataSet.rows.push(Object.values(row));
		})
		.on('error', err => res.status(200).send(err))
		.on('end', () => res.status(200).send({ dataSet, name }));
};
