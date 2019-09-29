'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn(
			'sentiments',
			'modelId',
			Sequelize.INTEGER,
			{
				after: 'userId', // after option is only supported by MySQL
			}
		);
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('sentiments', 'modelId');
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
	},
};
