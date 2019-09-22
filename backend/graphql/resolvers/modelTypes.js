const ModelType = require('../../models/modelTypes');
module.exports = {
	createModelType: async (args, req) => {
		const { title, description, imageUrl } = args.modelTypeInput;
		try {
			if (!req.isAuth) {
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
	modelsTypes: async (args, req) => {
		try {
			if (!req.isAuth) {
				throw new Error('Unauthenticated!');
			}
			const models = await req.user.getModelsTypes();
			return models;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
};
