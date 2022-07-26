import { Box, Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { ButtonComponent, Linkin } from '../ui';
import { SiTwitter } from 'react-icons/si';
import Icon from '@chakra-ui/icon';
import { REACT_APP_API_ENDPOINT } from '../../constants';
import { useLocation } from 'react-router';
import { BsLightningChargeFill } from 'react-icons/bs';

interface ILoginModal {
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

export const LoginModal = ({
	isOpen,
	onClose,
	title,
	description,
}: ILoginModal) => {
	const location = useLocation();

	const classes = useStyles();
	const useTitle = title || 'Connect';
	const useDescription = description || 'Link your twitter account to appear as a project backer when you fund a project.';
	const pathName = location.pathname || '';
	const [showQr, setShowQr] = useState(false);
	const [qrContent, setQrContent] = useState('');

	useEffect(() => {
		console.log('showQr', showQr);

		if (showQr) {
			console.log('here');

			const id = setInterval(() => {
				console.log('fetching access-token...');
				fetch(`${REACT_APP_API_ENDPOINT}/auth/access-token`);
			}, 1000);
			console.log('ID', id);

			return () => clearInterval(id);
		}
	}, [showQr]);

	const handleLnurlLogin = async () => {
		fetch(`${REACT_APP_API_ENDPOINT}/auth/lnurl`)
			.then(response => response.json())
			.then(({ url }) => {
				console.log(url);
				setQrContent(url);
				setShowQr(true);
			});
	};

	const onLoginClose = () => {
		setShowQr(false);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onLoginClose}>
			<ModalOverlay />
			<ModalContent display="flex" alignItems="center" padding="20px 15px">
				<ModalHeader><Text fontSize="16px" fontWeight={600}>{useTitle}</Text></ModalHeader>
				<ModalCloseButton />
				<ModalBody >
					{ showQr
						? <Box><Text>Ok</Text></Box>
						:					<><Text>{useDescription}</Text><Box className={classes.twitterContainer}>
							<Linkin href={`${REACT_APP_API_ENDPOINT}/auth/twitter?nextPath=${pathName}`}>
								<ButtonComponent
									isFullWidth
									primary
									standard
									leftIcon={<Icon as={SiTwitter} />}

								>
									Login with Twitter
								</ButtonComponent>
							</Linkin>
						</Box><Box className={classes.twitterContainer}>
							<ButtonComponent
								isFullWidth
								primary
								standard
								backgroundColor="#fada5e"
								_hover={{ bg: '#e3c552' }}
								leftIcon={<Icon as={BsLightningChargeFill} />}
								onClick={async () => handleLnurlLogin()}
							>
									Login with Lightning
							</ButtonComponent>
						</Box></>
					}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
