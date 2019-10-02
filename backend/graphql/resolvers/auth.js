const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
	createUser: async (args, req) => {
		const { email, password } = args.userInput;
		try {
			const isOldRecord = await User.findOne({ where: { email } });
			if (!isOldRecord) {
				const hashedPassword = await bcrypt.hash(password, 12);
				return User.create({ email: email, password: hashedPassword });
			}
			throw new Error('User already exist!');
		} catch (err) {
			throw err;
		}
	},
	login: async ({ email, password }, req, res) => {
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
		// req.session.isLoggedIn = true;
		// req.session.user = user;
		// req.session.save(err => {
		// 	console.log(err);
		// });
		const token = jwt.sign(
			{ userId: user.id, email: user.email },
			'somesupersecretkey',
			{
				expiresIn: '12h',
			}
		);
		return { userId: user.id, token: token, tokenExpiration: 1, error: null };
	},
};
