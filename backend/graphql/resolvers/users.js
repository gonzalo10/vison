const User = require('../../models/user');

module.exports = {
	Query: {
		users: async (args, req) => {
			try {
				const users = await User.findAll();
				return users;
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
	},
};
