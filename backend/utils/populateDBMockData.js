const UserType = require('../models/userType');
const ModelType = require('../models/modelType');
const populateDBMockData = async () => {
	await UserType.create({
		name: 'Free',
		price: 0,
		models: 3,
		modelRow: 333,
		requests: 1000,
	});
	await UserType.create({
		name: 'Startup',
		price: 49,
		models: 100,
		modelRow: 1000,
		requests: 100000,
	});
	await UserType.create({
		name: 'Admin',
		price: 99,
		models: 1000,
		modelRow: 10000,
		requests: 1000000,
	});
	await ModelType.create({
		title: 'Sentiment',
		description: 'Sentiment Analysis',
		imageUrl: '😍',
	});
};

module.exports = populateDBMockData;
