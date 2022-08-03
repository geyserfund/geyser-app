import { IProjectBlock, IProjectDetail } from '../../../interfaces';
const projectBlocks: IProjectBlock[] = [
	{
		key: 'description1',
		title: '',
		body: [
			'Let’s tell the IMF, The Fed, The WEF, and the BIS that we are not going to allow them to take digital control of our money. More importantly, let’s grow the public knowledge that CBDCs are essentially surveillance coins that they can use to spy on us, restrict our movements, and punish us for having “unacceptable” views. It is our goal to get the attention of media outlets as well to possibly amplify the message.',
			'We are partnering with [10K Advertising](https://10kadvertising.com/), a leader in worldwide wildposting (AKA wheatpasting, snipes, flyposting, guerilla posters, city postering) to create outdoor ads in applicable markets: New York, Los Angeles, Miami, London, Davos,and Washington D.C to name a few. This Geyser crowdfunding is to create a pilot campaign in one of these markets and gather data on effectiveness, exposure, and feasibility to go bigger.',
		],
		images: [1, 2],
		blockType: 'PL',
	},
	{
		key: 'description2',
		title: '',
		body: [],
		images: [3, 4],
		blockType: 'PL',
	},
	{
		key: 'description3',
		title: '',
		body: [],
		images: [5, 6],
		blockType: 'PL',
	},
	{
		key: 'aboutMe',
		title: 'About us',
		body: [
			'We are a professional design agency with over 25 years of experience in advertising, branding, and marketing. We have created campaigns for Starbucks, BASF, Cirque Du Soleil, and many Billboard100 recording artists.',
		],
		blockType: 'PL',
	},
];

const projectDetails: IProjectDetail = {
	problem: '',
	idea: 'The public at large needs to know that CBDCs are authoritarian, anti-human rights, centrally planned, and pro-censorship.',
	ownerIntro: '',
	blocks: projectBlocks,
};

const projectName: string = 'dontletthemshackleyou';

export const NoShackles = { projectBlocks, projectDetails, projectName };
