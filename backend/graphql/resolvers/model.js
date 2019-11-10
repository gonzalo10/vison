const Sequelize = require('sequelize');

const ModelType = require('../../models/modelType');
const SentimentData = require('../../models/sentimentAnalysis');
const EntitiesData = require('../../models/entitiesAnalysis');

module.exports = {
	Mutation: {
		createModel: async (parent, args, user, info) => {
			const { title, description, modelTypeId } = args.modelInput;
			try {
				if (!user) {
					throw new Error('Unauthenticated!');
				}
				return user.createModel({
					title,
					description,
					modelTypeId,
				});
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
		deleteModel: async (parent, args, user, info) => {
			try {
				if (!user) {
					throw new Error('Unauthenticated!');
				}

				let status;
				const { id } = args;
				const model = await user.getModels({ where: { id } });

				if (model[0]) {
					await model[0].destroy();
					const isModelDeleted = await user.getModels({ where: { id } });
					if (!isModelDeleted[0]) status = 'SUCCESS';
					else status = 'ERROR, we could not delete it';
				} else status = 'ERROR, The item does not exist';

				return { text: status };
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
	},
	Query: {
		models: async (parent, args, user, info) => {
			try {
				if (!user) {
					throw new Error('Unauthenticated!');
				}
				const models = await user.getModels({
					include: [{ model: ModelType }],
				});
				return models;
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
		sentimentModel: async (parent, args, user, info) => {
			try {
				if (!user) {
					throw new Error('Unauthenticated!');
				}
				const { id } = args;
				const model = await user.getModels({ where: { id } });
				const modelType = model[0].modelTypeId;
				let resultData = await SentimentData.findAll({
					where: { modelId: id },
				});
				let statsResults = await SentimentData.findAll({
					where: { modelId: id },
					attributes: [
						'sentiment',
						[
							Sequelize.fn('COUNT', Sequelize.col('sentiment')),
							'sentimentCount',
						],
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
		entityModel: async (parent, args, user, info) => {
			try {
				if (!user) {
					throw new Error('Unauthenticated!');
				}
				const { id } = args;
				const model = await user.getModels({ where: { id } });
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
		// summaryModel: async (args, req) => {
		// 	try {
		// 		if (!req.isAuth) {
		// 			throw new Error('Unauthenticated!');
		// 		}
		// 		const { id } = args;
		// 		const model = await req.user.getModels({ where: { id } });
		// 		const modelType = model[0].modelTypeId;
		// 		let resultData = await EntitiesData.findAll({
		// 			where: { modelId: id },
		// 		});
		// 		console.log(resultData);
		// 		const { title, description } = model[0];
		// 		const modelObject = {
		// 			id,
		// 			title,
		// 			description,
		// 			modelTypeId: modelType,
		// 			data: resultData,
		// 		};
		// 		return modelObject;
		// 	} catch (err) {
		// 		console.log(err);
		// 		throw err;
		// 	}
		// },
	},
};
