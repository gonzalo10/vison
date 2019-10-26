const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server-express');
const graphqlHttp = require('express-graphql');
const session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
const multer = require('multer');
const sequelize = require('./utils/database');
const isAuth = require('./middleware/is-auth');

const Model = require('./models/model');
const ModelType = require('./models/modelType');
const User = require('./models/user');
const Sentiment = require('./models/sentimentAnalysis');
const Entity = require('./models/entitiesAnalysis');
const resolvers = require('./graphql/resolvers');
const handleCsv = require('./helpers/handleCsv');
const typeDefs = require('./graphql/schema');

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
				.catch(err => console.log(err));
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

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		console.log('destinations', file);
		cb(null, 'public');
	},
	filename: function(req, file, cb) {
		console.log('file0', file);
		cb(null, Date.now() + '-' + file.originalname);
	},
});

var upload = multer({ storage: storage }).array('file');

app.post('/upload', function(req, res) {
	upload(req, res, function(err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err);
		} else if (err) {
			return res.status(500).json(err);
		}
		handleCsv();
		return res.status(200).send(req.file);
	});
});

server.applyMiddleware({ app, path: '/graphql' });

Model.belongsTo(ModelType, { constraints: true, onDelete: 'CASCADE' });
Model.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Sentiment.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Sentiment.belongsTo(Model, { constraints: true, onDelete: 'CASCADE' });
Entity.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Entity.belongsTo(Model, { constraints: true, onDelete: 'CASCADE' });
ModelType.hasMany(Model);
User.hasMany(Model);
User.hasMany(Sentiment);
User.hasMany(Entity);

sequelize
	.sync()
	.then(() => app.listen(3000))
	.catch(err => console.log(err));
