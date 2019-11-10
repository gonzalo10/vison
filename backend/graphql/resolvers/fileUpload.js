const Sequelize = require('sequelize');

module.exports = {
	Mutation: {
		uploadFile: async (parent, args, user, info) => {
			try {
				if (!user) {
					throw new Error('Unauthenticated!');
				}
				return args.file;
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
	},
};
