import {
	VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Footer } from '../../../components/molecules';
import { kingProfileUrl } from '../../../constants';
import { IProjectBlock, IProjectDetail, IProjectSponsor, IProjectUpdate, IUser } from '../../../interfaces';
import { OwnerSponsorCard, DetailsBlock, SponsorBlock, UpdatesBlock } from '../ProjectComponent';

const owner: IUser = {
	imageUrl: kingProfileUrl,
	twitterHandle: 'ApataJ',
	username: 'ApataJ',
	fullName: 'Apata J',
	id: '',
	URL: '',
	twitter: false,
	badge: 'owner',
	amount: 0,
};

const ambassadors: IUser[] = [{
	imageUrl: 'https://pbs.twimg.com/profile_images/1477647411963056128/7wd0aNSZ_400x400.jpg',
	username: 'parman_the',
	twitterHandle: 'parman_the',
	fullName: 'Parman Bitcoin Private Key Whisperer',
	id: '',
	URL: '',
	twitter: false,
	badge: 'owner',
	amount: 0,
}];

const sponsors: IProjectSponsor[] = [
	{
		user: {
			imageUrl: 'https://pbs.twimg.com/profile_images/1362672747399159818/QR9bbtrT_400x400.jpg',
			username: 'walletofsatoshi',
			twitterHandle: 'walletofsatoshi',
			fullName: 'walletofsatoshi',
			id: '',
			URL: '',
			twitter: false,
			badge: 'owner',
			amount: 0,
		},
		image: 'https://storage.googleapis.com/geyser-projects-media/project/king/wallet-of-satoshi.png',
		companyUrl: 'https://walletofsatoshi.com',

	},
];

// Interface Ispeaker {
// 	name: string;
// 	twitterHandle: string
// 	description?: string
// }

// Const speakers: Ispeaker[] = [
// 	{
// 		name: 'Parman - 🇦🇲 Bitcoin Private Key Whisperer',
// 		twitterHandle: 'parman_the',
// 		description: 'will speak about financial literacy and money.',
// 	},
// 	{
// 		name: 'Paco de la India',
// 		twitterHandle: 'RunwithBitcoin',
// 		description: 'will speak about his experience travelling the world with Bitcoin.',
// 	},
// 	{
// 		name: 'King ⚡ Johnson Apata🦁👑',
// 		twitterHandle: 'ApataJ',
// 		description: 'will speak about what is good money and why #bitcoin matters.',
// 	},
// 	{
// 		name: 'Kieran Nolan',
// 		twitterHandle: 'KieranDNolan',
// 		description: 'will talk about #bitcoin education.',
// 	},
// ];

const images = [
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/king/king_7.png',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/king/king_7.png',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/king/king_3.png',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/king/king_3.png',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/king/king_4.png',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/king/king_4.png',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/king/king_5.png',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/king/king_5.png',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/king/king_6.png',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/king/king_6.png',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/king/king_update1.png',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/king/king_update1.png',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/king/king_update2.jpeg',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/king/king_update2.jpeg',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/king/king_update3.png',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/king/king_update3.png',
	},
];

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
	images: [images[0].original],
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
	images: [images[1].original, images[2].original, images[3].original],
},
{
	key: 'aboutMe',
	title: 'Who am I?',
	body: [
		'I’m Apata Johnson. I’m a visionary, a dedicated entrepreneur, who loves technology. As a thinker, and someone who cherish technology I can say that Bitcoin is the next big thing, I have hope that with Bitcoin we change the way we view money in Nigeria and the world as a whole. And how, with Bitcoin, Nigeria will transform from an underdeveloped nation to a super developed nation. I’m just a freedom lover and I feel Nigeria needs bitcoin.',
		'I created Luminus Exchange to help educate Nigerians about Bitcoin. Read more about me and my work here: [About Bitcoin](https://drive.google.com/file/d/1IK80L-hNlh0RpSJCWQQFu3jG9r2W2U1C/view)',
	],
	blockType: 'PL',
	images: [images[4].original],
}];

const projectUpdates: IProjectUpdate[] = [
	{
		updateTitle: 'PROJECT UPDATE #01',
		date: new Date('2022-02-13').getMilliseconds(),
		tweet: '1486515536657747969',
		type: 'PL',
	},
	{
		updateTitle: 'PROJECT UPDATE #02',
		date: new Date('2022-02-14').getMilliseconds(),
		bodyTitle: 'LAGOS BITCOIN CONFERENCE UPDATE',
		body: [
			'The conference is about tackling a major problem among the youths in Nigeria and Africa as a whole. The aim is to teach youths financial literacy with help of bitcoin and lightning, and taking back their freedom from the system. The aim is also educating the youths to be active and advanced in this information and technology age so we can move from an underdeveloped country to a super developed country.',
			'So, how is the conference planning going? We have 3 major updates:',
			'- We have started with the distribution of flyers, hand bills and stickers about the conference.	\n- The conference date has been set for the event which will be held on Saturday April 9th\n- Bitnob has decided to sponsor the conference hall in Ikeja city in Lagos, with the capacity to hold 300 youths',
			'Photos and videos of the progress will be out soon!',
			'I believe with this conference, there would be a positive revolution that will transform my country for the better if not best. Live coverage of the event will be available on YouTube for lovers of bitcoin around the world to see the rise of youths learning to move the country in the right direction with sound money.',
		],
		images: [images[5].original, images[6].original, images[7].original],
		type: 'PL',
	},
	{
		updateTitle: 'PROJECT UPDATE #03',
		date: new Date('2022-02-23').getMilliseconds(),
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

export const King = () => {
	const renderUpdates = () => {
		if (projectUpdates && projectUpdates.length > 0) {
			return projectUpdates.map((update: IProjectUpdate) => <UpdatesBlock key={update.updateTitle} projectUpdate={update}/>,
			);
		}
	};

	return (
		<VStack alignItems="center" width="100%">
			<VStack spacing="20px" alignItems="left" marginTop="20px" paddingBottom="50px" maxWidth="780px">
				<OwnerSponsorCard
					images={images}
					owner={owner}
					ambassadors={ambassadors}
					sponsors={sponsors}
					ownerIntro={projectDetails.ownerIntro}
					problem={projectDetails.problem}
					idea={projectDetails.idea}
				/>
				<DetailsBlock projectDetails={projectDetails} />
				{ renderUpdates() }
				<SponsorBlock sponsors={sponsors}/>
			</VStack >
			<Footer />
		</VStack >
	);
};
