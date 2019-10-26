const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

module.exports = function handleCsv(name) {
	fs.createReadStream(
		path.join(__dirname, '../public/uploads/1572083928732-hotels (2).csv')
	)
		.pipe(csv())
		.on('data', row => {
			console.log(row);
		})
		.on('end', () => {
			console.log('CSV file successfully processed');
		});
};
