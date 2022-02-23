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
	ListItem,
	OrderedList,
	Text,
	UnorderedList,
	VStack,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import TweetEmbed from 'react-tweet-embed';
import { Footer } from '../../../components/molecules';
import { Card, ImageBar, StatusBar } from '../../../components/ui';
import Loader from '../../../components/ui/Loader';
import { kingProfileUrl } from '../../../constants';
import { IUser } from '../../../interfaces';
import { isMobileMode } from '../../../utils';
import { OwnerSponsorCard } from '../ProjectComponent';

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
	twitter: {
		maxWidth: 450,
		display: 'block',
		width: '100%',
		'.twitter-widget-0': {
			width: '200px !important',
		},
	},
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

interface Ispeaker {
	name: string;
	twitterHandle: string
	description?: string
}

const speakers: Ispeaker[] = [
	{
		name: 'Parman - 🇦🇲 Bitcoin Private Key Whisperer',
		twitterHandle: 'parman_the',
		description: 'will speak about financial literacy and money.',
	},
	{
		name: 'Paco de la India',
		twitterHandle: 'RunwithBitcoin',
		description: 'will speak about his experience travelling the world with Bitcoin.',
	},
	{
		name: 'King ⚡ Johnson Apata🦁👑',
		twitterHandle: 'ApataJ',
		description: 'will speak about what is good money and why #bitcoin matters.',
	},
	{
		name: 'Kieran Nolan',
		twitterHandle: 'KieranDNolan',
		description: 'will talk about #bitcoin education.',
	},
];

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

