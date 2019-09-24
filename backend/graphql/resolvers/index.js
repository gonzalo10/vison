const authResolver = require('./auth');
const usersResolver = require('./users');
const modelResolver = require('./model');
const sentmientResolver = require('./sentiment');
const entitiesResolver = require('./entities');
const modelTypesResolver = require('./modelTypes');

const rootResolver = {
	...authResolver,
	...usersResolver,
	...modelResolver,
	...modelTypesResolver,
	...sentmientResolver,
	...entitiesResolver,
};

module.exports = rootResolver;
