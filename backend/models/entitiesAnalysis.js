const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Entity = sequelize.define(
	'entity',
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		text: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		score: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		type: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		description: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		articleBody: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		wikiUrl: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		url: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{ timestamps: true }
);

module.exports = Entity;
