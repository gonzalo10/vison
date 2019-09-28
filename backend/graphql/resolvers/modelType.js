const ModelType = require('../../models/modelType');
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
	modelType: async (args, req) => {
		try {
			if (!req.isAuth) {
				throw new Error('Unauthenticated!');
			}
			const modelTypes = await ModelType.findAll();
			return modelTypes;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
};
