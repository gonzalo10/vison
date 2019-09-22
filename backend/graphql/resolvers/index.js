const authResolver = require('./auth');
const usersResolver = require('./users');
const modelResolver = require('./model');
const sentmientResolver = require('./sentiment');
const modelTypesResolver = require('./modelTypes');

const rootResolver = {
	...authResolver,
	...usersResolver,
	...modelResolver,
	...modelTypesResolver,
	...sentmientResolver,
};

module.exports = rootResolver;
