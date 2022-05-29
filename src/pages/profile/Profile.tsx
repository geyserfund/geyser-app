import { Avatar, Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Footer } from '../../components/molecules';
import Loader from '../../components/ui/Loader';
import { useAuthContext } from '../../context';
import { isDarkMode, isMobileMode } from '../../utils';

export const Profile = () => {
	const isDark = isDarkMode();
	const isMobile = isMobileMode();

	const {user, loading } = useAuthContext();
	console.log('something something', user);

	if (loading) {
		return (
			<Box>
				<Loader />
			</Box>
		);
	}

	return (
		<VStack
			background={isDark ? 'brand.bgHeavyDarkMode' : 'brand.bgGrey4'}
			position="relative"
			padding="0px 0px"
			height="100%"
			justifyContent="space-between"
		>
			<VStack
				spacing="40px"
				width="100%"
				maxWidth="1200px"
				padding={isMobile ? '0px 10px' : '0px 40px'}
				marginBottom="40px"
				marginTop={isMobile ? '40px' : '80px'}
				display="flex"
				flexDirection="column"
				alignItems="flex-start"
			>
				<VStack width="100%">
					<HStack width="100%" justifyContent="space-between">
						<HStack spacing="20px">
							<Avatar height="50px" width="50px" name={user.username} src={user.imageUrl} />
							<Text fontWeight={600} fontSize="20px">{user.username}</Text>
						</HStack>
						<Button>Create</Button>
					</HStack>
				</VStack>
				<Box>
                    Lower block
				</Box>

			</VStack>
			<Footer />
		</VStack>
	);
};
