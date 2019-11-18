const User = require('../../models/user');
const UserType = require('../../models/userType');

const getUserTypeFeatures = typeId => {
	return UserType.findByPk(typeId)
		.then(userType => userType)
		.catch(err => console.log(err));
};

module.exports = {
	Query: {
		getAllUsers: async (parent, args, user, info) => {
			try {
				console.log(user.dataValues);
				if (user.dataValues.userTypeId !== 3)
					throw new Error('Yo do not have perission');
				const users = await User.findAll();
				return users;
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
		getUser: async (parent, args, user, info) => {
			try {
				return User.findByPk(user.dataValues.id)
					.then(user => user)
					.catch(err => console.log(err));
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
		getAccount: async (parent, args, user, info) => {
			try {
				const account = await getUserTypeFeatures(user.dataValues.userTypeId);
				return { user, userType: account };
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
	},
};
