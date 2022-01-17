import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Box, Image, Link, Text, VStack } from '@chakra-ui/react';
import { ButtonComponent } from '../../components/ui';
import { ProjectCard } from '../../components/molecules';
import { isDarkMode, isMobileMode } from '../../utils';
import { fonts } from '../../constants/fonts';
import { colors, geyserHomeCoin1, geyserHomeCoin2, geyserHomeLogo } from '../../constants';

export const Home = () => {
	useEffect(() => {
		console.log('checking accessToken', Cookies.get('accessToken')); // => 'value'
		console.log('checking refreshToken', Cookies.get('refreshToken')); // => 'value'
	}, []);

	const isMobile = isMobileMode();
	const isDark = isDarkMode();

	return (
		<Box
			display={'flex'}
			height="100%"
			flexDirection={isMobile ? 'column' : 'row'}
		>
			<Box
				flex={1}
				background={isDark ? 'brand.bgHeavyDarkMode' : 'brand.bgGrey2'}
				display="flex"
				justifyContent="center"
				// AlignItems="center"
				padding="0px 10px"
				overflowY={!isMobile ? 'auto' : undefined}
			>
				<VStack
					spacing="10px"
					width="100%"
					maxWidth="1200px"
					padding="0px 20px"
					display="flex"
					flexDirection="column"
					alignItems="flex-start"
				>
					<Box width="100%" display="flex" justifyContent="center">
						<Image src={geyserHomeLogo} height="250px"/>
					</Box>
					<Box width="100%" fontFamily={fonts.header} fontWeight={700} textAlign={'center'}>
						<Text fontSize="40px">Let’s change the world with</Text>
						<Text fontSize="40px" marginTop={'-15px'}>	Bitcoin crowdfunding</Text>
					</Box>
					<Text fontSize="25px" fontWeight={600}>
						Good ideas can change the world, Geyser helps you fund and play a part in them.
					</Text>
					<Text fontSize="20px">
						Geyser is a global and user-friendly crowdfunding platform, that helps creators to get the funding they need for their projects to burst out with great force into the world (just like geysers!). Explore live crowdfunding projects, fund them on Bitcoin’s lightning network, and keep track of the projects.
					</Text>
					<Link href="https://airtable.com/shrE0ffCRdX6CkYYw" isExternal width="100%" >
						<ButtonComponent
							standard
							backgroundColor={colors.bgGrey}
							isFullWidth
						>
								Subscribe
						</ButtonComponent>
					</Link>
					<Box width="100%" display="flex" justifyContent="center">
						<Image src={geyserHomeCoin1} height="150px"/>
					</Box>
					<Text fontSize="25px" fontWeight={600}>
						Get funded by Bitcoiners around the world to bring your ideas to life
					</Text>
					<Text fontSize="20px">
					Are you a creator or entrepreneur looking for the funds needed to realize your ideas? No matter where you are in the world, Geyser now makes it easy for you to create and commit to a time-bound crowdfund, and allow supporters to fund and keep track of your project. Get started by submitting an idea to crowdfund on Geyser here.
					</Text>
					<Link href="https://airtable.com/shrOzN3U8ePy4Y0uf" isExternal width="100%" >
						<ButtonComponent
							standard
							primary
							isFullWidth
						>
								Start a crowdfund
						</ButtonComponent>
					</Link>
					<Box width="100%" display="flex" justifyContent="center">
						<Image src={geyserHomeCoin2} height="150px"/>
					</Box>
					<Text fontSize="25px" fontWeight={600}>
					Why Geyser?
					</Text>
					<Text fontSize="20px">
					Geyser was inpsired by a natural phenomena: the piling up of heat and pressure which ejects water turbulently up into the sky, in a beatufiful display of energy. We believe that crowds have the power to do the same with ideas by throwing forth intermittend displays of solidarity and support until projects gush out from theory to practice.
					</Text>
					<br />
				</VStack>
			</Box>
			<Box
				width={isMobile ? '100%' : '380px'}
				padding="20px 15px"
				overflowY={isMobile ? undefined : 'auto'}
				display="flex"
				flexDirection="column"
				alignItems="center"
				backgroundColor={isDark ? 'brand.bglightDarkMode' : 'bgWhite'}
			>
				<Text alignSelf="flex-start" fontSize="15px" color={isDark ? 'brand.textWhite' : 'brand.textGrey'} marginBottom="10px">
					CROWDFUNDING PROJECTS
				</Text>
				<ProjectCard
					open
					title="Bitcoin Conference In Lagos"
					name="bitcoin-conference-in-lagos"
					marginBottom="20px"
					imgSrc="/king_2.png"
				/>
				{/* <ProjectCard
					open
					title="Educating youths in Nigeria"
					name="running-with-bitcoin"
					marginBottom="20px"
				/>
				<ProjectCard
					// Open
					title="Educating youths in Nigeria"
					name="running-with-bitcoin"
					marginBottom="20px"
				/> */}
			</Box>
		</Box>
	);
};

