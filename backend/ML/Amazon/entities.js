var AWS = require('aws-sdk');
const path = require('path');

// Load credentials and set region from JSON file
AWS.config.loadFromPath(path.join(__dirname, '../../config.json'));

const analyzeEntities = async text => {
	console.log('text', text);
	var comprehend = new AWS.Comprehend();
	var params = {
		LanguageCode: 'en',
		Text: text,
	};

	const result = await comprehend.detectEntities(params).promise();
	console.log('AWS comprehend result ', result);
	// return {
	// 	Entities: [
	// 		{
	// 			Score: 0.900368869304657,
	// 			Type: 'ORGANIZATION',
	// 			Text: 'Amazon.com, Inc',
	// 			BeginOffset: 0,
	// 			EndOffset: 15,
	// 		},
	// 		{
	// 			Score: 0.993412435054779,
	// 			Type: 'ORGANIZATION',
	// 			Text: 'Starbucks',
	// 			BeginOffset: 251,
	// 			EndOffset: 260,
	// 		},
	// 		{
	// 			Score: 0.9982319474220276,
	// 			Type: 'ORGANIZATION',
	// 			Text: 'Boeing',
	// 			BeginOffset: 265,
	// 			EndOffset: 271,
	// 		},
	// 	],
	// };
	return result;
};

module.exports = analyzeEntities;
