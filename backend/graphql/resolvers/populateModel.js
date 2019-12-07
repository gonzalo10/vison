const handleCsv = require('../../helpers/handleCsv');

const analyzeCSV = handleCsv.analyzeCsv;

module.exports = {
	Mutation: {
		populateModel: async (parent, args, user, info) => {
			const { fileName, modelId, modelType } = args.populateModelInput;
			try {
				if (!user.dataValues) {
					throw new Error('Unauthenticated!');
				}
				const response = await analyzeCSV(fileName, modelType, modelId, user);
				return response;
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
	},
};
