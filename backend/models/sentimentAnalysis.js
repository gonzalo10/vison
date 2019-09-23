const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Sentiment = sequelize.define(
	'sentiment',
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		text: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		sentiment: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		positive: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		negative: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		neutral: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		mixed: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
	},
	{ timestamps: true }
);

module.exports = Sentiment;
