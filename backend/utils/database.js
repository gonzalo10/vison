const Sequelize = require('sequelize');

// const sequelize = new Sequelize('database', 'username', 'password', {
// 	host: 'localhost',
// 	dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
//   });
// const sequelize = new Sequelize('vision', 'gonzalo_root', 'gonzalo_vision', {
// 	dialect: 'mysql',
// 	port: 3308,
// 	host: 'dabaseHost',
// });
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

// const sequelize = new Sequelize(
// 	'mysql://gonzalo_root:gonzalo_vision@localhost:3308/vision'
// );

module.exports = sequelize;
