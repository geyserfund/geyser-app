import { Box, LinkOverlay, Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import React from 'react';
import { createUseStyles } from 'react-jss';
// Import TwitterLogin from 'react-twitter-auth';
import { ButtonComponent } from '../ui';
import { SiTwitter } from 'react-icons/si';
import Icon from '@chakra-ui/icon';
interface IConnectTwitter {
	isOpen: boolean,
	onClose: () => void,
}

const useStyles = createUseStyles({
	twitterContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
});

export const ConnectTwitter = ({
	isOpen,
	onClose,
}: IConnectTwitter) => {
	const classes = useStyles();

	// Const handleFailed = () => {
	// 	console.log('failed');
	// };

	// const handleSuccess = () => {
	// 	console.log('failed');
	// };

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent display="flex" alignItems="center" padding="20px 15px">
				<ModalHeader><Text fontSize="16px" fontWeight="normal">Connect to Twitter</Text></ModalHeader>
				<ModalCloseButton />
				<ModalBody >
					<Text>
						To create a project you have to first connect to your twitter account so that we can recognize you for your contributions
					</Text>
					<Box className={classes.twitterContainer}>
						{/* <TwitterLogin
							loginUrl="http://localhost:4000/auth/twitter"
							onFailure={handleFailed}
							onSuccess={handleSuccess}
							requestTokenUrl="http://localhost:4000/auth/twitter/callback"
							showIcon={true}
						> */}
						<LinkOverlay href={'http://localhost:4000/auth/twitter'}>
							<ButtonComponent
								margin="10px"
								isFullWidth
								primary
								standard
								leftIcon={<Icon as={SiTwitter} />}

							>
								Login with Twitter
							</ButtonComponent>
						</LinkOverlay>

						{/* </TwitterLogin> */}
					</Box>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
