import {
	VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Footer } from '../../../components/molecules';
import { craigProfileUrl } from '../../../constants';
import { IProjectBlock, IProjectDetail, IProjectSponsor, IProjectUpdate, IUser } from '../../../interfaces';
import { OwnerSponsorCard, DetailsBlock, SponsorBlock, UpdatesBlock } from '../ProjectComponent';

const owner: IUser = {
	imageUrl: craigProfileUrl,
	twitterHandle: 'Bitcoin_phan',
	username: 'Bitcoin_phan',
	fullName: 'Craig Deutsch',
	id: '',
	URL: '',
	twitter: false,
	badge: 'owner',
	amount: 0,
};

// {
// 	imageUrl: 'https://pbs.twimg.com/profile_images/1477647411963056128/7wd0aNSZ_400x400.jpg',
// 	username: 'parman_the',
// 	twitterHandle: 'parman_the',
// 	fullName: 'Parman Bitcoin Private Key Whisperer',
// 	id: '',
// 	URL: '',
// 	twitter: false,
// 	badge: 'owner',
// 	amount: 0,
// }
const ambassadors: IUser[] = [];

const sponsors: IProjectSponsor[] = [
	{
		user: {
			imageUrl: 'https://pbs.twimg.com/profile_images/1502383024675037184/2pq5jdTM_400x400.jpg',
			username: 'CryptoCloaks',
			twitterHandle: 'CryptoCloaks',
			fullName: 'CryptoCloaks',
			id: '',
			URL: '',
			twitter: false,
			badge: 'owner',
			amount: 0,
		},
		image: 'https://pbs.twimg.com/profile_images/1502383024675037184/2pq5jdTM_400x400.jpg',
		companyUrl: 'https://www.cryptocloaks.com',

	},
];

const images = [
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/craig/first_image.jpeg',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/craig/first_image.jpeg',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_10.jpg',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_10.jpg',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_1.jpg',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_1.jpg',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_5.jpg',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_5.jpg',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_6.jpg',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_6.jpg',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_4.jpg',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_4.jpg',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_2.jpg',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_2.jpg',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_3.jpg',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_3.jpg',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_7.jpg',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_7.jpg',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_8.jpg',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_8.jpg',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_9.jpg',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_9.jpg',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_11.jpg',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_11.jpg',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_12.jpg',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_12.jpg',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_13.jpg',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_13.jpg',
	},
	{
		original: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_15.jpg',
		thumbnail: 'https://storage.googleapis.com/geyser-projects-media/project/craig/craig_15.jpg',
	},
];

const projectBlocks: IProjectBlock[] = [{
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
	images: [images[1].original],
	blockType: 'PL',
},
{
	key: 'rewards',
	title: 'Rewards',
	body: [
		'- **Board Game ($60)**: get the full, 1st edition of The Bitcoin Game.',
		'- **Board Game + Gratitude Listing ($300)**: get the full board game and get your name listed in the rulebook.',
		'- **Board Game + Gratitude Listing + Poster ($500)**: get 2 copies of the board game, your name listed in the rule book, and a limited edition bitcoin-themed original poster.',
		'\nThe Bitcoin Game includes:\n',
		'- Full-sized game board',
		'- Deck of Action Cards',
		'- 6 Satoshi Nakamoto characters',
		'- Bitcoin tokens',
		'- 1 standard die',
		'- 18 ASIC miner dice',
		'- Rule book with glossary and additional resources',
		'Thank you for supporting this project. I look forward to playing this game with you!',
	],
	images: [images[14].original],
	blockType: 'PL',
},
{
	key: 'aboutMe',
	title: 'About me',
	body: [
		'I am former elementary school teacher and administrator. I taught children ranging from 3 to 9 years old. I have been involved in Bitcoin since 2017 and made the decision to transition my career into Bitcoin full time after the 2020/21 school year. Since then, I have been finding ways to contribute to Bitcoin. I started a local meetup, led intro Bitcoin classes, spun up some full nodes, began mining at home, joined telegram communities, started tweeting on Bitcoin Twitter after years of lurking, and wrote op-eds for Bitcoin Magazine. I have recently joined Bitcoin Magazine as Junior Editor.',
	],
	blockType: 'PL',
}];

const projectUpdates: IProjectUpdate[] = [];

const projectDetails: IProjectDetail = {
	problem: 'There are very few ways to make learning Bitcoin fun and engaging.',
	idea: 'The ultimate Bitcoin board game that makes learning about Bitcoin accessible and fun for the whole family.',
	ownerIntro: 'I’m a Junior Editor at Bitcoin Magazine with a passion for Bitcoin Education.',
	blocks: projectBlocks,
};

export const Craig = () => {
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
