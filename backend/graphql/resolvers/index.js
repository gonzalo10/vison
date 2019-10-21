const authResolver = require('./auth');
const usersResolver = require('./users');
const modelResolver = require('./model');
const sentmientResolver = require('./sentiment');
const entitiesResolver = require('./entities');
const modelTypeResolver = require('./modelType');
const summaryResolver = require('./summary');
const uploadResolber = require('./fileUpload');

const resolvers = {
	...usersResolver,
	...modelResolver,
	...modelTypeResolver,
	...sentmientResolver,
	...entitiesResolver,
	...summaryResolver,
	...uploadResolber,
	...authResolver,
};
console.log(resolvers);
module.exports = resolvers;
