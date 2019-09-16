const db = require('../utils/database');

module.exports = class Models {
	constructor(id, title, imageUrl, description, price) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		return db.execute(
			'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
			[this.title, this.price, this.imageUrl, this.description]
		);
	}

	static deleteById(id) {}

	static fetchAll() {
		return db.execute('SELECT * FROM models');
	}

	static findById(id) {}
};
