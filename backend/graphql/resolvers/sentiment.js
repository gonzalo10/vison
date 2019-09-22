const analyzeSentiment = require('../../ML/Sentiement/sentiment');
module.exports = {
	sentimentAnalysis: (args, req) => {
		try {
			if (!req.isAuth) {
				throw new Error('Unauthenticated!');
			}
			const cb = response => {
				console.log('response', response);
				return [{ text: response.Sentiment }];
			};
			analyzeSentiment(args.text, cb);
			// const models = await req.user.getModels();
			// return [{ text: 'hoal' }];
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
};
