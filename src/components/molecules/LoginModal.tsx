import { Box, Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { QRCode } from 'react-qrcode-logo';
import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { ButtonComponent } from '../ui';
import { SiTwitter } from 'react-icons/si';
import Icon from '@chakra-ui/icon';
import { REACT_APP_API_ENDPOINT, ILoginStages, loginStages } from '../../constants';
import { useLocation } from 'react-router';
import { BsLightningChargeFill } from 'react-icons/bs';
import { useAuthContext } from '../../context';
import { useNotification } from '../../utils';
import LogoDarkGreen from '../../assets/logo-dark-green.svg';
import { RiLinksLine, RiLinkUnlinkM } from 'react-icons/ri';
import { HStack, Link, Spinner, VStack } from '@chakra-ui/react';
import { useLazyQuery } from '@apollo/client';
import { ME } from '../../graphql';
import { IUser, IUserExternalAccount } from '../../interfaces';

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

const hasTwitterAccount = (user: IUser) => {
	if (!user) {
		return false;
	}

	return user.externalAccounts.some((account: IUserExternalAccount) => account.type === 'twitter');
};

export const TwitterLogin = ({ nextPath }: { nextPath: string }) => {
	const { setUser, loginOnClose } = useAuthContext();
	const { toast } = useNotification();

	const [getUser, { stopPolling }] = useLazyQuery(ME, {
		onCompleted: (data: any) => {
			if (data && data.me) {
				console.log('user', data.me);
				const hasTwitter = hasTwitterAccount(data.me);
				console.log('hasTwitter', hasTwitter);

				if (hasTwitter) {
					console.log('stopping poll');
					stopPolling();
					loginOnClose();
					setUser(data.me);
				}
			}
		},
		fetchPolicy: 'cache-and-network',
		pollInterval: 1000,
	});

	const [pollAuthStatus, setPollAuthStatus] = useState(false);

	useEffect(() => {
		if (pollAuthStatus) {
			const id = setInterval(async () => {
				const statusRes = await fetch(`${REACT_APP_API_ENDPOINT}/auth/status`, { credentials: 'include' });
				if (statusRes.status === 200) {
					const { status: authStatus, reason } = await statusRes.json();

					if (authStatus === 'success') {
						setPollAuthStatus(false);
						loginOnClose();
					} else if (authStatus === 'failed') {
						stopPolling();
						setPollAuthStatus(false);

						toast({
							title: 'Something went wrong',
							description: `The authentication request failed: ${reason}.`,
							status: 'error',
						});
					}
				}
			}, 1000);

			return () => clearInterval(id);
		}
	}, [pollAuthStatus]);

	const handleClick = async () => {
		try {
			const response = await fetch(`${REACT_APP_API_ENDPOINT}/auth/auth-token`, { credentials: 'include' });

			if (response.status >= 200 && response.status < 400) {
				setPollAuthStatus(true);
				getUser();
				window.open(`${REACT_APP_API_ENDPOINT}/auth/twitter?nextPath=${nextPath}`, '_blank', 'noopener,noreferrer');
			} else {
				toast({
					title: 'Something went wrong',
					description: 'The authentication request failed: could not get authentication token.',
					status: 'error',
				});
			}
		} catch (err) {
			console.log('err', err);
		}
	};

	return (
		<ButtonComponent
			isFullWidth
			primary
			standard
			leftIcon={<Icon as={SiTwitter}/>}
			onClick={handleClick}
		>
			Twitter
		</ButtonComponent>
	);
};

export const LnurlLogin = ({ handleClick }: { handleClick: any}) => (<ButtonComponent
	isFullWidth
	primary
	standard
	backgroundColor="#ffe600"
	_hover={{ bg: '#e3c552' }}
	leftIcon={<Icon as={BsLightningChargeFill} />}
	onClick={async () => handleClick()}
>
									Lightning
</ButtonComponent>);

export const LoginModal = ({
	isOpen,
	onClose,
	title,
	description,
}: ILoginModal) => {
	const location = useLocation();
	const { toast } = useNotification();
	const { user, setUser, isLoggedIn } = useAuthContext();
	const classes = useStyles();

	const [modalTitle, setModalTitle] = useState(title || 'Connect');

	const setDescription = () => {
		if (isLoggedIn) {
			return 'Select an account you would like to link to your profile.';
		}

		return 'Select an authentication method.';
	};

	const useDescription = description || setDescription();
	const nextPath = location.pathname || '';

	const [qrContent, setQrContent] = useState('');
	const [loginState, setLoginState] = useState<ILoginStages>(loginStages.initial);

	const [copy, setcopy] = useState(false);
	const handleCopy = () => {
		navigator.clipboard.writeText(qrContent);
		setcopy(true);
		setTimeout(() => {
			setcopy(false);
		}, 2000);
	};

	useEffect(() => {
		if (loginState === 'lnurl') {
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
							if (hasTwitterAccount(user)) {
								onLoginClose();
							} else {
								setLoginState(loginStages.connect);
								setModalTitle('Connected!');
							}
						}
					}).catch(err => {
						setLoginState(loginStages.initial);

						toast({
							title: 'Something went wrong',
							description: `The authentication request failed: ${err.message}.`,
							status: 'error',
						});
					});
			}, 1000);

			return () => clearInterval(id);
		}
	}, [loginState]);

	const handleLnurlLogin = async () => {
		fetch(`${REACT_APP_API_ENDPOINT}/auth/lnurl`, { credentials: 'include' })
			.then(response => response.json())
			.then(({ url }) => {
				console.log(url);
				setQrContent(url);
				setLoginState(loginStages.lnurl);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const onLoginClose = () => {
		setLoginState(loginStages.initial);
		onClose();
	};

	const renderModalBody = () => {
		switch (loginState) {
			case 'lnurl':
				return (
					<Box justifyContent="center" alignItems="center">
						<Text>Scan the QR code to connect to your Lightning wallet.</Text>
						<Link href="https://github.com/fiatjaf/lnurl-rfc#lnurl-documents" isExternal color="grey">
							<Text>
								Check if your wallet supports LNURL-auth here.
							</Text>
						</Link>
						<VStack marginTop={3} marginBottom={6}>
							<QRCode
								qrStyle="dots"
								logoImage={LogoDarkGreen}
								logoHeight={30}
								logoWidth={30}
								eyeRadius={2}
								removeQrCodeBehindLogo={true}
								bgColor="#fff"
								fgColor="#004236"
								size={186}
								value={qrContent}
								id="lnurl-auth-qr-code"
								style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
							/>
							<HStack justifyContent="center" alignItems="center" marginTop={1}>
								<Spinner size="sm" speed="1s" thickness="1px"/>
								<Text fontSize={10}>Waiting for authentication to complete...</Text>
							</HStack>
						</VStack>
						<ButtonComponent
							isFullWidth
							primary={copy}
							onClick={handleCopy}
							leftIcon={copy ? <RiLinkUnlinkM /> : <RiLinksLine />}
						>
							{!copy ? 'Copy Authentication Link' : 'Url Copied'}
						</ButtonComponent>
					</Box>
				);

			case 'connect':
				return (
					<Box justifyContent="center" alignItems="center">
						<Text marginBottom={2}>You can also bridge your Geyser activity by linking your Twitter profile.</Text>
						<TwitterLogin nextPath={nextPath}/>
					</Box>
				);

			default:
				return (
					<>
						<Text>{useDescription}</Text>
						{ !hasTwitterAccount(user)
							&& <Box className={classes.twitterContainer}>
								<TwitterLogin nextPath={nextPath}/>
							</Box>
						}
						<Box className={classes.twitterContainer}>
							<LnurlLogin handleClick={handleLnurlLogin}></LnurlLogin>
						</Box>
					</>
				);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onLoginClose}>
			<ModalOverlay />
			<ModalContent display="flex" alignItems="center" padding="20px 15px">
				<ModalHeader><Text fontSize="16px" fontWeight={600}>{modalTitle}</Text></ModalHeader>
				<ModalCloseButton />
				<ModalBody >
					{renderModalBody()}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
