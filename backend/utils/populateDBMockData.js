const UserType = require('../models/userType');
const ModelType = require('../models/modelType');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const populateDBMockData = async () => {
	const userTypeFree = await UserType.findOne({
		where: { name: 'Free' },
	});
	const userTypeStartup = await UserType.findOne({
		where: { name: 'Startup' },
	});
	const userTypeAdmin = await UserType.findOne({
		where: { name: 'Admin' },
	});
	const modelTypeSentiment = await ModelType.findOne({
		where: { title: 'Sentiment' },
	});
	const modelTypeEntity = await ModelType.findOne({
		where: { title: 'Entity' },
	});
	const modelTypeSummary = await ModelType.findOne({
		where: { title: 'Summary' },
	});
	const userSuperAdmin = await User.findOne({
		where: { email: 'SuperAdmin' },
	});
	if (!userTypeFree) {
		await UserType.create({
			name: 'Free',
			price: 0,
			models: 3,
			modelRow: 333,
			requests: 1000,
		});
	}
	if (!userTypeStartup) {
		await UserType.create({
			name: 'Startup',
			price: 49,
			models: 100,
			modelRow: 1000,
			requests: 100000,
		});
	}
	if (!userTypeAdmin) {
		await UserType.create({
			name: 'Admin',
			price: 99,
			models: 1000,
			modelRow: 10000,
			requests: 1000000,
		});
	}
	if (!modelTypeSentiment) {
		await ModelType.create({
			title: 'Sentiment',
			description: 'Sentiment Analysis',
			imageUrl: '😍',
		});
	}
	if (!modelTypeEntity) {
		await ModelType.create({
			title: 'Entity',
			description: 'Enrichment Data',
			imageUrl: '🏦',
		});
	}
	if (!modelTypeSummary) {
		await ModelType.create({
			title: 'Summary',
			description: 'Summary Generator',
			imageUrl: '📝',
		});
	}
	if (!userSuperAdmin) {
		const hashedPassword = await bcrypt.hash('SuperAdmin', 12);
		await User.create({
			email: 'superAdmin',
			password: hashedPassword,
			requestsUsage: 0,
			modelsUsage: 0,
			userTypeId: 3,
		});
	}
};

module.exports = populateDBMockData;
