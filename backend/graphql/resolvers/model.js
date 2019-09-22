const Model = require('../../models/models');

module.exports = {
	createModel: async (args, req) => {
		const { title, description, price, imageUrl } = args.modelInput;
		try {
			if (!req.isAuth) {
				throw new Error('Unauthenticated!');
			}
			return req.user.createModel({
				title,
				description,
				price,
				imageUrl,
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	models: async (args, req) => {
		console.log(req);
		try {
			// return await Model.findAll();
			const models = await req.user.getModels();
			return models;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
};
