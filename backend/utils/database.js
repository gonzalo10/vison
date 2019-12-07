const Sequelize = require('sequelize');

// const sequelize = new Sequelize('vision', process.env.AWS_RDS_DB_USER, process.env.AWS_RDS_DB_PASSWORD, {
// 	host: process.env.AWS_RDS_DB_HOST ,
// 	dialect: 'mysql',
// 	pool: {
// 		max: 10,
// 		min: 0,
// 		acquire: 30000,
// 		idle: 10000,
// 	},
// 	charset: 'utf8mb4',
// });
const sequelize = new Sequelize('vision', 'root', 'root', {
	dialect: 'mysql',
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
	charset: 'utf8mb4',
});

module.exports = sequelize;
