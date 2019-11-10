const authResolver = require('./auth');
const usersResolver = require('./users');
const modelResolver = require('./model');
const sentmientResolver = require('./sentiment');
const entitiesResolver = require('./entities');
const modelTypeResolver = require('./modelType');
const summaryResolver = require('./summary');
const uploadResolver = require('./fileUpload');
const analyzeYoutube = require('./youtube');
const populateModel = require('./populateModel');

const resolvers = {
	Query: {
		...usersResolver.Query,
		...modelResolver.Query,
		...modelTypeResolver.Query,
		...sentmientResolver.Query,
		...entitiesResolver.Query,
		...summaryResolver.Query,
		...uploadResolver.Query,
		...authResolver.Query,
		...populateModel.Query,
	},
	Mutation: {
		...usersResolver.Mutation,
		...modelResolver.Mutation,
		...modelTypeResolver.Mutation,
		...sentmientResolver.Mutation,
		...entitiesResolver.Mutation,
		...summaryResolver.Mutation,
		...uploadResolver.Mutation,
		...authResolver.Mutation,
		...analyzeYoutube.Mutation,
		...populateModel.Mutation,
	},
};
module.exports = resolvers;
