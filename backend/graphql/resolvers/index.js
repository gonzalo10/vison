const authResolver = require('./auth');
const usersResolver = require('./users');
const modelResolver = require('./model');
const sentmientResolver = require('./sentiment');
const entitiesResolver = require('./entities');
const modelTypeResolver = require('./modelType');
const summaryResolver = require('./summary');
const uploadResolber = require('./fileUpload');

const rootResolver = {
	...authResolver,
	...usersResolver,
	...modelResolver,
	...modelTypeResolver,
	...sentmientResolver,
	...entitiesResolver,
	...summaryResolver,
	...uploadResolber,
};

module.exports = rootResolver;
