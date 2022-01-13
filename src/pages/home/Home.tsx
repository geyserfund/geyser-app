import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Box, IconButton, Link, Text } from '@chakra-ui/react';
import { Logo } from '../../components/nav/Logo';
import { ButtonComponent } from '../../components/ui';
import { FaTelegramPlane, FaTwitter } from 'react-icons/fa';
import { ProjectCard } from '../../components/molecules';
import { isDarkMode, isMobileMode } from '../../utils';
import { colors } from '../../constants';

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
			>
				<Box
					minWidth="380px"
					width="60%"
					marginBottom="30px"
					marginTop="10%"
				>
					<Box marginBottom="40px" display="flex" justifyContent="space-between">
						<Logo full />
						<Box>
							<Link href="https://twitter.com/geyserfund" target="_blank">
								<IconButton
									background={'none'}
									aria-label="twitter"
									icon={<FaTwitter fontSize="25px" />}
								/>
							</Link>
							<Link href="https://t.me/+EZ5otIPhVcxhMmFk" target="_blank">
								<IconButton
									background={'none'}
									aria-label="telegram"
									icon={<FaTelegramPlane fontSize="25px" />}
									marginLeft="5px"
								/>
							</Link>

						</Box>
					</Box>
					<Box marginBottom="30px">
						<Text fontSize="25px" marginBottom="25px">
							Crowdfunding the world with Bitcoin
						</Text>
						<Text fontSize="18px" marginBottom="25px">
							Problem-solving ideas emerge everywhere, and yet mainstream crowdfunding is only available in western countries.
						</Text>
						<Text fontSize="18px" marginBottom="25px">
							Geyser will use Bitcoin’s lightning network to create a platform where creators and entrepreneurs can access the capital needed to realize their ideas, no matter where in the world they are.
						</Text>
						<Text fontSize="18px">
							Explore and support live crowdfunding projects or submit your ideas to be funded here. For any questions, get in touch with us on Telegram.
						</Text>
					</Box>
					<Box display="flex" justifyContent="space-between" width="100%">
						<Link href="https://airtable.com/shrOzN3U8ePy4Y0uf" isExternal >
							<ButtonComponent
								standard
								primary
							>
								Start a crowdfund
							</ButtonComponent>
						</Link>
						<Link href="https://airtable.com/shrE0ffCRdX6CkYYw" isExternal >
							<ButtonComponent
								standard
								backgroundColor={colors.bgLightGrey}
							>
								Subscribe
							</ButtonComponent>
						</Link>
					</Box>
				</Box>
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

