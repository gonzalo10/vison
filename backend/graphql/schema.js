const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Model {
        id: ID!
        title: String!
        description: String!
    }
    type ModelType {
        id: ID!
        title: String!
        description: String!
        imageUrl: String!
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

    type RootQuery {
        models: [Model!]!
        users: [User!]! 
        modelsTypes: [ModelType!]!
        login(email: String!, password: String!): AuthData!
    }
    type RootMutation {
        createModel(modelInput: ModelInput): Model
        createModelType(modelTypeInput: ModelTypeInput): ModelType
        createUser(userInput: UserInput): User
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
