var AWS = require('aws-sdk');
const path = require('path');

// Load credentials and set region from JSON file
AWS.config.loadFromPath(path.join(__dirname, '../../config.json'));

const analyzeSentiment = async text => {
	console.log('text', text);
	var comprehend = new AWS.Comprehend();
	var params = {
		LanguageCode: 'en',
		Text: text,
	};

	// const result = await comprehend.detectSentiment(params).promise();
	return {
		Sentiment: 'NEUTRAL',
		SentimentScore: {
			Positive: 0.03146204352378845,
			Negative: 0.030713696032762527,
			Neutral: 0.9329584240913391,
			Mixed: 0.004865831229835749,
		},
	};
	return result;
};

module.exports = analyzeSentiment;
