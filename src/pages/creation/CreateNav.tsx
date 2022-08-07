import { Avatar, Box, HStack, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { ConnectTwitter } from '../../components/molecules';
import { LogoBlack } from '../../components/nav';
import { ButtonComponent } from '../../components/ui';
import { useAuthContext } from '../../context';
import { isMobileMode } from '../../utils';

export const CreateNav = () => {
	const isMobile = isMobileMode();
	const history = useHistory();

	const { user } = useAuthContext();
	const { isOpen, onClose, onOpen } = useDisclosure();

	useEffect(() => {
		if (user && !user.id) {
			onOpen();
		}
	}, [user]);

	const handleClose = () => {
		history.push('/');
		onClose();
	};

	return (
		<>
			<Box
				display="flex"
				width="100%"
				justifyContent="center"
				background={'rgba(252,252,252,0.9)'}
				// borderBottom={showBorder ? '1px solid rgba(0,0,0,0)' : '1px solid rgba(233,233,233,0.9)'}
				borderBottom={'1px solid rgba(233,233,233,0.9)'}
				boxSizing="border-box"
				position="fixed"
				backdropFilter="blur(2px)"
				top={0}
				left={0}
				zIndex={1000}
			>
				<Box
					display="flex"
					width="100%"
					justifyContent="space-between"
					margin={isMobile ? '10px' : '15px 40px 15px 40px'}
				>
					<HStack
						spacing="5px"
						justifyContent="center"
						alignItems="center">
						<LogoBlack />
						<Avatar height="40px" width="40px" src={user.imageUrl} />
						<Text fontWeight={600} fontSize="16px">{user.username}</Text>
					</HStack>
					<HStack>
						<ButtonComponent>
							Save
						</ButtonComponent>
						<ButtonComponent primary>
							Preview
						</ButtonComponent>
					</HStack>
				</Box>
			</Box>
			<ConnectTwitter
				isOpen={isOpen}
				onClose={handleClose}
				title={'You are not Logged in'}
				description={'Please log in to create crowsfunds with geyser.'}

			/>
		</>
	);
};
