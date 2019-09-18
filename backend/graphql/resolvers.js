const Model = require('../models/models');

module.exports = {
	createModel: async (args, req) => {
		const { title, description, price, imageUrl } = args.modelInput;
		try {
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
	models: async () => {
		try {
			const allModels = await Model.findAll();
			return allModels;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
};
