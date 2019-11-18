const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const credentials = require('../../credentials');
const User = require('../../models/user');

const transporter = nodemailer.createTransport(
	sendgridTransport({
		auth: {
			api_key: credentials.sendGrid,
		},
	})
);

module.exports = {
	Mutation: {
		createUser: async (_, args, req, res) => {
			const { email, password, plan } = args.userInput;
			try {
				const isOldRecord = await User.findOne({ where: { email } });
				if (!isOldRecord) {
					const hashedPassword = await bcrypt.hash(password, 12);
					const user = await User.create({
						email: email,
						password: hashedPassword,
						requestsUsage: 0,
						modelsUsage: 0,
						userTypeId: plan,
					});
					transporter.sendMail({
						to: email,
						from: 'bluewhale@gmail.com',
						subject: 'Account created bluewhale',
						html: '<h1 >You did it!! congrats, ready to start.</h1>',
					});
					return user;
				}
				throw new Error('User already exist!');
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
		updatePassword: async (_, args, user, info) => {
			const { oldPassword, newPassword } = args.updatePasswordInput;
			const isEqual = await bcrypt.compare(oldPassword, user.password);
			if (isEqual) {
				const hashedPassword = await bcrypt.hash(newPassword, 12);
				let updateValues = { password: hashedPassword };
				await user.update(updateValues);
				return 'success';
			}
			throw new Error('Invalid password');
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
