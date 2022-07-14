import { IProjectBlock, IProjectDetail, IProjectUpdate } from '../../../interfaces';
const projectBlocks: IProjectBlock[] = [{
	key: 'youth',
	title: 'The youths of Nigeria',
	body: [
		'Nigeria is a country with double digit inflation, and yet youths are not aware of the pitfalls and dangers that this poses to their economic welfare. All in all, Nigerian youths don’t know how to create and maintain wealth, and poverty is raging in the country.  A solution is then needed to improve youths’ awareness on how to maintain and grow their wealth, through a conversation of money and Bitcoin.',
		'Bitcoin and the Lightning network are the key. They can teach the youths on how to earn and transfer without fees, and save without the value of their assets being debased, thanks to Bitcoin. Inspired by what is happening in El Salvador, my belief is that Nigeria can be among one of the first adopters of Bitcoin as money and a currency of enlightenment in the world.',
		'To do that we need to spread the word of Bitcoin to those who have most to gain from it, and the most to lose should they not learn about it. The youths of Nigeria represent the future of this country, only with them can we move our country outside of the cycle of poverty that exists.',
	],
	blockType: 'PL',
},
{
	key: 'conference',
	title: 'The Conference',
	body: [
		'I believe the best way to teach the youths about Bitcoin is through face-to-face human contact. Many youths may not be technically savvy and understanding Bitcoin can be a true challenge. Therefore, I believe the best way of teaching about Bitcoin is through a conference where youths can come together and learn about Bitcoin in a positive environment.',
		'I’d like to create the first “Lagos Bitcoin Conference 2022”. My aim is to gather 300 youths under one roof to discuss Bitcoin, Lightning, and financial literacy. I would also love international speakers to be available physically or via online meeting, to talk to us and enlighten us more on Bitcoin.',
	],
	images: [0],
	blockType: 'PL',
},
{
	key: 'agenda1',
	title: 'The agenda:',
	body: [
		'Bitcoin can act as a shield against the increasing inflation in Nigeria due to bad economy and government.',
		'How Bitcoin can act as both savings and investment',
		'How Bitcoin can break international transfers/ transactions',
		'How Bitcoin can create opportunities in Nigeria in this technology advancement age',
		'Bitcoin lightning in practice',
		'How Nigerian youths can adapt the El Salvador Bitcoin system',
	],
	blockType: 'OL',
},
{
	key: 'agenda2',
	title: 'The agenda:',
	body: [
		'Bitcoin can act as a shield against the increasing inflation in Nigeria due to bad economy and government.',
		'How Bitcoin can act as both savings and investment',
		'How Bitcoin can break international transfers/ transactions',
		'How Bitcoin can create opportunities in Nigeria in this technology advancement age',
		'Bitcoin lightning in practice',
		'How Nigerian youths can adapt the El Salvador Bitcoin system',
	],
	blockType: 'OL',
},
{
	key: 'speakers',
	title: 'Speakers include:',
	body: [
		'[Parman - 🇦🇲 Bitcoin Private Key Whisperer](https://twitter.com/parman_the/) will speak about financial literacy and money.',
		'[Paco de la India](https://twitter.com/RunwithBitcoin) will speak about his experience travelling the world with Bitcoin.',
		'[King ⚡ Johnson Apata🦁👑](https://twitter.com/ApataJ) will speak about what is good money and why #bitcoin matters.',
		'[Kieran Nolan](https://twitter.com/KieranDNolan) will talk about #bitcoin education.',
	],
	blockType: 'UL',
},
{
	key: 'usage',
	title: 'The funds received for this crowdfund will be used for:',
	body: [
		'Booking an event hall (Isheri Ijegun Lagos)',
		'Creating and distributing flyers to youths',
		'Giveaway of Satoshis',
		'Live video coverage of the events',
		'Conference projectors',
		'Snacks and transportation for speakers to join conference',
	],
	blockType: 'UL',
	images: [1, 2, 3],
},
{
	key: 'aboutMe',
	title: 'Who am I?',
	body: [
		'I’m Apata Johnson. I’m a visionary, a dedicated entrepreneur, who loves technology. As a thinker, and someone who cherish technology I can say that Bitcoin is the next big thing, I have hope that with Bitcoin we change the way we view money in Nigeria and the world as a whole. And how, with Bitcoin, Nigeria will transform from an underdeveloped nation to a super developed nation. I’m just a freedom lover and I feel Nigeria needs bitcoin.',
		'I created Luminus Exchange to help educate Nigerians about Bitcoin. Read more about me and my work here: [About Bitcoin](https://drive.google.com/file/d/1IK80L-hNlh0RpSJCWQQFu3jG9r2W2U1C/view)',
	],
	blockType: 'PL',
	images: [4],
}];

