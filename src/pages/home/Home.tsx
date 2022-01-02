import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Box, IconButton, Link, Text } from '@chakra-ui/react';
import { Logo } from '../../components/nav/Logo';
import { ButtonComponent } from '../../components/ui';
import { FaTelegramPlane, FaTwitter } from 'react-icons/fa';
import { ProjectCard } from '../../components/molecules';
import { isDarkMode, isMobileMode } from '../../utils';

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
							<IconButton
								background={'none'}
								ariaLabel="twitter"
								icon={<FaTwitter fontSize="25px" />}
							/>
							<IconButton
								background={'none'}
								ariaLabel="telegram"
								icon={<FaTelegramPlane fontSize="25px" />}
								marginLeft="5px"
							/>
						</Box>
					</Box>
					<Box marginBottom="30px">
						<Text fontSize="25px" marginBottom="25px">
							Great problem-solving ideas emerge globally, so let’s connect and fund them globally.
						</Text>
						<Text fontSize="20px" marginBottom="25px">
							We believe that problem-solving ideas emerge everywhere, and that global communities come together to support initiatives they care about. We are building a platform for global crowdfunding based entirely on Bitcoin.
						</Text>
						<Text fontSize="20px">
							Explore and support live crowdfunding projects or <u>get in touch</u> to get your ideas funded on our platform. For any question ask us on <u>Telegram</u>.
						</Text>
					</Box>
					<Box display="flex" justifyContent="space-between">
						<Link href="https://airtable.com/shrE0ffCRdX6CkYYw" isExternal width="100%">
							<ButtonComponent
								standard
								primary
								isFullWidth
							>
								Start a crowdfund
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
					title="Bitcoin Education in Congo"
					name="running-with-bitcoin"
					marginBottom="20px"
				/>
				<ProjectCard
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
				/>
			</Box>
		</Box>
	);
};

