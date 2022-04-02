import { Box, Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { ButtonComponent, Linkin } from '../ui';
import { SiTwitter } from 'react-icons/si';
import Icon from '@chakra-ui/icon';
import { AddSponsorUrl } from '../../constants';

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

export const AddSponsor = ({
	isOpen,
	onClose,
}: IConnectTwitter) => {
	const classes = useStyles();
	const useTitle = 'Become a founding partner';
	const useDescription = 'Become a Funding Partner to be featured in the crowdfund and the product. Reach out to Craig at craig.deutsch@protonmail.com for more info.';

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent display="flex" alignItems="center" padding="20px 15px">
				<ModalHeader><Text fontSize="16px" fontWeight="normal">{useTitle}</Text></ModalHeader>
				<ModalCloseButton />
				<ModalBody >
					<Text>{useDescription}</Text>
					<Box className={classes.twitterContainer}>
						<Linkin href={AddSponsorUrl} isExternal>
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
