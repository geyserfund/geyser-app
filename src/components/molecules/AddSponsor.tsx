import { Box, Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { ButtonComponent, Linkin } from '../ui';
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
	const useTitle = 'Become a sponsor';
	const useDescription = 'Interested in sponsoring this campaign? Click continue to let us know your details and we can quickly add you as a sponsor.';

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
							>
								Continue
							</ButtonComponent>
						</Linkin>
					</Box>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
