const Sequelize = require('sequelize');

// const sequelize = new Sequelize('database', 'username', 'password', {
// 	host: 'localhost',
// 	dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
//   });
// const sequelize = new Sequelize('vision', 'gonzalo_root', 'gonzalo_vision', {
// 	dialect: 'mysql',
// 	host: '12345',
// });

const sequelize = new Sequelize(
	'mysql://gonzalo_root:gonzalo_vision@localhost:3308/vision'
);

module.exports = sequelize;
