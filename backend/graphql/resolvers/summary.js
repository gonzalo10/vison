const axios = require('axios');
const path = require('path');
const { spawnSync } = require('child_process');

/**
 * Run python script, pass in `-u` to not buffer console output
 * @return {ChildProcess}
 */

const textToSummary = require('../../utils/mock-text-summary');

module.exports = {
	Mutation: {
		createSummary: (parent, args, user, info) => {
			const { text, summarySize } = args.summaryInput;
			try {
				if (!user.dataValues) {
					throw new Error('Unauthenticated!');
				}

				function runScript() {
					return spawnSync('python', [
						'-u',
						path.join(__dirname, '../../ML/Summary/script.py'),
						'__main__',
						decodeURI(text),
						summarySize / 100,
					]);
				}
				const subprocess = runScript();
				const result = subprocess.output[1].toString();
				return { text: encodeURI(text), summary: encodeURI(result) };
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
	},
};
