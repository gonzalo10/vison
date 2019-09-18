const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Model {
        id: ID!
        title: String!
        description: String!
        price: Float!
        imageUrl: String!
    }
    input ModelInput {
        title: String!
        description: String!
        price: Float!
        imageUrl: String!
    }
    type RootQuery {
        models: [Model!]!
    }
    type RootMutation {
        createModel(modelInput: ModelInput): Model
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
