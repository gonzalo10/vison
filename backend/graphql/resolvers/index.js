const authResolver = require('./auth');
const usersResolver = require('./users');
const modelResolver = require('./model');
const sentmientResolver = require('./sentiment');
const entitiesResolver = require('./entities');
const modelTypeResolver = require('./modelType');
const summaryResolver = require('./summary');
const uploadResolber = require('./fileUpload');

const resolvers = {
	Query: {
		...usersResolver.Query,
		...modelResolver.Query,
		...modelTypeResolver.Query,
		...sentmientResolver.Query,
		...entitiesResolver.Query,
		...summaryResolver.Query,
		...uploadResolber.Query,
		...authResolver.Query,
	},
	Mutation: {
		...usersResolver.Mutation,
		...modelResolver.Mutation,
		...modelTypeResolver.Mutation,
		...sentmientResolver.Mutation,
		...entitiesResolver.Mutation,
		...summaryResolver.Mutation,
		...uploadResolber.Mutation,
		...authResolver.Mutation,
	},
};
module.exports = resolvers;
