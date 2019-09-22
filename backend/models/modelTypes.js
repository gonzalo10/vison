const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const ModelType = sequelize.define(
	'modelType',
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
		imageUrl: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{ timestamps: true }
);

module.exports = ModelType;
