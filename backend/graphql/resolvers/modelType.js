const ModelType = require('../../models/modelType');
module.exports = {
	Mutation: {
		createModelType: async (parent, args, user, info) => {
			const { title, description, imageUrl } = args.modelTypeInput;
			try {
				if (!user.dataValues) {
					throw new Error('Unauthenticated!');
				}
				return ModelType.create({
					title,
					description,
					imageUrl,
				});
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
	},
	Query: {
		modelType: async (parent, args, user, info) => {
			try {
				if (!user.dataValues) {
					throw new Error('Unauthenticated!');
				}
				const modelTypes = await ModelType.findAll();
				return modelTypes;
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
	},
};
