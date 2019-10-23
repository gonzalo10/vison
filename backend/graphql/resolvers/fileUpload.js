const Sequelize = require('sequelize');
var multer = require('multer');
const fs = require('fs');
const ModelType = require('../../models/modelType');
const SentimentData = require('../../models/sentimentAnalysis');
const EntitiesData = require('../../models/entitiesAnalysis');
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public');
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + '-' + 'hola');
	},
});
module.exports = {
	Mutation: {
		uploadFile: async (parent, args, user, info) => {
			console.log('argsssssss', args);
			const { file } = args;
			try {
				if (!user) {
					throw new Error('Unauthenticated!');
				}
				console.log(upload);
				console.log('file', file);
				return 'hola';
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
	},
};
