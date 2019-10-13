const Sequelize = require('sequelize');

const sequelize = new Sequelize('vision', 'gonzalo_root', 'gonzalo_vision', {
	dialect: 'mysql',
	host: 'mysql_host',
});

module.exports = sequelize;
