import { IProjectBlock, IProjectDetail } from '../../../interfaces';
const projectBlocks: IProjectBlock[] = [
	{
		key: 'description1',
		title: '',
		body: [
			'The intention of the project is to create a safe, secure, and powerful payment gateway for WooCommerce with Bitcoin on the Lightning Network to reduce friction and incentivise the use of Bitcoin as the future of e-commerce on the internet.',
		],
		images: [0],
		blockType: 'PL',
	},
	{
		key: 'description2',
		title: 'Breakdown',
		body: [
			'We need to raise $20k for core development and go to market. Money will go into the following areas and progress and will both go to paying individual contributors at reasonable hourly rates and materials and services needed to launch:',
		],
		blockType: 'PL',
	},
	{
		key: 'description2',
		title: 'Product Development - 70%',
		body: [
			'Wordpress and Custom development',
			'API Support',
			'rapaygo.com Integration and Product Integration',
			'Quality Assurance ',
			'Security Operations Review',

		],
		blockType: 'PL',
	},
	{
		key: 'description2',
		title: 'Marketing and Advertising - 30%',
		body: [
			'Trade Events ',
			'Online Advertising',
			'Seminars and Meetups',
			'Community Development',

		],
		blockType: 'PL',
	},
	{
		key: 'aboutMe',
		title: 'About me',
		body: [
			'My name is Clay Graham, and I am one of the founders of rapaygo.com, and our passion is to enable Bitcoin on the Lightning Network as the easiest, fastest and cheapest way for merchants and sellers to accept payment. I am a software developer, designer and architect who has been involved in numerous startups and ventures, not with the potential to improve people\'s lives all over the world as the work we are doing now.',
		],
		blockType: 'PL',
	},
];

const projectDetails: IProjectDetail = {
	problem: '',
	idea: 'Enable Lightning Network based e-Commerce as a WooCommerce Payment Gateway',
	ownerIntro: 'I am one of the founders of rapaygo.com, and our passion is to enable Bitcoin on the Lightning Network',
	blocks: projectBlocks,
};

const projectName: string = 'rapaygo';

export const Rapaygo = { projectBlocks, projectDetails, projectName };
