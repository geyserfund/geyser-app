import { Avatar, Box, HStack, Image, Link, ListItem, OrderedList, Text, UnorderedList, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { Footer } from '../../../components/molecules';
import { Card, ImageBar, StatusBar } from '../../../components/ui';
import { kingProfileUrl } from '../../../constants';
import { IUser } from '../../../interfaces';
import { isMobileMode } from '../../../utils';

type Labels = 'containers' | 'texts' | 'readmore' | 'cardContainer'

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

export const King = () => {
	const isMobile = isMobileMode();
	const classes = useStyles({ isMobile });
	const ownerRef: any = useRef(null);
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
	];

	const handleScroll = () => {
		if (ownerRef && ownerRef.current) {
			const scrollElement = document.getElementById('project-scoll-container');
			if (scrollElement) {
				const scrollValue = ownerRef.current.offsetTop - scrollElement.offsetTop;
				scrollElement?.scrollTo({ top: scrollValue, behavior: 'smooth' });
			}
		}
	};

	return (
		<VStack alignItems="center" width="100%">
			<VStack spacing="20px" alignItems="left" marginTop="20px" paddingBottom="50px" maxWidth="780px">
				<Card className={classes.cardContainer}>
					<VStack spacing="12px" alignItems="flex-start">
						<Box>
							<Text fontSize="10px" color="brand.textGrey">PROJECT OWNER</Text>
							<HStack spacing="30px">
								<Link href={`https://twitter.com/${owner.username}`} isExternal>
									<Avatar width="75px" height="75px" name={owner.username} src={owner.picture} />
								</Link>
								<VStack justifyContent="space-between" alignItems="flex-start">
									<Link href={`https://twitter.com/${owner.username}`} isExternal>
										<Text fontSize="18px">
											Apata J
										</Text>
									</Link>
									<Text fontSize="12px" >
										I’m Apata Johnson. I’m a visionary, a dedicated entrepreneur, who loves technology. {!isMobile && <span>As a thinker, and someone who cherish technology I can say that Bitcoin is the next big thing,</span>} <span className={classes.readmore} onClick={handleScroll}>...read more</span>
									</Text>
								</VStack>
							</HStack>
						</Box>
						<Box >
							<Text fontSize="10px" color="brand.textGrey">AMBASSADOR</Text>
							<Link href={`https://twitter.com/${ambassador.username}`} isExternal>
								<HStack spacing="15px">
									<Avatar width="35px" height="35px" name={ambassador.username} src={ambassador.picture} />
									<Text fontSize="18px">
										{ambassador.username}
									</Text>
								</HStack>
							</Link>
						</Box>
						<Box width="100%" overflow="hidden">
							<Text fontSize="10px" color="brand.textGrey">SPONSORS</Text>
							<Wrap >
								{
									sponsors.map((sponsor: IUser) => (
										<WrapItem key={sponsor.username} display="inline-block">
											<Link href={`https://twitter.com/${sponsor.username}`} isExternal>
												<HStack spacing="5px" marginRight="10px">
													<Avatar width="35px" height="35px" name={sponsor.username} src={sponsor.picture} />
													<Text fontSize="18px">
														{sponsor.username}
													</Text>
												</HStack>
											</Link>
										</WrapItem>
									))
								}
							</Wrap>

						</Box>
					</VStack>
				</Card>
				<Card className={classes.cardContainer}>
					<VStack className={classes.containers} spacing="20px">
						<VStack spacing="10px">
							<StatusBar variant="problem" message="Financial illiteracy among the youth in Nigeria, a country ravaged by double-digit inflation." />
							<StatusBar variant="solution" message="Teaching financial literacy to the youths of Nigeria with Bitcoin and lightning." />
							<ImageBar images={images} />
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
							<Box>
								<Image src="https://storage.googleapis.com/geyser-projects-media/project/king/king_7.png" />
							</Box>
						</HStack>
						<VStack className={classes.containers} >
							<Text fontWeight={600} fontSize={'16px'}>
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
						<HStack spacing="30px">
							<Box>
								<Image src="https://storage.googleapis.com/geyser-projects-media/project/king/king_3.png" />
							</Box>
							<Box>
								<Image src="https://storage.googleapis.com/geyser-projects-media/project/king/king_4.png" />
							</Box>
							<Box>
								<Image src="https://storage.googleapis.com/geyser-projects-media/project/king/king_5.png" />
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
							<Box minWidth="280px" maxWidth={'400px'}>
								<Image src="https://storage.googleapis.com/geyser-projects-media/project/king/king_6.png" />
							</Box>
						</VStack>
					</VStack>
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
