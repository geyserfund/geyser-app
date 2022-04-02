import { Box, Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { ButtonComponent, Linkin } from '../ui';
import { SiTwitter } from 'react-icons/si';
import Icon from '@chakra-ui/icon';
import { AmbassadorUrl } from '../../constants';

interface IConnectTwitter {
	isOpen: boolean,
	onClose: () => void,
	title?: string,
	description?: string;
}

const useStyles = createUseStyles({
	twitterContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
});

export const AddAmbassador = ({
	isOpen,
	onClose,
}: IConnectTwitter) => {
	const classes = useStyles();
	const useTitle = 'Become an ambassador';
	const useDescription = 'Become an ambassador to support this project, by bringing in your reputation to increase the sense of trust.\n';
	const text = 'To become an ambassador send an email to Craig at craig.deutsch@protonmail.com.';

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
			<ModalOverlay />
			<ModalContent display="flex" alignItems="center" padding="20px 15px">
				<ModalHeader><Text fontSize="16px" fontWeight="normal">{useTitle}</Text></ModalHeader>
				<ModalCloseButton />
				<ModalBody >
					<Text>{useDescription}</Text>
					<Text paddingTop="20px">{text}</Text>
					<Box className={classes.twitterContainer}>
						<Linkin href={AmbassadorUrl} isExternal>
							<ButtonComponent
								margin="10px"
								isFullWidth
								primary
								standard
								leftIcon={<Icon as={SiTwitter} />}
							>
								Email
							</ButtonComponent>
						</Linkin>
					</Box>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
