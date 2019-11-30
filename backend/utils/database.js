const Sequelize = require('sequelize');

const sequelize = new Sequelize('vision', 'root', 'root', {
	host: process.env.MYSQL_DATABASE,
	dialect: 'mysql',
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

module.exports = sequelize;
