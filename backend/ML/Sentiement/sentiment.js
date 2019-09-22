var AWS = require('aws-sdk');
const path = require('path');

// Load credentials and set region from JSON file
AWS.config.loadFromPath(path.join(__dirname, '../../config.json'));

const analyzeSentiment = (text, cb) => {
	console.log('text', text);
	var comprehend = new AWS.Comprehend();
	var params = {
		LanguageCode: 'en',
		Text: text,
	};
	const callback = (err, data) => {
		if (err) console.log(err, err.stack);
		// an error occurred
		else {
			cb(data);
		} // successful response
	};
	comprehend.detectSentiment(params, callback);
};

module.exports = analyzeSentiment;
