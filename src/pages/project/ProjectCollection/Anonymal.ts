import { IProjectBlock, IProjectDetail } from '../../../interfaces';
const projectBlocks: IProjectBlock[] = [
	{
		key: 'description1',
		title: '',
		body: [
			'Anonymal is the first Modern Heavy Metal band to sing exclusively about Bitcoin history, philosophy and goals. The band was born October 31, 2021. On this date we released our first single, called "as government dies". The song speaks about the creation and rise of Bitcoin as world governments die.',
			'This crowdfunding is a tool to help us record and release our first album, to be available until July, 2022, hopefully, if we can get the resources we need to cover most of the expenses for the production of the album such as recording all the songs, creating the artwork, making at least one professional video clip  and content for marketing.',
		],
		images: [6, 1],
		blockType: 'PL',
	},
	{
		key: 'description2',
		title: 'About the Album',
		body: [
			'The album will have at least 11 songs, most of them are already finished in the pre-production stage.',
		],
		blockType: 'PL',
	},
	{
		key: 'description3',
		title: 'The name of the songs will be as follows:',
		body: [
			'Horns up for Satoshi',
			'Orange Pill',
			'Caesar\'s Denarius',
			'Banksters',
			'Annonymal  ',
			'Encrypted Minds',
			'As Government Dies',
			'Bitcoin is yours',
			'The Soul Behind the Mask',
			'War Strategy',
			'The Highest Stakes',

		],
		images: [],
		blockType: 'OL',
	},
	{
		key: 'description4',
		title: '',
		body: [
			'The album will have more or less one hour of musical content of a refined and accessible modern heavy metal, suitable to the musical taste of millions of people that listen to this kind of music worldwide.',
		],
		images: [3, 5, 7],
		blockType: 'PL',
	},
	{
		key: 'description5',
		title: '',
		body: [
			'Heavy Metal fans are addicted to the kind of music and lifestyle that they love, and Bitcoin is the ultimate content that they need to understand and embrace to fulfil their desire for freedom and to express their anger and frustration against governments, or "the system", as they call it.',
		],
		images: [2, 4],
		blockType: 'PL',
	},
	{
		key: 'description6',
		title: '',
		body: [
			'Anonymal aims to use heavy music with the intent to create a movement of heavy metal fans learning about bitcoin and using it in their interactions with the band when buying tickets for concerts, which we want to start doing in the near future after the album\'s release, merch, and many more things that will be disclosed along the way.',
		],
		blockType: 'PL',
	},
	{
		key: 'description7',
		title: 'Our first single',
		body: [
			'This is our first single, for you guys to hear a real example of what we are talking about:',
		],
		youtube: 'ikX-SyLXuYM',
		blockType: 'PL',
	},
	{
		key: 'aboutMe',
		title: 'About us',
		body: [
			'Anonymal is a modern heavy metal band that is creating a pro-bitcoin movement through heavy music.',
			'The band doesn\'t reveal its identity as all the musicians play with Guy Fawkes masks.',
		],
		images: [0],
		blockType: 'PL',
	},
];

const projectDetails: IProjectDetail = {
	problem: 'Anonymal wants to bring more people to bitcoin using modern heavy metal as a tool.',
	idea: 'Release a full length album of the purest modern heavy metal singing about bitcoin history, philosophy and goals with the aim to educate, entertain and bring people to use bitcoin through our music and website.',
	ownerIntro: 'Anonymal is the first Modern Heavy Metal band to sing exclusively about Bitcoin history, philosophy and goals.',
	blocks: projectBlocks,
};

const projectName: string = 'anonymal';

export const Anonymal = { projectBlocks, projectDetails, projectName };
