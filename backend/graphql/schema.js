const { buildSchema } = require('graphql');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
	type Model {
		id: ID!
		title: String!
		description: String!
		modelTypeId: Int!
		modelType: ModelType
	}
	type SentimentStats {
		NEUTRAL: Int
		POSITIVE: Int
		NEGATIVE: Int
		MIXED: Int
	}

	type SentimentModel {
		id: ID!
		title: String!
		description: String!
		modelTypeId: Int!
		modelType: ModelType
		data: [Sentiment!]!
		stats: SentimentStats
	}

	type EntityModel {
		id: ID!
		title: String!
		description: String!
		modelTypeId: Int!
		modelType: ModelType
		data: [Entity!]!
	}

	type ModelType {
		id: ID!
		title: String!
		description: String!
		imageUrl: String!
	}

	type SentimentScore {
		positive: Float!
		negative: Float!
		neutral: Float!
		mixed: Float!
	}

	type Sentiment {
		text: String!
		sentiment: String!
		positive: Float!
		negative: Float!
		neutral: Float!
		mixed: Float!
		modelId: Int!
	}

	type Entity {
		text: String!
		score: Float!
		type: String!
		name: String!
		description: String!
		articleBody: String!
		wikiUrl: String!
		modelId: Int!
	}

	type User {
		id: ID!
		email: String!
		password: String!
		createModel: [Model!]
	}

	type AuthData {
		userId: ID!
		token: String!
		tokenExpiration: Int!
		error: String
	}

	type Summary {
		text: String!
		summary: String!
	}

	type Status {
		text: String!
	}
	type File {
		filename: String!
	}

	input ModelInput {
		title: String!
		description: String!
		modelTypeId: Int!
	}

	input ModelTypeInput {
		title: String!
		description: String!
		imageUrl: String!
	}

	input UserInput {
		email: String!
		password: String!
	}

	input SentimentInput {
		text: String!
		modelId: Int!
	}

	input EntityInput {
		text: String!
		modelId: Int!
	}

	input SummaryInput {
		text: String!
		summarySize: Int!
		modelId: Int!
	}
	input FileInput {
		file: String!
		modelId: Int!
	}

	type Query {
		models: [Model!]!
		sentimentModel(id: Int!): SentimentModel!
		entityModel(id: Int!): EntityModel!
		users: [User!]!
		sentimentAnalysis: [Sentiment!]!
		entitiesAnalysis: [Entity!]!
		modelType: [ModelType!]!
		login(email: String!, password: String!): AuthData!
		login2(email: String!, password: String!): String!
	}

	type Mutation {
		createModel(modelInput: ModelInput): Model
		createModelType(modelTypeInput: ModelTypeInput): ModelType
		createUser(userInput: UserInput): User
		createSentimentAnalysis(sentimentInput: SentimentInput): Sentiment
		createEntitiesAnalysis(entityInput: EntityInput): [Entity!]!
		createSummary(summaryInput: SummaryInput): Summary!
		deleteModel(id: Int!): Status!
		uploadFile(fileInput: FileInput!): String!
	}

	schema {
		query: Query
		mutation: Mutation
	}
`;

module.exports = typeDefs;

// module.exports = buildSchema(`
//     type Model {
//         id: ID!
//         title: String!
//         description: String!
//         modelTypeId: Int!
//         modelType: ModelType
//     }

//     type SentimentStats {
//         NEUTRAL: Int
//         POSITIVE: Int
//         NEGATIVE: Int
//         MIXED: Int
//     }

//     type SentimentModel {
//         id: ID!
//         title: String!
//         description: String!
//         modelTypeId: Int!
//         modelType: ModelType
//         data: [Sentiment!]!
//         stats: SentimentStats
//     }

//     type EntityModel {
//         id: ID!
//         title: String!
//         description: String!
//         modelTypeId: Int!
//         modelType: ModelType
//         data: [Entity!]!
//     }

//     type ModelType {
//         id: ID!
//         title: String!
//         description: String!
//         imageUrl: String!
//     }

//     type SentimentScore {
//         positive: Float!
//         negative: Float!
//         neutral: Float!
//         mixed: Float!
//     }

//     type Sentiment {
//         text: String!
//         sentiment: String!
//         positive: Float!
//         negative: Float!
//         neutral: Float!
//         mixed: Float!
//         modelId: Int!
//     }

//     type Entity {
//         text: String!
//         score: Float!
//         type: String!
//         name: String!
//         description: String!
//         articleBody: String!
//         wikiUrl: String!
//         modelId: Int!
//     }

//     type User {
//         id: ID!
//         email: String!
//         password: String!
//         createModel: [Model!]
//     }

//     type AuthData {
//         userId: ID!
//         token: String!
//         tokenExpiration: Int!
//         error: String
//     }

//     type Summary {
//         text: String!
//         summary: String!
//     }

//     type Status {
//         text: String!
//     }
//     type File {
//         filename: String!
//     }

//     input ModelInput {
//         title: String!
//         description: String!
//         modelTypeId: Int!
//     }

//     input ModelTypeInput {
//         title: String!
//         description: String!
//         imageUrl: String!
//     }

//     input UserInput {
//         email: String!
//         password: String!
//     }

//     input SentimentInput {
//         text: String!
//         modelId: Int!
//     }

//     input EntityInput {
//         text: String!
//         modelId: Int!
//     }

//     input SummaryInput {
//         text: String!
//         summarySize: Int!
//         modelId: Int!
//     }
//     input FileInput {
//         file: String!
//         modelId: Int!
//     }

//     type RootQuery {
//         models: [Model!]!
//         sentimentModel(id: Int!): SentimentModel!
//         entityModel(id: Int!): EntityModel!
//         users: [User!]!
//         sentimentAnalysis: [Sentiment!]!
//         entitiesAnalysis: [Entity!]!
//         modelType: [ModelType!]!
//         login(email: String!, password: String!): AuthData!
//     }

//     type RootMutation {
//         createModel(modelInput: ModelInput): Model
//         createModelType(modelTypeInput: ModelTypeInput): ModelType
//         createUser(userInput: UserInput): User
//         createSentimentAnalysis(sentimentInput: SentimentInput): Sentiment
//         createEntitiesAnalysis(entityInput: EntityInput): [Entity!]!
//         createSummary(summaryInput: SummaryInput ): Summary!
//         deleteModel(id: Int!): Status!
//         uploadFile(fileInput: FileInput!): String!
//     }

//     schema {
//         query: RootQuery
//         mutation: RootMutation
//     }
// `);
