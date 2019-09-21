const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./utils/database');

const Models = require('./models/models');
const User = require('./models/user');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();

var store = new SequelizeStore({
	db: sequelize,
});

app.use(bodyParser.json());
// app.use((req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
// 	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// 	if (req.method === 'OPTIONS') {
// 		return res.sendStatus(200);
// 	}
// 	next();
// });
app.use(
	session({
		secret: 'my secret',
		resave: false,
		saveUninitialized: false,
		store: store,
		maxAge: 100000000000000,
	})
);
app.use((req, res, next) => {
	console.log(req.session);
	if (!req.session.user) {
		return next();
	}
	User.findByPk(req.session.user.id)
		.then(user => {
			req.user = user;
			next();
		})
		.catch(err => console.log(err));
});

app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn;
	next();
});

app.use(
	'/graphql',
	graphqlHttp({
		schema: graphqlSchema,
		rootValue: graphqlResolver,
		graphiql: true,
	})
);

Models.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Models);

sequelize
	.sync()
	.then(() => app.listen(3000))
	.catch(err => console.log(err));
