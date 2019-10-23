const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server-express');
const graphqlHttp = require('express-graphql');
const session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./utils/database');
const isAuth = require('./middleware/is-auth');

const Model = require('./models/model');
const ModelType = require('./models/modelType');
const User = require('./models/user');
const Sentiment = require('./models/sentimentAnalysis');
const Entity = require('./models/entitiesAnalysis');
const resolvers = require('./graphql/resolvers');

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

// var store = new SequelizeStore({
// 	db: sequelize,
// });
// To serve react app from the backend
// app.use(express.static(path.join(__dirname, '../frontend/build')));

// app.get('/', function(req, res) {
// 	res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });

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

// this is for the cookies

// app.use(
// 	session({
// 		secret: 'my secret',
// 		resave: false,
// 		saveUninitialized: false,
// 		store: store,
// 		cookie: {
// 			maxAge: 1000 * 60 * 60 * 2,
// 			sameSite: false,
// 			httpOnly: false,
// 			domain: '127.0.0.1',
// 		},
// 	})
// );

// app.use((req, res, next) => {
// 	console.log(req.session);
// 	if (!req.session.user) {
// 		return next();
// 	}
// 	User.findByPk(req.session.user.id)
// 		.then(user => {
// 			req.user = user;
// 			next();
// 		})
// 		.catch(err => console.log(err));
// });

// app.use((req, res, next) => {
// 	res.locals.isAuthenticated = req.session.isLoggedIn;
// 	next();
// });

// this is for the bearer token

app.use(isAuth);

// app.use((req, res, next) => {
// 	if (!req.isAuth) {
// 		console.log('no auth');
// 	}
// 	User.findByPk(req.userId)
// 		.then(user => {
// 			req.user = user;
// 			next();
// 		})
// 		.catch(err => console.log(err));
// });

server.applyMiddleware({ app, path: '/graphql' });

// app.use(
// 	'/graphql',
// 	graphqlHttp({
// 		schema: graphqlSchema,
// 		rootValue: graphqlResolver,
// 		graphiql: true,
// 	})
// );

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
