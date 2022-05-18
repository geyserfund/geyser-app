import { IProjectBlock, IProjectDetail } from '../../../interfaces';

const projectBlocks: IProjectBlock[] = [
	{
		key: 'podcast',
		title: '',
		body: [],
		podcast: 'https://soundcloud.com/user-44010708/the-geyser-podcast-002?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
		blockType: 'PL',
	},
	{
		key: 'problem',
		title: 'The problem',
		body: [
			'Bitcoin is hard to understand. For the uninitiated, learning about Bitcoin is full of complicated new terms and a seemingly intangible digital asset. To fully grasp Bitcoin, one must become a student of numerous disciplines such as economics, cryptography, philosophy, finance, and technology. Getting people to not only recognize the value of Bitcoin and its importance, but also to comprehend how the Bitcoin network functions is a difficult task.',
		],
		blockType: 'PL',
	},
	{
		key: 'idea',
		title: 'The idea',
		body: [
			'The Bitcoin Game started as an educational activity to explain Bitcoin in a simple, easy-to-understand, and hands-on way. As a life-long educator, I knew that teaching Bitcoin to precoiners needed to be broken down into a tactile activity that abstracted the technological complexities away in favor of terms anyone can understand. I did this educational activity with meetup groups, family members, and children as young as 5. Each time afterwards, I received feedback that the participants finally had a basic understanding of how Bitcoin works. I wanted to spread this activity to as many people as possible and realized it would be best done as a game. The Bitcoin Game is what evolved from that activity.',
			'The original activity has gone through many adaptations to become what you are helping launch today. It is quite different from the lesson I created at first, but the end result is still the same: players will learn about the complexities of Bitcoin in a simple, easy-to-understand, and intuitive way. Some of the concepts include: mining (hashing/target), block reward, halving, difficulty adjustments, mining pools, the importance of running a node and owning a hardware wallet/signing device, bitcoin gaining value over time, and more! There’s even some Bitcoin memes in there for fun. I can guarantee the educational goal is accomplished and my hope is for the secondary goal to be too: players having fun learning about the Bitcoin Network, invest bitcoin as wisely as possible, and lower their time preference by strategizing to create a better world in the future.',
		],
		images: [0],
		blockType: 'PL',
	},
	{
		key: 'includes',
		title: 'The Bitcoin Game includes',
		body: [
			'- Full-sized game board',
			'- Deck of Action Cards',
			'- 6 Satoshi Nakamoto characters',
			'- Bitcoin tokens',
			'- 1 standard die',
			'- 18 ASIC miner dice',
			'- Rule book with glossary and additional resources',
		],
		images: [3],
		blockType: 'PL',
	},
	{
		key: 'rewards',
		title: 'Rewards',
		body: [
			'- **Board Game ($60)**: get the full, 1st edition of The Bitcoin Game.',
			'- **Board Game + Gratitude Listing ($300)**: get the full board game and get your name listed in the rulebook.',
			'- **Board Game + Gratitude Listing + Poster ($500)**: get 2 copies of the board game, your name listed in the rule book, and a limited edition bitcoin-themed original poster.',
			'Thank you for supporting this project. I look forward to playing this game with you!',
		],
		images: [14],
		blockType: 'PL',
	},
	{
		key: 'aboutMe',
		title: 'About me',
		body: [
			'I am former elementary school teacher and administrator. I taught children ranging from 3 to 9 years old. I have been involved in Bitcoin since 2017 and made the decision to transition my career into Bitcoin full time after the 2020/21 school year. Since then, I have been finding ways to contribute to Bitcoin. I started a local meetup, led intro Bitcoin classes, spun up some full nodes, began mining at home, joined telegram communities, started tweeting on Bitcoin Twitter after years of lurking, and wrote op-eds for Bitcoin Magazine. I have recently joined Bitcoin Magazine as Junior Editor.',
		],
		blockType: 'PL',
	},
];

const projectDetails: IProjectDetail = {
	problem: '',
	idea: 'The ultimate Bitcoin board game that makes learning about Bitcoin fun and accessible to anyone.',
	ownerIntro: 'I’m a Junior Editor at Bitcoin Magazine with a passion for Bitcoin Education.',
	blocks: projectBlocks,
};

const projectName: string = 'the-bitcoin-game';

export const Craig = {projectBlocks, projectDetails, projectName};
