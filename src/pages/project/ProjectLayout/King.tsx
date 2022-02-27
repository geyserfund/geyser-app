import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	HStack,
	Image,
	Link,
	Text,
	VStack,
} from '@chakra-ui/react';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { Footer } from '../../../components/molecules';
import { Card, TwitterComponent } from '../../../components/ui';
import { kingProfileUrl } from '../../../constants';
import { IProjectBlock, IProjectDetail, IUser } from '../../../interfaces';
import { isMobileMode } from '../../../utils';
import { OwnerSponsorCard } from '../ProjectComponent';
import { DetailsBlock } from '../ProjectComponent/DetailsBlock';

type Labels = string

interface Istyles {
	isMobile?: boolean
}

const useStyles = createUseStyles<Labels, Istyles>({
	containers: {
		spacing: '5px',
		alignItems: 'flex-start',
		display: 'flex',
		width: '100%',
		'& img': {
			borderRadius: '5px',
		},
		'& a': {
			color: 'grey',
		},
	},
	texts: {
		TextAlign: 'justify',
	},
	readmore: {
		'&:hover': {
			textDecoration: 'underline',
			cursor: 'pointer',
		},
	},
	cardContainer: ({ isMobile }: Istyles) => ({
		borderRadius: '6px',
		padding: isMobile ? '12px 10px' : '12px 20px',
		border: '2px solid #E9E9E9',
		background: 'white',
		height: 'fit-content',
	}),
});

const owner: IUser = {
	picture: kingProfileUrl,
	username: 'ApataJ',
	fullName: 'Apata J',
	id: '',
	URL: '',
	twitter: false,
	badge: 'owner',
	amount: 0,
};

const ambassador: IUser = {
	picture: 'https://pbs.twimg.com/profile_images/1477647411963056128/7wd0aNSZ_400x400.jpg',
	username: 'parman_the',
	fullName: 'Parman Bitcoin Private Key Whisperer',
	id: '',
	URL: '',
	twitter: false,
	badge: 'owner',
	amount: 0,
};

const sponsors: IUser[] = [
	{
		picture: 'https://pbs.twimg.com/profile_images/1362672747399159818/QR9bbtrT_400x400.jpg',
		username: 'walletofsatoshi',
		fullName: 'walletofsatoshi',
		id: '',
		URL: '',
		twitter: false,
		badge: 'owner',
		amount: 0,
	},
	{
		picture: 'https://pbs.twimg.com/profile_images/1370765783765282823/dMGd0WEI_400x400.jpg',
		username: 'Bitnob_official',
		fullName: 'Bitnob_official',
		id: '',
		URL: '',
		twitter: false,
		badge: 'owner',
		amount: 0,
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
	title: 'The youths of Nigeria',
	body: [
		'Nigeria is a country with double digit inflation, and yet youths are not aware of the pitfalls and dangers that this poses to their economic welfare. All in all, Nigerian youths don’t know how to create and maintain wealth, and poverty is raging in the country.  A solution is then needed to improve youths’ awareness on how to maintain and grow their wealth, through a conversation of money and Bitcoin.',
		'Bitcoin and the Lightning network are the key. They can teach the youths on how to earn and transfer without fees, and save without the value of their assets being debased, thanks to Bitcoin. Inspired by what is happening in El Salvador, my belief is that Nigeria can be among one of the first adopters of Bitcoin as money and a currency of enlightenment in the world.',
		'To do that we need to spread the word of Bitcoin to those who have most to gain from it, and the most to lose should they not learn about it. The youths of Nigeria represent the future of this country, only with them can we move our country outside of the cycle of poverty that exists.',
	],
	blockType: 'PL',
},
{
	title: 'The Conference',
	body: [
		'I believe the best way to teach the youths about Bitcoin is through face-to-face human contact. Many youths may not be technically savvy and understanding Bitcoin can be a true challenge. Therefore, I believe the best way of teaching about Bitcoin is through a conference where youths can come together and learn about Bitcoin in a positive environment.',
		'I’d like to create the first “Lagos Bitcoin Conference 2022”. My aim is to gather 300 youths under one roof to discuss Bitcoin, Lightning, and financial literacy. I would also love international speakers to be available physically or via online meeting, to talk to us and enlighten us more on Bitcoin.',
	],
	images: [images[0].original],
	blockType: 'PL',
},
{
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
	title: 'Speakers include:',
	body: [
		'[Parman - 🇦🇲 Bitcoin Private Key Whisperer](https://twitter.com/parman_the/) will speak about financial literacy and money.',
	],
	blockType: 'UL',
},
{
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
	images: [images[5].original, images[6].original, images[7].original],
}];

