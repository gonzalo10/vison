const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const sql = require('./utils/database');

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
          input EventInput {
            title: String!
            description: String!
            price: Float!
          }
          type RootQuery {
              events: [Event!]!
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
			createEvent: async args => {
				const { title, description, price } = args.eventInput;
				try {
					const event = await sql.execute(
						'INSERT INTO events(title, description, price) VALUES (?, ?, ?)',
						[title, description, price]
					);
					const ID = event[0].insertId;
					const response = await sql.execute(
						`SELECT * FROM events WHERE _id = ${ID}`
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

app.listen(3000);
