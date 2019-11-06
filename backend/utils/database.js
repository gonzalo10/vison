const Sequelize = require('sequelize');

const sequelize = new Sequelize('vision', 'gonzalo_root', 'gonzalo_vision', {
	dialect: 'mysql',
	host: 'mysql_host',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

module.exports = sequelize;
