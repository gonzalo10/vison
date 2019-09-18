const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const sequelize = require('./utils/database');

const Models = require('./models/models');
const User = require('./models/user');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();
app.use((req, res, next) => {
	User.findByPk(1)
		.then(user => {
			req.user = user;
			next();
		})
		.catch(err => console.log(err));
});

app.use(bodyParser.json());

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
	.then(results => {
		return User.findByPk(1);
	})
	.then(user => {
		if (!user) {
			return User.create({ name: 'max', email: 'google.com' });
		}
		return user;
	})
	.then(() => app.listen(3000))
	.catch(err => console.log(err));
