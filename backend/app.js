const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const sequelize = require('./utils/database');

const Models = require('./models/models');

const app = express();

app.use(bodyParser.json());

app.use(
	'/graphql',
	graphqlHttp({
		schema: buildSchema(`
          type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
          }
          type Model {
            id: ID!
            title: String!
            description: String!
			price: Float!
			imageUrl: String!
          }
          input EventInput {
            title: String!
            description: String!
            price: Float!
          }
          input ModelInput {
            title: String!
            description: String!
			price: Float!
			imageUrl: String!
          }
          type RootQuery {
			events: [Event!]!
			models: [Model!]!
          }
          type RootMutation {
              createEvent(eventInput: EventInput): Event
              createModel(modelInput: ModelInput): Model
          }
          schema {
              query: RootQuery
              mutation: RootMutation
          }
      `),
		rootValue: {
			events: async () => {
				try {
					const response = await sql.execute('SELECT * FROM events');
					const events = response[0];
					return events;
				} catch (err) {
					console.log(err);
					throw err;
				}
			},
			models: async () => {
				try {
					const allModels = await Models.findAll();
					return allModels;
				} catch (err) {
					console.log(err);
					throw err;
				}
			},
			createEvent: async args => {
				const { title, description, price } = args.eventInput;
				try {
					const event = await sql.execute(
						'INSERT INTO events(title, description, price) VALUES (?, ?, ?)',
						[title, description, price]
					);
					const ID = event[0].insertId;
					const response = await sql.execute(
						`SELECT * FROM events WHERE _id = ?`,
						[ID]
					);
					return response[0][0];
				} catch (err) {
					console.log(err);
					throw err;
				}
			},
			createModel: async args => {
				const { title, description, price, imageUrl } = args.modelInput;
				try {
					const response = await Models.create({
						title,
						description,
						price,
						imageUrl,
					});
					const { dataValues } = response;
					console.log(response.dataValues);
					return dataValues;
				} catch (err) {
					console.log(err);
					throw err;
				}
			},
		},
		graphiql: true,
	})
);

sequelize
	.sync()
	.then(results => {
		app.listen(3000);
	})
	.catch(err => console.log(err));
