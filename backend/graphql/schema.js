const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Model {
        id: ID!
        title: String!
        description: String!
        modelTypeId: Int!
        modelType: ModelType
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
    }
    type Entity {
        text: String!
        score: Float!
        type: String!
        name: String!
        description: String!
        articleBody: String!
        wikiUrl: String!
        
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
    }
    input EntityInput {
        text: String!
    }

    type RootQuery {
        models: [Model!]!
        users: [User!]! 
        sentimentAnalysis: [Sentiment!]!
        entitiesAnalysis: [Entity!]!
        modelType: [ModelType!]!
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createModel(modelInput: ModelInput): Model
        createModelType(modelTypeInput: ModelTypeInput): ModelType
        createUser(userInput: UserInput): User
        createSentimentAnalysis(sentimentInput: SentimentInput): Sentiment
        createEntitiesAnalysis(entityInput: EntityInput): [Entity!]!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