const projectUpdates: IProjectUpdate[] = [
	{
		updateTitle: 'PROJECT UPDATE #01',
		date: new Date('2022-02-13').getTime(),
		tweet: '1486515536657747969',
		type: 'PL',
	},
	{
		updateTitle: 'PROJECT UPDATE #02',
		date: new Date('2022-02-14').getTime(),
		bodyTitle: 'LAGOS BITCOIN CONFERENCE UPDATE',
		body: [
			'The conference is about tackling a major problem among the youths in Nigeria and Africa as a whole. The aim is to teach youths financial literacy with help of bitcoin and lightning, and taking back their freedom from the system. The aim is also educating the youths to be active and advanced in this information and technology age so we can move from an underdeveloped country to a super developed country.',
			'So, how is the conference planning going? We have 3 major updates:',
			'- We have started with the distribution of flyers, hand bills and stickers about the conference.	\n- The conference date has been set for the event which will be held on Saturday April 9th\n- Bitnob has decided to sponsor the conference hall in Ikeja city in Lagos, with the capacity to hold 300 youths',
			'Photos and videos of the progress will be out soon!',
			'I believe with this conference, there would be a positive revolution that will transform my country for the better if not best. Live coverage of the event will be available on YouTube for lovers of bitcoin around the world to see the rise of youths learning to move the country in the right direction with sound money.',
		],
		images: [5, 6, 7],
		type: 'PL',
	},
	{
		updateTitle: 'PROJECT UPDATE #03',
		date: new Date('2022-02-23').getTime(),
		bodyTitle: 'Conference date is set to 9 April: what\'s next?',
		body: [
			'My friends and I have been working hard handing out the conference fliers and stickers and circulating them in the streets of Lagos. By talking to people on the streets, there seems to be much excitement about this conference: it\'s going to be bigger than I thought! God is helping us!',
			'I\'m also getting a lot of ideas of the aftermath of the conference. I think we can move to other states. Since bitcoin education is best for people on the street. I can still organize street meet ups and educate them on bitcoin live.',
			'See the video of my good friend spreading the word about the conference!',
		],
		tweet: '1496460733697167371',
		type: 'PL',
	},
];

const projectDetails: IProjectDetail = {
	problem: 'Financial illiteracy among the youth in Nigeria, a country ravaged by double-digit inflation.',
	idea: 'Teaching financial literacy to the youths of Nigeria with Bitcoin and lightning.',
	ownerIntro: 'I’m Apata Johnson. I’m a visionary, a dedicated entrepreneur, who loves technology. As a thinker, and someone who cherish technology I can say that Bitcoin is the next big thing, I have hope that with Bitcoin we change the way we view money in Nigeria and the world as a whole. And how, with Bitcoin, Nigeria will transform from an underdeveloped nation to a super developed nation. I’m just a freedom lover and I feel Nigeria needs bitcoin.',
	blocks: projectBlocks,
};

const projectName: string = 'bitcoinconferenceinlagos';

export const King = {projectBlocks, projectDetails, projectName, projectUpdates};
