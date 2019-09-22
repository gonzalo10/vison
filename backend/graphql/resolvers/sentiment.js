const analyzeSentiment = require('../../ML/Sentiement/sentiment');
module.exports = {
	sentimentAnalysis: async (args, req) => {
		try {
			if (!req.isAuth) {
				throw new Error('Unauthenticated!');
			}

			const result = await analyzeSentiment(args.text);
			return [
				{
					text: args.text,
					sentiment: result.Sentiment,
					SentimentScore: result.SentimentScore,
				},
			];
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
};
