const analyzeSentiment = require('../../ML/Amazon/sentiment');
module.exports = {
	sentimentAnalysis: async (args, req) => {
		try {
			if (!req.isAuth) {
				throw new Error('Unauthenticated!');
			}
			const sentiments = await req.user.getSentiments({
				limit: 50,
				order: [['id', 'DESC']],
			});
			return sentiments;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	createSentimentAnalysis: async (args, req) => {
		const { text } = args.sentimentInput;
		try {
			if (!req.isAuth) {
				throw new Error('Unauthenticated!');
			}
			const result = await analyzeSentiment(text);
			console.log('req.user', req.user);
			return req.user.createSentiment({
				text: text,
				sentiment: result.Sentiment,
				positive: result.SentimentScore.Positive,
				negative: result.SentimentScore.Negative,
				neutral: result.SentimentScore.Neutral,
				mixed: result.SentimentScore.Mixed,
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
};
