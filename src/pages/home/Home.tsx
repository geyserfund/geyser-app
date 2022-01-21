import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Box, HStack, Image, Link, Text, VStack } from '@chakra-ui/react';
import { ButtonComponent, Card } from '../../components/ui';
import { Footer, ProjectCard } from '../../components/molecules';
import { isDarkMode, isMobileMode } from '../../utils';
import { fonts } from '../../constants/fonts';
import { colors, geyserHomeCoin1, geyserHomeCoin2, geyserHomeLogo, StartCrowdFundUrl, SubscribeUrl } from '../../constants';
import { createUseStyles } from 'react-jss';

type RuleNames = 'titles' | 'headers' | 'texts'

interface IStyleProps {
	isMobile?: boolean
}

const useStyles = createUseStyles<RuleNames, IStyleProps>({

	headers: ({ isMobile }: IStyleProps) => ({
		fontSize: isMobile ? '30px' : '40px',
	}),
	titles: ({ isMobile }: IStyleProps) => ({
		fontSize: isMobile ? '20px' : '25px',
		fontWeight: 600,
	}),
	texts: ({ isMobile }: IStyleProps) => ({
		fontSize: isMobile ? '15px' : '20px',
	}),
});

export const Home = () => {
	const isMobile = isMobileMode();
	const isDark = isDarkMode();

	const classes = useStyles({ isMobile: isMobileMode() });

	useEffect(() => {
		console.log('checking accessToken', Cookies.get('accessToken')); // => 'value'
		console.log('checking refreshToken', Cookies.get('refreshToken')); // => 'value'
	}, []);

	return (
		<VStack
			background={isDark ? 'brand.bgHeavyDarkMode' : 'brand.bgGrey2'}
			position="relative"
			padding="0px 10px"
		>
			<VStack
				spacing="10px"
				width="100%"
				maxWidth="1200px"
				padding={isMobile ? '0px' : '0px 20px'}
				display="flex"
				flexDirection="column"
				alignItems="flex-start"
			>
				<Box width="100%" display="flex" justifyContent="center">
					<Image src={geyserHomeLogo} height="250px" />
				</Box>
				<Box width="100%" fontFamily={fonts.header} fontWeight={700} textAlign={'center'} paddingBottom={'10px'}>
					<Text className={classes.headers}>Let’s change the world with</Text>
					<Text className={classes.headers}>Bitcoin crowdfunding</Text>
				</Box>
				<Text className={classes.titles}>
					Good ideas can change the world, Geyser helps you fund and play a part in them.
				</Text>
				<Text className={classes.texts}>
					Geyser is a global and user-friendly crowdfunding platform, that helps creators to get the funding they need for their projects to burst out with great force into the world (just like geysers!). Explore live crowdfunding projects, fund them on Bitcoin’s lightning network, and keep track of the projects.
				</Text>
				<Link href={SubscribeUrl} isExternal width="100%" >
					<ButtonComponent
						standard
						backgroundColor={colors.bgGrey}
						isFullWidth
					>
						Subscribe
					</ButtonComponent>
				</Link>

				<Box width="100%" display="flex" justifyContent="center">
					<Image src={geyserHomeCoin1} height="150px" />
				</Box>
				<VStack paddingBottom="20px" width="100%" alignItems="center">
					<Card maxHeight="328px" width="100%" borderRadius="20px" border="2px solid #E9E9E9">
						<VStack
							width="100%"
							padding="20px 15px"
							alignItems="center"
							backgroundColor={isDark ? 'brand.bglightDarkMode' : 'bgWhite'}
						>
							<Text fontSize="15px" color={isDark ? 'brand.textWhite' : 'brand.textGrey'} marginBottom="10px">
								CROWDFUNDING PROJECTS
							</Text>
							<HStack
								overflowX={'auto'}
							>
								<ProjectCard
									open
									title="Bitcoin Conference In Lagos"
									name="bitcoin-conference-in-lagos"
									marginBottom="20px"
									imgSrc="https://storage.googleapis.com/geyser-projects-media/project/king/king_2.png"
								/>
							</HStack>

						</VStack>
					</Card>
				</VStack>
				<Text className={classes.titles}>
					Get funded by Bitcoiners around the world to bring your ideas to life
				</Text>
				<Text className={classes.texts}>
					Are you a creator or entrepreneur looking for the funds needed to realize your ideas? No matter where you are in the world, Geyser now makes it easy for you to create and commit to a time-bound crowdfund, and allow supporters to fund and keep track of your project. Get started by submitting an idea to crowdfund on Geyser here.
				</Text>
				<Link href={StartCrowdFundUrl} isExternal width="100%" >
					<ButtonComponent
						standard
						primary
						isFullWidth
					>
						Start a crowdfund
					</ButtonComponent>
				</Link>
				<Box width="100%" display="flex" justifyContent="center">
					<Image src={geyserHomeCoin2} height="150px" />
				</Box>
				<Text className={classes.titles}>
					Why Geyser?
				</Text>
				<Box paddingBottom="50px">
					<Text className={classes.texts}>
						Geyser was inpsired by a natural phenomena: the piling up of heat and pressure which ejects water turbulently up into the sky, in a beatufiful display of energy. We believe that crowds have the power to do the same with ideas by throwing forth intermittend displays of solidarity and support until projects gush out from theory to practice.
					</Text>
				</Box>
			</VStack>
			<Footer />
		</VStack >
	);
};

