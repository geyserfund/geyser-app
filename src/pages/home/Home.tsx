import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { Logo } from '../../components/nav/Logo';
import { ButtonComponent } from '../../components/ui';
import { FaTelegramPlane, FaTwitter } from 'react-icons/fa';
import { ProjectCard } from '../../components/molecules';
import { isMobileMode } from '../../utils';

export const Home = () => {
	useEffect(() => {
		console.log('checking accessToken', Cookies.get('accessToken')); // => 'value'
		console.log('checking refreshToken', Cookies.get('refreshToken')); // => 'value'
	}, []);

	const isMobile = isMobileMode();

	return (
		<Box
			display={'flex'}
			height="100%"
			flexDirection={isMobile ? 'column' : 'row' }
		>
			<Box
				flex={1}
				background="brand.bgGrey2"
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<Box
					minWidth="280px"
					width="60%"
					marginBottom="30px"
					marginTop="10px"
				>
					<Box marginBottom="40px" display="flex" justifyContent="space-between">
						<Logo />
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
							Explore and support live crowdfunding projects or get in touch to get your ideas funded on our platform. For any question ask us on Telegram.
						</Text>
					</Box>
					<Box display="flex" justifyContent="space-between">
						<ButtonComponent
							standard
							primary
						>
							Start a crowdfund
						</ButtonComponent>
						<ButtonComponent
							standard
						>
							Subscribe
						</ButtonComponent>
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
			>
				<Text alignSelf="flex-start" fontSize="20px" color="brand.textGrey" marginBottom="10px">
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
					open
					title="Educating youths in Nigeria"
					name="running-with-bitcoin"
					marginBottom="20px"
				/>
			</Box>
		</Box>
	);
};

