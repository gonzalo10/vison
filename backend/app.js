const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server-express');

const multer = require('multer');
const sequelize = require('./utils/database');
const isAuth = require('./middleware/is-auth');

const applyDbRelations = require('./models/relations');
const populateDBMockData = require('./utils/populateDBMockData');
const User = require('./models/user');
const resolvers = require('./graphql/resolvers');
const HandleCsv = require('./helpers/handleCsv');
const typeDefs = require('./graphql/schema');

const previewCsv = HandleCsv.previewCSV;

require('dotenv').config();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ res, req }) => {
		// TODO make sure this is not redundant and is already being done by isAuth
		if (req.isAuth) {
			const token =
				(req.headers.authorization &&
					req.headers.authorization.split(' ')[1]) ||
				'';
			let decodedToken;
			try {
				decodedToken = jwt.verify(token, 'somesupersecretkey');
			} catch (err) {
				throw new AuthenticationError('you must be logged in');
			}
			if (!decodedToken) throw new AuthenticationError('you must be logged in');
			if (!req.isAuth) throw new AuthenticationError('you must be logged in');
			let myUser;
			await User.findByPk(decodedToken.userId)
				.then(user => {
					myUser = user;
				})
				.catch(err => console.log('error graphql', err));
			return myUser;
		}
		return {};
	},
});
const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
});
app.use(isAuth);

var csvName;

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public');
	},
	filename: function(req, file, cb) {
		csvName = Date.now() + '-' + file.originalname;
		cb(null, csvName);
	},
});

var upload = multer({ storage: storage }).array('file');

app.post('/upload', async function(req, res) {
	upload(req, res, function(err) {
		if (err instanceof multer.MulterError) return res.status(500).json(err);
		else if (err) return res.status(500).json(err);
		return previewCsv(csvName, res);
	});
});

server.applyMiddleware({ app, path: '/graphql' });

applyDbRelations();

const PORT = 3001;
const HOST = '127.0.0.1';

try {
	// sequelize
	// 	.authenticate()
	// 	.then(() => {
	// 		console.log('Connection has been established successfully.');
	// 	})
	// 	.catch(err => {
	// 		console.error('Unable to connect to the database:', err);
	// 	});
	sequelize
		.sync()
		.then(() => populateDBMockData())
		.catch(err => console.log(err));
	app.listen(PORT, () => console.log('running on port: ' + PORT));
} catch (err) {
	console.log('server err', err);
}
