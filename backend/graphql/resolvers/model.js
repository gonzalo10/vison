const Sequelize = require('sequelize');

const ModelType = require('../../models/modelType');
const SentimentData = require('../../models/sentimentAnalysis');
const EntitiesData = require('../../models/entitiesAnalysis');

module.exports = {
	createModel: async (args, req) => {
		const { title, description, modelTypeId } = args.modelInput;
		try {
			if (!req.isAuth) {
				throw new Error('Unauthenticated!');
			}
			return req.user.createModel({
				title,
				description,
				modelTypeId: modelTypeId,
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	models: async (args, req) => {
		try {
			if (!req.isAuth) {
				throw new Error('Unauthenticated!');
			}
			const models = await req.user.getModels({
				include: [{ model: ModelType }],
			});
			return models;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	sentimentModel: async (args, req) => {
		try {
			if (!req.isAuth) {
				throw new Error('Unauthenticated!');
			}
			const { id } = args;
			const model = await req.user.getModels({ where: { id } });
			const modelType = model[0].modelTypeId;
			let resultData = await SentimentData.findAll({
				where: { modelId: id },
			});
			let statsResults = await SentimentData.findAll({
				where: { modelId: id },
				attributes: [
					'sentiment',
					[Sequelize.fn('COUNT', Sequelize.col('sentiment')), 'sentimentCount'],
				],
				group: ['sentiment'],
			});
			const stats = {};
			for (let i = 0; i < statsResults.length; i++) {
				const {
					sentiment,
					dataValues: { sentimentCount },
				} = statsResults[i];
				stats[sentiment] = sentimentCount;
			}

			console.log(stats);

			const { title, description } = model[0];
			const modelObject = {
				id,
				title,
				description,
				modelTypeId: modelType,
				data: resultData,
				stats,
			};
			return modelObject;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	entityModel: async (args, req) => {
		try {
			if (!req.isAuth) {
				throw new Error('Unauthenticated!');
			}
			const { id } = args;
			const model = await req.user.getModels({ where: { id } });
			const modelType = model[0].modelTypeId;
			let resultData = await EntitiesData.findAll({
				where: { modelId: id },
			});
			const { title, description } = model[0];
			const modelObject = {
				id,
				title,
				description,
				modelTypeId: modelType,
				data: resultData,
			};
			return modelObject;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	summaryModel: async (args, req) => {
		try {
			if (!req.isAuth) {
				throw new Error('Unauthenticated!');
			}
			const { id } = args;
			const model = await req.user.getModels({ where: { id } });
			const modelType = model[0].modelTypeId;
			let resultData = await EntitiesData.findAll({
				where: { modelId: id },
			});
			console.log(resultData);
			const { title, description } = model[0];
			const modelObject = {
				id,
				title,
				description,
				modelTypeId: modelType,
				data: resultData,
			};
			return modelObject;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
};
