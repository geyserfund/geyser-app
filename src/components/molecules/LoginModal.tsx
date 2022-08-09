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
import { useNotification, isMobileMode } from '../../utils';
import LogoDarkGreen from '../../assets/logo-dark-green.svg';
import { HStack, Link, VStack, Avatar } from '@chakra-ui/react';
import { useLazyQuery } from '@apollo/client';
import { ME } from '../../graphql';
import { IUser, IUserExternalAccount } from '../../interfaces';
import Loader from '../ui/Loader';
import { colors } from '../../constants';

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

const hasLnurlAccount = (user: IUser) => {
	if (!user) {
		return false;
	}

	return user.externalAccounts.some((account: IUserExternalAccount) => account.type === 'lnurl');
};

export const TwitterLogin = ({ nextPath }: { nextPath: string }) => {
	const { setUser } = useAuthContext();
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
				window.open(`${REACT_APP_API_ENDPOINT}/auth/twitter?nextPath=/auth/twitter`, '_blank', 'noopener,noreferrer');
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
	const isMobile = isMobileMode();

	const [modalTitle, setModalTitle] = useState(title || 'Connect');

	const setDescription = () => {
		if (isLoggedIn) {
			return 'Select an account you would like to link to your profile.';
		}

		return 'Connect to launch your idea and to appear as a contributor when you fund an initiative.';
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
			setModalTitle('Connect with Lightning');
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
							setLoginState(loginStages.connect);
							setModalTitle('Connected!');
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
		setModalTitle('Connect');
		onClose();
	};

	const renderModalBody = () => {
		switch (loginState) {
			case 'lnurl':
				return (
					<Box justifyContent="center" alignItems="center">
						<Text>Scan the QR code to connect to your Lightning wallet.</Text>
						<Link href="https://github.com/fiatjaf/lnurl-rfc#lnurl-documents" isExternal fontSize="sm" textDecoration="underline">

								Check if your wallet supports LNURL-auth here.

						</Link>
						<VStack marginTop={3} marginBottom={3}>
							<Box border="4px solid #20ECC7" borderRadius={4}>
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
							</Box>
							<HStack justifyContent="center" alignItems="center" marginTop={3}>
								<Loader size="lg" />
								<Text>Waiting to connect...</Text>
							</HStack>
						</VStack>
						<Box display="flex" justifyContent="between" alignItems="center" border="1px solid lightgrey" borderRadius={4} p={2}>
							<Text w="75%" color="brand.textGrey" cursor="default">{qrContent.slice(0, isMobile ? 21 : 30)}...</Text>
							<ButtonComponent
								w="25%"
								primary
								onClick={handleCopy}
								fontWeight="bold"
								fontSize="md"
							>
								{!copy ? 'Copy' : 'Copied!'}
							</ButtonComponent>

						</Box>
					</Box>
				);

			case 'connect':
				return (
					<Box justifyContent="center" alignItems="center">
						<Text marginBottom={5}>You connected with Lightning, you can also connect with Twitter to pull your social profile.</Text>
						<HStack ml="calc(50% - 124px)" w="100%" spacing="25px" mb={5}>
							<Avatar name={user.username} src={user.imageUrl} />
							<Box w="200px" display="flex" justifyContent="center" alignItems="center" border="2px solid #20ECC7" borderRadius={4} py={2}>
								<Icon mr={2} as={BsLightningChargeFill} />
								<Text>{user.username}</Text>
							</Box>
						</HStack>
						<TwitterLogin nextPath={nextPath}/>
					</Box>
				);

			default:
				return (
					<>
						<Text>{useDescription}</Text>
						{ !hasTwitterAccount(user) ? <Box className={classes.twitterContainer}>
							<TwitterLogin nextPath={nextPath}/>
						</Box>
							: <HStack ml="calc(50% - 124px)" w="100%" spacing="25px" my={5}>
								<Avatar name={user.username} src={user.imageUrl} />
								<Box w="200px" display="flex" justifyContent="center" alignItems="center" border="2px solid #20ECC7" borderRadius={4} py={2}>
									<Icon mr={2} as={SiTwitter} />
									<Text>{user.username}</Text>
								</Box>
							</HStack>
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
				<ModalHeader><Text fontSize="lg" fontWeight="bold">{modalTitle}</Text></ModalHeader>
				<ModalCloseButton />
				<ModalBody >
					{renderModalBody()}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
