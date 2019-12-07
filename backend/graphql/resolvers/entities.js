const axios = require('axios');

const analyzeEntities = require('../../ML/Amazon/entities');

const formatText = text => text.trim().replace(/  +/g, '+');
module.exports = {
	Query: {
		entitiesAnalysis: async (parent, args, user, info) => {
			try {
				if (!user) {
					throw new Error('Unauthenticated!');
				}
				return user.getEntities({
					limit: 50,
					order: [['id', 'DESC']],
				});
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
	},
	Mutation: {
		createEntitiesAnalysis: async (parent, args, user, info) => {
			const { text, modelId } = args.entityInput;
			try {
				if (!user) {
					throw new Error('Unauthenticated!');
				}
				const result = await analyzeEntities(text);

				return result.Entities.map(async entity => {
					var googleResult = await axios.get(
						`https://kgsearch.googleapis.com/v1/entities:search?query=${formatText(
							entity.Text
						)}&key=${process.env.GOOGLE_API}&limit=1&indent=True`
					);
					const {
						name,
						description,
						detailedDescription: { articleBody, url: wikiUrl },
						url,
					} = googleResult.data.itemListElement[0].result;
					return user.createEntity({
						text: entity.Text,
						score: entity.Score,
						type: entity.Type,
						name,
						description: description ? description : '',
						articleBody: articleBody ? articleBody : '',
						wikiUrl: wikiUrl ? wikiUrl : '',
						url: url ? url : '',
						modelId,
					});
				});
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
	},
};