export const King = () => {
	const isMobile = isMobileMode();
	const classes = useStyles({ isMobile });
	const ownerRef: any = useRef(null);

	const [twitterLoading, setTwitterLoading] = useState(true);
	const [imageIndex, setImageIndex] = useState(0);

	// Const handleScroll = () => {
	// 	if (ownerRef && ownerRef.current) {
	// 		const scrollElement = document.getElementById('project-scoll-container');
	// 		if (scrollElement) {
	// 			const scrollValue = ownerRef.current.offsetTop - scrollElement.offsetTop;
	// 			scrollElement?.scrollTo({ top: scrollValue, behavior: 'smooth' });
	// 		}
	// 	}
	// };

	const ownerIntro = 'I’m Apata Johnson. I’m a visionary, a dedicated entrepreneur, who loves technology. As a thinker, and someone who cherish technology I can say that Bitcoin is the next big thing, I have hope that with Bitcoin we change the way we view money in Nigeria and the world as a whole. And how, with Bitcoin, Nigeria will transform from an underdeveloped nation to a super developed nation. I’m just a freedom lover and I feel Nigeria needs bitcoin.';
	return (
		<VStack alignItems="center" width="100%">
			<VStack spacing="20px" alignItems="left" marginTop="20px" paddingBottom="50px" maxWidth="780px">
				<OwnerSponsorCard owner={owner} ambassador={ambassador} sponsors={sponsors} ownerIntro={ownerIntro} />
				<Card className={classes.cardContainer}>
					<VStack className={classes.containers} spacing="20px">
						<VStack spacing="10px">
							<StatusBar variant="problem" message="Financial illiteracy among the youth in Nigeria, a country ravaged by double-digit inflation." />
							<StatusBar variant="solution" message="Teaching financial literacy to the youths of Nigeria with Bitcoin and lightning." />
							<ImageBar images={images} imageIndex={imageIndex}/>
						</VStack>
						<VStack className={classes.containers} >
							<Text fontWeight={600} fontSize={'1.25em'}>
								The youths of Nigeria
							</Text>
							<Text className={classes.texts}>
								Nigeria is a country with double digit inflation, and yet youths are not aware of the pitfalls and dangers that this poses to their economic welfare. All in all, Nigerian youths don’t know how to create and maintain wealth, and poverty is raging in the country.  A solution is then needed to improve youths’ awareness on how to maintain and grow their wealth, through a conversation of money and Bitcoin.
							</Text>
							<Text className={classes.texts}>
								Bitcoin and the Lightning network are the key. They can teach the youths on how to earn and transfer without fees, and save without the value of their assets being debased, thanks to Bitcoin. Inspired by what is happening in El Salvador, my belief is that Nigeria can be among one of the first adopters of Bitcoin as money and a currency of enlightenment in the world.
							</Text>
							<Text className={classes.texts}>
								To do that we need to spread the word of Bitcoin to those who have most to gain from it, and the most to lose should they not learn about it. The youths of Nigeria represent the future of this country, only with them can we move our country outside of the cycle of poverty that exists.
							</Text>
						</VStack>
						<VStack className={classes.containers} >
							<Text fontWeight={600} fontSize={'1.25em'}>
								The Conference
							</Text>
							<Text className={classes.texts}>
								I believe the best way to teach the youths about Bitcoin is through face-to-face human contact. Many youths may not be technically savvy and understanding Bitcoin can be a true challenge. Therefore, I believe the best way of teaching about Bitcoin is through a conference where youths can come together and learn about Bitcoin in a positive environment.
							</Text>
							<Text className={classes.texts}>
								I’d like to create the first “Lagos Bitcoin Conference 2022”. My aim is to gather 300 youths under one roof to discuss Bitcoin, Lightning, and financial literacy. I would also love international speakers to be available physically or via online meeting, to talk to us and enlighten us more on Bitcoin.
							</Text>
						</VStack>
						<HStack spacing="30px">
							<Box onClick={() => setImageIndex(0)}>
								<Image src={images[0].original} />
							</Box>
						</HStack>
						<VStack className={classes.containers} >
							<Text fontWeight={600} fontSize="16px">
								The agenda:
							</Text>
							<OrderedList paddingLeft="18px">
								<ListItem>Bitcoin can act as a shield against the increasing inflation in Nigeria due to bad economy and government.</ListItem>
								<ListItem>How Bitcoin can act as both savings and investment</ListItem>
								<ListItem>How Bitcoin can break international transfers/ transactions</ListItem>
								<ListItem>How Bitcoin can create opportunities in Nigeria in this technology advancement age</ListItem>
								<ListItem>Bitcoin lightning in practice</ListItem>
								<ListItem>How Nigerian youths can adapt the El Salvador Bitcoin system</ListItem>
							</OrderedList>
						</VStack>
						<VStack className={classes.containers} >
							<Text fontWeight={600} fontSize={'16px'}>
								Speakers include:
							</Text>
							<UnorderedList paddingLeft="18px" width="100%">
								{
									speakers.map(speaker => (
										<ListItem key={speaker.twitterHandle} display="block">
											<Link href={`https://twitter.com/${speaker.twitterHandle}`} isExternal>
												{`${speaker.name} `}
											</Link>
											<Text display="inline-block">
												{speaker.description}
											</Text>
										</ListItem>
									))
								}
							</UnorderedList>
						</VStack>
						<VStack className={classes.containers} >
							<Text fontWeight={600} fontSize={'16px'}>
								The funds received for this crowdfund will be used for:
							</Text>
							<UnorderedList paddingLeft="18px" >
								<ListItem>Booking an event hall (Isheri Ijegun Lagos)</ListItem>
								<ListItem>Creating and distributing flyers to youths</ListItem>
								<ListItem>Giveaway of Satoshis</ListItem>
								<ListItem>Live video coverage of the events</ListItem>
								<ListItem>Conference projectors</ListItem>
								<ListItem>Snacks and transportation for speakers to join conference</ListItem>
							</UnorderedList>
						</VStack>
						<HStack spacing="30px" overflowX="auto">
							<Box onClick={() => setImageIndex(1)}>
								<Image src={images[1].original} />
							</Box>
							<Box onClick={() => setImageIndex(2)}>
								<Image src={images[2].original} />
							</Box>
							<Box onClick={() => setImageIndex(3)}>
								<Image src={images[3].original} />
							</Box>
						</HStack>
						<VStack className={classes.containers} ref={ownerRef}>
							<Text fontWeight={600} fontSize={'1.25em'}>
								Who am I?
							</Text>
							<Text className={classes.texts}>
								I’m Apata Johnson. I’m a visionary, a dedicated entrepreneur, who loves technology. As a thinker, and someone who cherish technology I can say that Bitcoin is the next big thing, I have hope that with Bitcoin we change the way we view money in Nigeria and the world as a whole. And how, with Bitcoin, Nigeria will transform from an underdeveloped nation to a super developed nation. I’m just a freedom lover and I feel Nigeria needs bitcoin.
							</Text>
							<Text className={classes.texts}>
								I created Luminus Exchange to help educate Nigerians about Bitcoin. Read more about me and my work here:
								<Link href="https://drive.google.com/file/d/1IK80L-hNlh0RpSJCWQQFu3jG9r2W2U1C/view" isExternal>
									{' About Bitcoin'}
								</Link>
							</Text>
						</VStack>
						<VStack className={classes.containers}>
							<Box minWidth="280px" maxWidth={'400px'} onClick={() => setImageIndex(4)}>
								<Image src={images[4].original} />
							</Box>
						</VStack>
					</VStack>
				</Card>
				<Card className={classes.cardContainer}>
					<Accordion allowMultiple>
						<AccordionItem border="none">
							<h2>
								<AccordionButton >
									<Box flex="1" textAlign="left">
										<Text fontSize="12px" color="brand.textGrey">PROJECT UPDATE #01</Text>
										<Text fontSize="10px" color="brand.textGrey">13 Feb 2022</Text>
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel pb={4} display="flex" flexDirection="column" alignItems="center" width="100%">
								{
									twitterLoading && <Loader />
								}
								<TweetEmbed
									className={classes.twitter}
									id={'1486515536657747969'}
									options={{ cards: 'hidden', conversation: 'none' }}
									onTweetLoadSuccess={() => setTwitterLoading(false)}
								/>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
				</Card>
				<Card className={classes.cardContainer}>
					<Accordion allowMultiple>
						<AccordionItem border="none">
							<h2>
								<AccordionButton >
									<Box flex="1" textAlign="left">
										<Text fontSize="12px" color="brand.textGrey">PROJECT UPDATE #02</Text>
										<Text fontSize="10px" color="brand.textGrey">14 Feb 2022</Text>
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								<VStack spacing="12px" alignItems="flex-start" textAlign="justify">
									<Text fontSize="16px" fontWeight={500}>LAGOS BITCOIN CONFERENCE UPDATE</Text>
									<Text>The conference is about tackling a major problem among the youths in Nigeria and Africa as a whole. The aim is to teach youths financial literacy with help of bitcoin and lightning, and taking back their freedom from the system. The aim is also educating the youths to be active and advanced in this information and technology age so we can move from an underdeveloped country to a super developed country</Text>
									<Text>So, how is the conference planning going? We have 3 major updates: </Text>
									<UnorderedList paddingLeft="18px" >
										<ListItem fontSize="14px">We have started with the distribution of flyers, hand bills and stickers about the conference. </ListItem>
										<ListItem fontSize="14px">The conference date has been set for the event which will be held on March 26th - the last Saturday of March</ListItem>
										<ListItem fontSize="14px">Bitnob has decided to sponsor the conference hall in Ikeja city in Lagos, with the capacity to hold 300 youths. </ListItem>
									</UnorderedList>
									<Text>
									Photos and videos of the progress will be out soon!
									</Text>

									<Text>
									I believe with this conference, there would be a positive revolution that will transform my country for the better if not best. Live coverage of the event will be available on YouTube for lovers of bitcoin around the world to see the rise of youths learning to move the country in the right direction with sound money.
									</Text>
									<HStack spacing="30px">
										<Box onClick={() => setImageIndex(5)}>
											<Image borderRadius="3px" src={images[5].original} />
										</Box>
										<Box onClick={() => setImageIndex(6)}>
											<Image borderRadius="3px" src={images[6].original}/>
										</Box>
										<Box onClick={() => setImageIndex(7)}>
											<Image borderRadius="3px" src={images[7].original}/>
										</Box>
									</HStack>
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
