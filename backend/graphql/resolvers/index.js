const authResolver = require('./auth');
const usersResolver = require('./users');
const modelResolver = require('./model');

const rootResolver = {
	...authResolver,
	...usersResolver,
	...modelResolver,
};

module.exports = rootResolver;
