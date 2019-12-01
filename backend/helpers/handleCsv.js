const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const analyzeSentiment = require('../ML/Amazon/sentiment');
const User = require('../models/user');
const UserType = require('../models/userType');

const sentimentAnalysis = async (text, modelId, user) => {
	const result = await analyzeSentiment(text);
	const { SentimentScore, Sentiment } = result;
	user.increment('requestsUsage', { by: 1 });
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

const getUserTypeFeatures = typeId => {
	return UserType.findByPk(typeId)
		.then(userType => userType)
		.catch(err => console.log(err));
};

const previewData = (dataset, name) => {
	const dataSize = dataset.rows.length;
	const previewRows = dataset.rows.slice(0, 10);
	return {
		dataSize,
		dataSet: { headers: dataset.headers, rows: previewRows },
		name,
	};
};

exports.previewCSV = async function previewCSV(name, res) {
	let dataSet = {
		headers: [],
		rows: [],
	};

	return fs
		.createReadStream(path.join(__dirname, '../public/' + name))
		.pipe(csv({ separator: ';' }))
		.on('data', row => {
			if (!dataSet.headers.length) {
				dataSet.headers = Object.keys(row);
			}
			dataSet.rows.push(Object.values(row));
		})
		.on('error', err => res.status(200).send(err))
		.on('end', () => res.status(200).send(previewData(dataSet, name)));
};

exports.analyzeCsv = async function analyzeCsv(name, modelType, modelId, user) {
	let dataSet = {
		headers: [],
		rows: [],
	};
	const { id, userTypeId, modelsUsage, requestsUsage } = user.dataValues;

	const { models, modelRow, requests } = await getUserTypeFeatures(userTypeId);
	if (modelsUsage > models)
		throw new Error(
			'You have reach the maximun number of models, you have used: ' +
				modelsUsage
		);
	if (requestsUsage > requests)
		throw new Error('You have reach the maximun number of requests');

	return fs
		.createReadStream(path.join(__dirname, '../public/' + name))
		.pipe(csv({ separator: ';' }))
		.on('data', row => {
			if (!dataSet.headers.length) {
				dataSet.headers = Object.keys(row);
			}
			analyseDataAndSave(Object.values(row), +modelType, modelId, user);
			dataSet.rows.push(Object.values(row));
		})
		.on('error', err => {
			throw new Error(err);
		})
		.on('end', () => {
			user.increment('modelsUsage', { by: 1 });
			return 'The csv was analyze correctly';
		});
};
