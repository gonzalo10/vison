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
			const models = await req.user.getModels();
			return models;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
};
