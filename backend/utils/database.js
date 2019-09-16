const Sequelize = require('sequelize');

const sequelize = new Sequelize('vision', 'root', 'gonzalo_vision', {
	dialect: 'mysql',
	host: 'localhost',
});

module.exports = sequelize;
