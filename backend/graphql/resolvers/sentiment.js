const analyzeSentiment = require('../../ML/Amazon/sentiment');
module.exports = {
	Query: {
		sentimentAnalysis: async (parent, args, user, info) => {
			try {
				if (!user) {
					throw new Error('Unauthenticated!');
				}
				const sentiments = await user.getSentiments({
					limit: 50,
					order: [['id', 'DESC']],
				});
				return sentiments;
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
	},
	Mutation: {
		createSentimentAnalysis: async (parent, args, user, info) => {
			const { text, modelId } = args.sentimentInput;
			try {
				if (!user) {
					throw new Error('Unauthenticated!');
				}
				const result = await analyzeSentiment(text);
				return user.createSentiment({
					text: text,
					modelId,
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
	},
};
