import { Box, Text, Stack } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { QRCode } from 'react-qrcode-logo';
import React, { useEffect, useState } from 'react';
// import { createUseStyles } from 'react-jss';
import { ButtonComponent } from '../ui';
import Icon from '@chakra-ui/icon';
import {
  AUTH_SERVICE_ENDPOINT,
  IAuthModalState,
  authModalStates,
} from '../../constants';
import { useHistory } from 'react-router';
import { BsLightningChargeFill } from 'react-icons/bs';
import { useAuthContext } from '../../context';
import { useNotification, isMobileMode, hasTwitterAccount } from '../../utils';
import LogoDarkGreen from '../../assets/logo-dark-green.svg';
import { HStack, Link, VStack } from '@chakra-ui/react';
import { TwitterConnect } from '.';
import Loader from '../ui/Loader';
import { DisconnectAccounts } from '.';

interface IAuthModal {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  showTwitter?: boolean;
  showLightning?: boolean;
  privateRoute?: boolean;
}

// const useStyles = createUseStyles({
// 	container: {
// 		marginTop: '20px',
// 		display: 'flex',
// 		flexDirection: 'column',
// 		justifyContent: 'center',
// 	},
// });

const LnurlConnect = ({
  setQrContent,
  setLnurlState,
}: {
  setQrContent: any;
  setLnurlState: any;
}) => {
  const handleLnurlLogin = async () => {
    fetch(`${AUTH_SERVICE_ENDPOINT}/lnurl`, {
      credentials: 'include',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then(({ lnurl }) => {
        setQrContent(lnurl);
        setLnurlState();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
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
  );
};

const ConnectAccounts = ({
  setModalStates,
  setQrContent,
  onClose,
  showTwitter,
  showLightning,
}: any) => {
  const { user } = useAuthContext();
  const [setLnurlState] = setModalStates;
  return (
    <Box justifyContent="center" alignItems="center">
      <Text fontSize="md" color="brand.textGrey2" fontWeight="bold" mb={1}>
        Connect
      </Text>
      <Text color="brand.textGrey2" marginBottom={5}>
        Connect more profiles.
      </Text>
      <Stack>
        {!hasTwitterAccount(user) && showTwitter && (
          <TwitterConnect onClose={onClose} />
        )}
        {showLightning && (
          <LnurlConnect
            setLnurlState={setLnurlState}
            setQrContent={setQrContent}
          />
        )}
      </Stack>
    </Box>
  );
};

export const AuthModal = (authModalProps: IAuthModal) => {
  const {
    isOpen,
    onClose,
    title,
    description,
    showTwitter = true,
    showLightning = true,
    privateRoute = false,
  } = authModalProps;

  const {
    user,
    setUser,
    isLoggedIn,
    isAuthModalOpen: loginIsOpen,
  } = useAuthContext();
  const { toast } = useNotification();
  const isMobile = isMobileMode();
  const history = useHistory();
  const isMe = () => history.location.pathname === `/profile/${user.id}`;

  const [qrContent, setQrContent] = useState('');
  const [modalState, setModalState] = useState<IAuthModalState>(
    isMe() ? authModalStates.manage : authModalStates.initial,
  );
  const [modalTitle, setModalTitle] = useState(
    title ||
      (modalState === authModalStates.manage ? 'Manage accounts' : 'Connect'),
  );
  const [modalDescription, setModalDescription] = useState(description);
  const [copy, setcopy] = useState(false);

  /*
	Handler Functions
	*/
  const handleCopy = () => {
    navigator.clipboard.writeText(qrContent);
    setcopy(true);
    setTimeout(() => {
      setcopy(false);
    }, 2000);
  };

  /*
	Set Modal State Functions
	*/
  const updateModalState = () => {
    if (isLoggedIn && isMe()) {
      if (modalState !== authModalStates.manage) {
        setManageState();
      }
    } else if (modalState !== authModalStates.initial) {
      setInitialState();
    }
  };

  const setLnurlState = () => {
    setModalTitle('Connect with Lightning');
    setModalDescription(
      'Scan the QR code to connect to your Lightning wallet.',
    );
    setModalState(authModalStates.lnurl);
  };

  const setManageState = () => {
    setModalTitle('Manage Accounts');
    setModalDescription('');
    setModalState(authModalStates.manage);
  };

  const setInitialState = () => {
    setModalTitle('Connect');
    setModalDescription(
      'Connect to launch your idea and to appear as a contributor when you fund an initiative.',
    );
    setModalState(authModalStates.initial);
  };

  /*
	useEffect Functions
	*/
  useEffect(() => {
    updateModalState();
  }, [loginIsOpen]);

  useEffect(() => {
    if (modalState === 'lnurl') {
      setModalTitle('Connect with Lightning');
      const id = setInterval(() => {
        let hasError = false;

        fetch(`${AUTH_SERVICE_ENDPOINT}/access-token`, {
          credentials: 'include',
          redirect: 'follow',
        })
          .then((response) => {
            if (!(response.status >= 200 && response.status < 400)) {
              hasError = true;
            }

            return response.json();
          })
          .then((response) => {
            if (hasError) {
              setModalTitle('Please try again.');
              throw new Error(response.reason);
            }

            const { user: newUser } = response;

            if (newUser) {
              setUser({ ...newUser });
              onClose();
            }
          })
          .catch((err) => {
            setModalTitle('Please try again.');
            setModalDescription('The authentication failed.');
            setModalState(
              isMe() ? authModalStates.manage : authModalStates.initial,
            );
            toast({
              title: 'Something went wrong',
              description: `The authentication request failed: ${err.message}.`,
              status: 'error',
            });
          });
      }, 1000);

      return () => clearInterval(id);
    }
  }, [modalState]);

  const renderModalBody = () => {
    switch (modalState) {
      case 'lnurl':
        return (
          <>
            <Link
              href="https://github.com/fiatjaf/lnurl-rfc#lnurl-documents"
              isExternal
              fontSize="sm"
              textDecoration="underline"
            >
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
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              </Box>
              <HStack justifyContent="center" alignItems="center" marginTop={3}>
                <Loader size="lg" />
                <Text>Waiting to connect...</Text>
              </HStack>
            </VStack>
            <Box
              display="flex"
              justifyContent="between"
              alignItems="center"
              border="1px solid lightgrey"
              borderRadius={4}
              p={2}
            >
              <Text w="75%" color="brand.textGrey" cursor="default">
                {qrContent?.slice(0, isMobile ? 21 : 30)}...
              </Text>
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
          </>
        );

      case 'manage':
        return (
          <>
            <ConnectAccounts
              setQrContent={setQrContent}
              setModalStates={[setLnurlState]}
              onClose={onClose}
              showTwitter={showTwitter}
              showLightning={showLightning}
            />
            <Box borderBottom="1px solid lightgrey" pb={5}></Box>
            <DisconnectAccounts />
          </>
        );

      default:
        return (
          <Box>
            <ConnectAccounts
              setQrContent={setQrContent}
              setModalStates={[setLnurlState]}
              onClose={onClose}
              showTwitter={showTwitter}
              showLightning={showLightning}
            />
          </Box>
        );
    }
  };

  // TODO: Fix the line below. This is intended to check if the previous route was internal. Replace the "Go Back" button
  // with a "Go To Home" button if the previous route was external.
  // const previousInternal = document.referrer && new URL(document.referrer).origin === new URL(history.location.pathname).origin;

  const handlePrivateRouteModalClose = () => {
    if (privateRoute) {
      history.goBack();
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={!privateRoute}
      closeOnEsc={!privateRoute}
      onOverlayClick={handlePrivateRouteModalClose}
      onEsc={handlePrivateRouteModalClose}
    >
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center" padding="20px 15px">
        <ModalHeader>
          <Text fontSize="lg" fontWeight="bold">
            {modalTitle}
          </Text>
        </ModalHeader>
        {privateRoute || <ModalCloseButton />}
        <ModalBody width="100%">
          <Box
            justifyContent="center"
            alignItems="center"
            marginTop={2}
            marginLeft={2}
            marginRight={2}
          >
            {modalDescription && (
              <Text marginBottom={5}>{modalDescription}</Text>
            )}
            {renderModalBody()}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop={5}
          >
            {privateRoute && (
              <ButtonComponent onClick={handlePrivateRouteModalClose}>
                Go Back
              </ButtonComponent>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
