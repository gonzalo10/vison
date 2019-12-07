var AWS = require('aws-sdk');
const path = require('path');

// Load credentials and set region from JSON file

const analyzeSentiment = async text => {
	var comprehend = new AWS.Comprehend();
	var params = {
		LanguageCode: 'en',
		Text: text,
	};

	return {
		Sentiment: 'NEUTRAL',
		SentimentScore: {
			Positive: 0.03146204352378845,
			Negative: 0.030713696032762527,
			Neutral: 0.9329584240913391,
			Mixed: 0.004865831229835749,
		},
	};
	const result = await comprehend.detectSentiment(params).promise();
	console.log(result);
	return result;
};

module.exports = analyzeSentiment;
