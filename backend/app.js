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
            _id: ID!
            title: String!
            description: String!
			price: Float!
			imageURL: String!
          }
          input EventInput {
            title: String!
            description: String!
            price: Float!
          }
          type RootQuery {
			events: [Event!]!
			models: [Model!]!
          }
          type RootMutation {
              createEvent(eventInput: EventInput): Event
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
					const response = await Models.fetchAll();
					console.log(response);
					const models = response[0];
					return models;
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
