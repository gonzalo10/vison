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
		uploadFile: async (args, req) => {
			console.log('args', args);
			console.log('req', req);
			const { file, modelId } = args.fileInput;
			try {
				if (!req.isAuth) {
					throw new Error('Unauthenticated!');
				}
				var upload = multer({ storage: storage }).single('file');
				upload(req, null, function(err) {
					if (err instanceof multer.MulterError) {
						return console.log(err);
					} else if (err) {
						return console.log(err);
					}
					console.log('muller file', file);
				});
				fs.stat(file, val => console.log(val));
				console.log(upload);
				console.log('file', file);
				console.log('modelId', modelId);
				return 'hola';
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
	},
};
