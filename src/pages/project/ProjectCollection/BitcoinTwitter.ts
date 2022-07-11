import { IProjectBlock, IProjectDetail } from '../../../interfaces';
const projectBlocks: IProjectBlock[] = [
	{
		key: 'description1',
		title: '',
		body: [],
		images: [0],
		blockType: 'PL',
	},
	{
		key: 'description1',
		title: '',
		body: [
			'\'Bitcoin Twitter\' is soooo precious and we can\'t have a single point of failure (twitter itself).',
			'Hence I launched this project \'Bitcoin Twitter\'  on a special day (May 4 / Hal\'s bday), with the mission of collecting the invaluable tweets for everyone to read, learn and enjoy. For now I am updating all the tweets in a [Google sheet (500+ tweets so far)](https://docs.google.com/spreadsheets/d/1N5OsjmrGF8lODMSO0qDhUMPREshvDv90l7AqwxlUWSQ/edit#gid=2132096137)',
			'[GIT Link](https://github.com/bitcoin-twitter/raw-json)',
			'Torrent link with awesome memes is on the pipeline. I will update the repos / torrent on a quarterly basis.',
			'Now this campaign will help me to set up a basic website (open sourced in github) to easily filter and read through tweets. Rough layout of \'BitcoinTwitter\' website will look like this:',
		],
		images: [1, 2],
		blockType: 'PL',
	},
	{
		key: 'description12',
		title: '',
		body: [
			'If you think this is a meaningful project, please do contribute few sats and share among fellow Plebs.',
			'Appreciate your support.',
			'- We all are Satoshi / Psychopaths -',
			'Note: After you make a donation, DM us in twitter @tw_bitcoin with your invoice or a transaction ID and other details to be displayed in Donor section of the website.',
		],
		blockType: 'PL',
	},
];

const projectDetails: IProjectDetail = {
	problem: '',
	idea: 'Let’s create a basic curated website for ‘Bitcoin Twitter’',
	ownerIntro: 'Just another pleb, trying to make my small contribution to the revolution.',
	blocks: projectBlocks,
};

const projectName: string = 'bitcoin-twitter';

export const BitcoinTwitter = { projectBlocks, projectDetails, projectName };
