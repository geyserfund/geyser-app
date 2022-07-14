import { IProjectBlock, IProjectDetail } from '../../../interfaces';
const projectBlocks: IProjectBlock[] = [
	{
		key: 'podcast',
		title: '',
		body: [],
		podcast: 'https://soundcloud.com/user-44010708/bitcoin-for-freedom-003',
		blockType: 'PL',
	},
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
			'Bitcoin For Fairness is a non-profit initiative raising awareness and understanding of Bitcoin for people in emerging countries and for disadvantaged communities. We connect and boost the profile of local stakeholders, identify and work with educators on the ground to expand Bitcoin adoption locally and Bitcoin awareness globally.', 'Bitcoin brings economic empowerment for billions worldwide who have been excluded from our current money system because of financial repression or authoritarian leadership in their countries. Bitcoin is an excellent long-term store of value and a means of exchanging value that leads to emancipation from financial hierarchy regardless of race, gender, wealth and status. It enables open and permissionless access to a global monetary network that can’t be bent to favor politically powerful or privileged groups.', 'BFF’s goal is to bring Bitcoin to billions of people one community at a time through sharing knowledge and building bridges between emerging countries and the global economy.',
		],
		youtube: 'zAvA3iUbpdA',
		blockType: 'PL',
	},
	{
		key: 'description3',
		title: 'How are we going to achieve this',
		body: [
			'- **Working with educators on the ground**', 'Talks and hands-on workshops: show wallet installation, key management, how to earn, save, spend and cash-out bitcoin to buy daily goods. Basic financial education and Bitcoin understanding. The idea is to educate the educators on the ground so that they can take it from there and share the knowledge with their peers.',
		],
		images: [3],
		blockType: 'PL',
	},
	{
		key: 'description4',
		title: '',
		body: [
			'- **Spreading the word**', 'Travelling to Africa and Latin America. Visited Zimbabwe and Zambia in March, South Africa in May, will return to Zimbabwe in June, October Brazil, Argentina November, Ghana and Nigeria in December 2022. Speaking at several conferences throughout the year including the Oslo Freedom Forum at the end of May and the first African Bitcoin only conference in Ghana in December 2022 . Doing interviews with radio stations, print media and podcasts.',
		],
		images: [4, 5],
		blockType: 'PL',
	},
	{
		key: 'description5',
		title: '',
		body: [
			'- **Building connections**', 'Setting up local Bitcoin-only meetups and messaging groups and strengthening existing communities by supporting infrastructure setup (Bitcoin and Lightning node devices), which connects them to the global Bitcoin network. Creating Bitcoiner jobs worldwide - people working with BFF, writing articles, editing video clips etc. are paid in bitcoin.',
		],
		images: [1],
		blockType: 'PL',
	},
	{
		key: 'rewards',
		title: 'Rewards',
		body: [
			'- **Be part of the BFF Community** Price: $10 USD. Access to a monthly community call with hands-on information from the ground with Anita Posch and BFF participants.',
		],
		blockType: 'PL',
	},
	{
		key: 'aboutMe1',
		title: 'About me',
		body: [],
		images: [0],
		blockType: 'PL',
	},
	{
		key: 'aboutMe2',
		title: '',
		body: [
			'Anita Posch is a Bitcoin advocate, author of (L)earn Bitcoin, host of the Anita Posch show and Founder of Bitcoin For Fairness.', 'Before she started her educational Bitcoin work in 2017, Anita gained over 20 years of experience in web development, e-commerce, and online business. Disillusioned by the centralized nature of the internet, consumerism and surveillance capitalism she spent 2016 in Berlin on a mission to make a change.', 'In early 2017 she attended a talk about Bitcoin and open blockchain technology and the positive impact it will have on society. She realized that a technology which is permissionless, inflation-proof and a global internet money could free billions of people, disenfranchised by current financial power dynamics. Bitcoin is unstoppable money that can be used by anyone regardless of who they are. The rules are the same for everyone. It’s neutral, not controlled by any company or government, while at the same time being an internet protocol, financial rails that is built for a common good.', 'Anita’s goal is to bring Bitcoin to billions through her educational work. She has developed a Bitcoin podcast, a YouTube channel and wrote the book (L)earn Bitcoin which will be translated into a variety of languages. She has also interviewed people from all around the world including some from developing countries like Nigeria, South Africa, Zambia, Zimbabwe, Venezuela, and Afghanistan about the effects of Bitcoin on people’s freedom.', 'In early 2020 she was the first Bitcoiner to visit Zimbabwe to research the country’s monetary situation as well as the adoption rate of Bitcoin and to report on the results in her podcast. The goal was, through interviews, to build a bridge between people who live under flawed democracies or authoritarian regimes to the rest of the world and to show how Bitcoin could improve their living conditions and financial freedom.', 'Bitcoin is money from the people, for the people. Its mathematical rules can’t be corrupted - neither by governments nor by billionaires. This guarantees a level of fairness which cannot be achieved in traditional human driven systems. It gives underprivileged individuals, such as people from developing nations, women, and oppressed minority groups, the chance to participate globally in a free and private manner with each other. This freedom to exchange value, unleashing people’s creativity and innovation, is what drives Anita Posch.',
		],
		blockType: 'PL',
	},
];

const projectDetails: IProjectDetail = {
	problem: 'Lack of education and extreme mistrust of Bitcoin with people in emerging countries.',
	idea: 'Creating connections, supporting the growth of Bitcoin communities on the ground and creating content that closes important knowledge gaps about bitcoin for people in emerging countries.',
	ownerIntro: 'Anita Posch is a Bitcoin advocate, author of (L)earn Bitcoin, host of the Anita Posch show and Founder of Bitcoin For Fairness.',
	blocks: projectBlocks,
};

const projectName: string = 'bitcoinforfairness';

export const Anita = {projectBlocks, projectDetails, projectName};
