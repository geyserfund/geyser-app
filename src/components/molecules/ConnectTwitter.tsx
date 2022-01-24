import { Box, Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { ButtonComponent, Linkin } from '../ui';
import { SiTwitter } from 'react-icons/si';
import Icon from '@chakra-ui/icon';
import { REACT_APP_API_ENDPOINT } from '../../constants';
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
						<Linkin href={`${REACT_APP_API_ENDPOINT}/auth/twitter`}>
							<ButtonComponent
								margin="10px"
								isFullWidth
								primary
								standard
								leftIcon={<Icon as={SiTwitter} />}

							>
								Login with Twitter
							</ButtonComponent>
						</Linkin>

						{/* </TwitterLogin> */}
					</Box>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
