const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
	process.env.AWS_RDS_DB_NAME,
	process.env.AWS_RDS_DB_USER,
	process.env.AWS_RDS_DB_PASSWORD,
	{
		host: process.env.AWS_RDS_DB_HOST,
		dialect: 'mysql',
		pool: {
			max: 10,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
		charset: 'utf8mb4',
	}
);

module.exports = sequelize;
