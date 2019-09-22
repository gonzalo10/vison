module.exports = {
	createModel: async (args, req) => {
		const { title, description, price, imageUrl, modelType } = args.modelInput;
		try {
			if (!req.isAuth) {
				throw new Error('Unauthenticated!');
			}
			return req.user.createModel({
				title,
				description,
				modelType,
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	models: async (args, req) => {
		console.log(req);
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
