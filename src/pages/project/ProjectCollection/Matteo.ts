import { IProjectBlock, IProjectDetail } from '../../../interfaces';
const projectBlocks: IProjectBlock[] = [
	{
		key: 'description1',
		title: 'About project',
		body: [],
		images: [2],
		blockType: 'PL',
	},
	{
		key: 'description2',
		title: '',
		body: [
			'*“Connecting with other Bitcoiners is a great experience. Whether in real life or online, you can skip all formalities whenever you meet one. You can skip the social charade of talking about the weather. This journey through hyperbitcoinization that we’re all on is genuinely extraordinary.”* - **Knut Svanholm**',
		],
		blockType: 'PL',
	},
	{
		key: 'description3',
		title: 'How does the app work?',
		body: [
			'Based on your preferences and geolocation we match you with Bitcoiners in your area who we think would like to meet you. After visiting their profile you can send them a message request and wait for their approval. Once your request is approved you will be able to chat away like good old pals.',
		],
		images: [4],
		blockType: 'PL',
	},
	{
		key: 'description4',
		title: 'Discover',
		body: [
			'Traveling to a new city? Looking for a specific Bitcoiner? In the Discovery section, you will be able to search all kind of Bitcoiners.',
		],
		blockType: 'PL',
	},
	{
		key: 'description5',
		title: 'Events',
		body: [
			'Have you ever been at a Meetup or Conference and wished there was an easy & quick way to connect with the other attendees? We’re building it.',
		],
		blockType: 'PL',
	},
	{
		key: 'description6',
		title: 'Jobs',
		body: [
			'We need more Bitcoin companies and we need more people working toward the adoption of Bitcoin. So we’re also building a dedicated section of the app for employers to post job openings and for Bitcoiners to find their dream job. Think of Linkedin for Bitcoiners.',
		],
		blockType: 'PL',
	},
	{
		key: 'description7',
		title: 'Is this a Dating App?',
		body: [
			'Our mission is to connect as many Bitcoiners as possible. If you happen to find your soulmate here, go ahead and bring more Bitcoiners into the world. 🧡',
		],
		images: [0],
		blockType: 'PL',
	},
	{
		key: 'description8',
		title: 'The funds received from this crowdfunding will be used for:',
		body: [
			'- Part of App Development',
			'- Part of App Design & UI',
			'- Part of Backend Development',
		],
		blockType: 'PL',
	},
	{
		key: 'description9',
		title: 'Our pledge',
		body: [
			'1. we will never take VC money.',
			'2. we will never take advertiser money.',
			'3. we will never sell your data. ',
		],
		blockType: 'PL',
	},
	{
		key: 'description10',
		title: 'Roadmap',
		body: [
			'V1: Match & Chat (Q3 2022)',
			'V2: Discover (Q4 2022)',
			'V3: Events (Q1 2023)',
			'V4: Jobs (Q2 2023)',
		],
		blockType: 'PL',
	},
	{
		key: 'rewards',
		title: 'Rewards',
		body: [
			'- **Early access to the beta app** Price: $50 USD. Get access to the app before everyone else. ETA: June 2022.',
			'- **Forever Laura, forever.** Price: $100 USD. Lifetime access to our app.',
		],
		blockType: 'PL',
	},
	{
		key: 'aboutMe',
		title: 'About me',
		body: [],
		images: [3],
		blockType: 'PL',
	},
	{
		key: 'aboutMe',
		title: '',
		body: [
			'My name is Matteo Pellegrini and I’ve been building technology companies since I was 19. In 2016 I discovered Bitcoin and I’ve been going down the rabbit hole since, in 2021 (thanks to Bitcoin) I quit my fiat job and decided to dedicate the rest of my life to my family & Bitcoin. Orange Pill App is my first contribution to the Plebs.',
		],
		blockType: 'PL',
	},
];

const projectDetails: IProjectDetail = {
	problem: 'Bitcoin is much more than an investment, Bitcoin is a way of life. Bitcoiners share a lot of values and we all have been through the same journey, to meet a Bitcoiner is to meet an instant friend. Yet there’s no easy way for us to meet each other in real life.',
	idea: 'To solve this problem we’re building a mobile app where Bitcoiners can create a profile and use their smartphone geolocation to see who’s nearby.',
	ownerIntro: 'My name is Matteo Pellegrini and I’ve been building technology companies since I was 19. In 2016 I discovered Bitcoin and I’ve been going down the rabbit hole since, in 2021 (thanks to Bitcoin) I quit my fiat job and decided to dedicate the rest of my life to my family & Bitcoin. Orange Pill App is my first contribution to the Plebs.',
	blocks: projectBlocks,
};

const projectName: string = 'orange-pill';

export const Matteo = {projectBlocks, projectDetails, projectName};
