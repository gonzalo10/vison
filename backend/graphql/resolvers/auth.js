const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
	Mutation: {
		createUser: async (_, args, req, res) => {
			const { email, password } = args.userInput;
			try {
				const isOldRecord = await User.findOne({ where: { email } });
				if (!isOldRecord) {
					const hashedPassword = await bcrypt.hash(password, 12);
					console.log('we are going to create a user');
					return User.create({
						email: email,
						password: hashedPassword,
						requestsUsage: 0,
						modelsUsage: 0,
					});
				}
				throw new Error('User already exist!');
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
	},
	Query: {
		login: async (_, { email, password }, req, res) => {
			const user = await User.findOne({ where: { email } });
			if (!user) {
				return {
					userId: '',
					token: '',
					tokenExpiration: 1,
					error: 'Incorrect User or Password!!',
				};
			}
			const isEqual = await bcrypt.compare(password, user.password);
			if (!isEqual) {
				return {
					userId: '',
					token: '',
					tokenExpiration: 1,
					error: 'Incorrect User or Password!!',
				};
			}
			const token = jwt.sign(
				{ userId: user.id, email: user.email },
				'somesupersecretkey',
				{
					expiresIn: '12h',
				}
			);
			return { userId: user.id, token: token, tokenExpiration: 1, error: null };
		},
	},
};
