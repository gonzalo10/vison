const axios = require('axios');

const analyzeEntities = require('../../ML/Amazon/entities');
const googleApi = require('../../credentials');

const formatText = text => text.trim().replace(/  +/g, '+');
module.exports = {
	entitiesAnalysis: async (args, req) => {
		try {
			if (!req.isAuth) {
				throw new Error('Unauthenticated!');
			}
			return req.user.getEntities({
				limit: 50,
				order: [['id', 'DESC']],
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	createEntitiesAnalysis: async (args, req) => {
		const { text } = args.entityInput;
		try {
			if (!req.isAuth) {
				throw new Error('Unauthenticated!');
			}
			const result = await analyzeEntities(text);

			return result.Entities.map(async entity => {
				if (entity.Type === 'ORGANIZATION') {
					var googleResult = await axios.get(
						`https://kgsearch.googleapis.com/v1/entities:search?query=${formatText(
							entity.Text
						)}&key=${googleApi}&limit=1&indent=True`
					);
					const {
						name,
						description,
						detailedDescription: { articleBody, url: wikiUrl },
						url,
					} = googleResult.data.itemListElement[0].result;
					return req.user.createEntity({
						text: entity.Text,
						score: entity.Score,
						type: entity.Type,
						name,
						description,
						articleBody,
						wikiUrl,
						url,
					});
				}
				return {
					text: '',
					score: 234.08,
					type: '',
					name: '',
					description: '',
					articleBody: '',
					wikiUrl: '',
					url: '',
				};
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
};
