import { Box, Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { QRCode } from 'react-qrcode-logo';
import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { ButtonComponent, Linkin } from '../ui';
import { SiTwitter } from 'react-icons/si';
import Icon from '@chakra-ui/icon';
import { REACT_APP_API_ENDPOINT } from '../../constants';
import { useLocation } from 'react-router';
import { BsLightningChargeFill } from 'react-icons/bs';
import { useAuthContext } from '../../context';
import { useNotification, isMobileMode } from '../../utils';
import LogoDarkGreen from '../../assets/logo-qr-code.svg';

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
	const { toast } = useNotification();
	const isMobile = isMobileMode();

	const classes = useStyles();
	const useTitle = title || 'Connect';
	const useDescription = description || 'Link your twitter account to appear as a project backer when you fund a project.';
	const pathName = location.pathname || '';
	const [showQr, setShowQr] = useState(false);
	const [qrContent, setQrContent] = useState('');
	const { setUser } = useAuthContext();

	useEffect(() => {
		console.log('showQr', showQr);

		// eslint-disable-next-line no-constant-condition
		if (showQr) {
			const id = setInterval(() => {
				console.log('fetching access-token...');
				let hasError = false;

				fetch(`${REACT_APP_API_ENDPOINT}/auth/access-token`, { credentials: 'include'})
					.then(response => {
						if (!(response.status >= 200 && response.status < 400)) {
							hasError = true;
						}

						return response.json();
					})
					.then(response => {
						if (hasError) {
							throw new Error(response.reason);
						}

						const { user } = response;

						if (user) {
							setUser(user);
						}
					}).catch(err => {
						setShowQr(false);

						toast({
							title: 'Something went wrong',
							description: `The authentication request failed: ${err.message}.`,
							status: 'error',
						});
					});
			}, 1000);

			return () => clearInterval(id);
		}
	}, [showQr]);

	const handleLnurlLogin = async () => {
		fetch(`${REACT_APP_API_ENDPOINT}/auth/lnurl`, { credentials: 'include' })
			.then(response => response.json())
			.then(({ url }) => {
				console.log(url);
				setQrContent(url);
				setShowQr(true);
			})
			.catch(err => {
				console.log(err);
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
						? <Box>
							{/* TODO: IMPLEMENT PROPER QR CODE UIs */}
							<Text>Scan the QR code to connect to your Lightning wallet. Check if my wallet supports LNURL-auth here.</Text>
							<QRCode
								qrStyle="dots"
								logoImage={LogoDarkGreen}
								logoHeight={30}
								logoWidth={30}
								eyeRadius={2}
								removeQrCodeBehindLogo={true}
								bgColor="#fff"
								fgColor="#004236"
								size={isMobile ? 121 : 186}
								value={qrContent}
							/>
						</Box>
						: <>
							<Text>{useDescription}</Text><Box className={classes.twitterContainer}>
								<Linkin href={`${REACT_APP_API_ENDPOINT}/auth/twitter?nextPath=${pathName}`}>
									<ButtonComponent
										isFullWidth
										primary
										standard
										leftIcon={<Icon as={SiTwitter} />}

									>
									Twitter
									</ButtonComponent>
								</Linkin>
							</Box><Box className={classes.twitterContainer}>
								<ButtonComponent
									isFullWidth
									primary
									standard
									backgroundColor="#ffe600"
									_hover={{ bg: '#e3c552' }}
									leftIcon={<Icon as={BsLightningChargeFill} />}
									onClick={async () => handleLnurlLogin()}
								>
										Lightning
								</ButtonComponent>
							</Box>
						</>
					}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
