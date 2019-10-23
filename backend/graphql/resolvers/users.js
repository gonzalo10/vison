const User = require('../../models/user');

module.exports = {
	Query: {
		users: async (parent, args, user, info) => {
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
