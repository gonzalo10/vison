const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Model = sequelize.define(
	'model',
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		title: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		description: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
	},
	{ timestamps: true }
);

module.exports = Model;
