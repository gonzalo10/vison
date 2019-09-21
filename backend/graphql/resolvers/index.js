const authResolver = require('./auth');
const usersResolver = require('./users');

const rootResolver = {
	...authResolver,
	...usersResolver,
};

module.exports = rootResolver;
