const mysql = require('mysql2');

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'vision',
	password: 'gonzalo_vision',
});

module.exports = pool.promise();
