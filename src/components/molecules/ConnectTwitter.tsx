import { Box, Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import React from 'react';
import { useHistory } from 'react-router';
import { createUseStyles } from 'react-jss';
import { ButtonComponent, Linkin } from '../ui';
import { SiTwitter } from 'react-icons/si';
import Icon from '@chakra-ui/icon';
import { REACT_APP_API_ENDPOINT } from '../../constants';
import { BubbleCursor } from '../../pages/grants/components/BubbleCursor';

interface IConnectTwitter {
	isOpen: boolean,
	onClose: () => void,
	title?: string,
	description?: string;
}

const useStyles = createUseStyles({
	twitterContainer: {
		marginTop: '20px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
});

export const ConnectTwitter = ({
	isOpen,
	onClose,
	title,
	description,
}: IConnectTwitter) => {
	const classes = useStyles();
	const history = useHistory();
	const useTitle = title || 'Connect';
	const useDescription = description || 'Link your twitter account to appear as a project backer when you fund a project.';

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent display="flex" alignItems="center" padding="20px 15px">
				{history.location.pathname === '/project/bitcoin-hackathons'
			&& <BubbleCursor/>}
				<ModalHeader><Text fontSize="16px" fontWeight={600}>{useTitle}</Text></ModalHeader>
				<ModalCloseButton />
				<ModalBody >
					<Text>{useDescription}</Text>
					<Box className={classes.twitterContainer}>
						<Linkin href={`${REACT_APP_API_ENDPOINT}/auth/twitter`}>
							<ButtonComponent
								isFullWidth
								primary
								standard
								leftIcon={<Icon as={SiTwitter} />}

							>
								Login with Twitter
							</ButtonComponent>
						</Linkin>
					</Box>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
