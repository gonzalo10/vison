const analyzeSentiment = require('../../ML/Amazon/sentiment');
const axios = require('axios');

const youtubeApiCall = async (
	videoId,
	youtubeKey,
	maxResults,
	nextPageToken,
	comments,
	contador
) => {
	var response = await axios.get(
		`https://www.googleapis.com/youtube/v3/commentThreads?videoId=${videoId}&key=${
			process.env.GOOGLE_API
		}&textFormat=plainText&part=snippet&maxResults=${maxResults}${
			nextPageToken ? `&pageToken=${nextPageToken}` : ''
		}`
	);

	const items = (response && response.data.items) || 0;
	for (let i = 0; i < items.length; i++) {
		const commentInfo = items[i].snippet.topLevelComment.snippet;
		comments.push(commentInfo);
	}
	const newToken = response && response.data && response.data.nextPageToken;
	contador = contador + 1;
	if (newToken && contador < 5) {
		return youtubeApiCall(
			videoId,
			youtubeKey,
			maxResults,
			newToken,
			comments,
			contador
		);
	}
};

const getYoutbeComments = async url => {
	const videoId = 'FaK3koLyChE';
	const youtubeKey = googleApi;
	const maxResults = 2;

	let contador = 0;
	const comments = [];
	try {
		await youtubeApiCall(
			videoId,
			youtubeKey,
			maxResults,
			'',
			comments,
			contador
		);
	} catch (err) {
		console.log('youtube API call error', err);
	}
	console.log('all the comments', comments);
	// const text = commentInfo.textOriginal;
	// const likeCount = commentInfo.likeCount;
	// const author = commentInfo.authorChannelId.value;
	// console.log('comments', commentInfo);
	// console.log('likeCount', likeCount);
	// console.log('author', author);
	// console.log('texts', text);
	// console.log(comments);
	return comments;
};
module.exports = {
	Mutation: {
		analyzeYoutubeVideo: async (parent, args, user, info) => {
			const { url, modelId } = args;
			try {
				console.log(args);
				if (!user) {
					throw new Error('Unauthenticated!');
				}
				const comments = await getYoutbeComments(url);
				// const result = await analyzeSentiment(text);
				// return user.createSentiment({
				// 	text: text,
				// 	modelId,
				// 	sentiment: result.Sentiment,
				// 	positive: result.SentimentScore.Positive,
				// 	negative: result.SentimentScore.Negative,
				// 	neutral: result.SentimentScore.Neutral,
				// 	mixed: result.SentimentScore.Mixed,
				// });
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
	},
};