const projectDetails: IProjectDetail = {
	problem: 'Financial illiteracy among the youth in Nigeria, a country ravaged by double-digit inflation.',
	solution: 'Teaching financial literacy to the youths of Nigeria with Bitcoin and lightning.',
	ownerIntro: 'I’m Apata Johnson. I’m a visionary, a dedicated entrepreneur, who loves technology. As a thinker, and someone who cherish technology I can say that Bitcoin is the next big thing, I have hope that with Bitcoin we change the way we view money in Nigeria and the world as a whole. And how, with Bitcoin, Nigeria will transform from an underdeveloped nation to a super developed nation. I’m just a freedom lover and I feel Nigeria needs bitcoin.',
	blocks: projectBlocks,
};

export const King = () => {
	const isMobile = isMobileMode();
	const classes = useStyles({ isMobile });

	return (
		<VStack alignItems="center" width="100%">
			<VStack spacing="20px" alignItems="left" marginTop="20px" paddingBottom="50px" maxWidth="780px">
				<OwnerSponsorCard owner={owner} ambassador={ambassador} sponsors={sponsors} ownerIntro={projectDetails.ownerIntro} />
				<DetailsBlock images={images} projectDetails={projectDetails} />
				<Card className={classes.cardContainer}>
					<Accordion allowMultiple>
						<AccordionItem border="none">
							<h2>
								<AccordionButton >
									<Box flex="1" textAlign="left">
										<Text fontSize="12px" color="brand.textGrey">PROJECT UPDATE #03</Text>
										<Text fontSize="10px" color="brand.textGrey">23 Feb 2022</Text>
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								<VStack spacing="12px" alignItems="flex-start" textAlign="justify">
									<Text fontSize="16px" fontWeight={500}>{'Conference date is set to 9 April: what\'s next?'}</Text>
									<Text>{'My friends and I have been working hard handing out the conference fliers and stickers and circulating them in the streets of Lagos. By talking to people on the streets, there seems to be much excitement about this conference: it\'s going to be bigger than I thought! God is helping us!'}</Text>
									<Text>{'What\'s next? Getting more communities in Lagos on-board, and doing proper planning of the conference agenda and setup.'}</Text>
									<Text>
										{'I\'m also getting a lot of ideas of the aftermath of the conference. I think we can move to other states. Since bitcoin education is best for people on the street. I can still organize street meet ups and educate them on bitcoin live.'}
									</Text>
									<Text>
										{'See the video of my good friend spreading the word about the conference!'}
									</Text>
									<Box display="flex" justifyContent="center" width="100%">
										<TwitterComponent id="1496460733697167371" />
									</Box>
								</VStack>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
				</Card>
				<Card className={classes.cardContainer}>
					<VStack marginBottom="10px">
						<Text alignSelf="flex-start" fontSize="10px" color="brand.textGrey">SPONSORS</Text>
						<HStack justifyContent="space-around" width={isMobile ? '100%' : '80%'}>
							<Link href="https://bitnob.com/" isExternal>
								<Image height="70px" src="https://storage.googleapis.com/geyser-projects-media/project/king/logo-black.png" />
							</Link>
							<Link href="https://walletofsatoshi.com" isExternal>
								<Image height="70px" src="https://storage.googleapis.com/geyser-projects-media/project/king/wallet-of-satoshi.png" />
							</Link>
						</HStack>
					</VStack>
				</Card>
			</VStack >
			<Footer />
		</VStack >
	);
};
