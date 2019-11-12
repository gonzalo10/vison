const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const UserType = sequelize.define('userType', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	price: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	models: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	modelRow: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	requests: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
});

module.exports = UserType;
