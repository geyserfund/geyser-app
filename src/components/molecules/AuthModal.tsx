import Icon from '@chakra-ui/icon'
import { Box, Stack, Text } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { HStack, Link, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BsLightningChargeFill } from 'react-icons/bs'
import { QRCode } from 'react-qrcode-logo'
import { useLocation, useNavigate } from 'react-router'

import LogoDarkGreen from '../../assets/logo-dark-green.svg'
import {
  AUTH_SERVICE_ENDPOINT,
  authModalStates,
  IAuthModalState,
} from '../../constants'
import { useAuthContext } from '../../context'
import { defaultUser } from '../../defaults'
import { User } from '../../types/generated/graphql'
import { hasTwitterAccount, useMobileMode, useNotification } from '../../utils'
import { Caption } from '../typography'
import { ButtonComponent } from '../ui'
import Loader from '../ui/Loader'
import { TwitterConnect } from '.'
import { DisconnectAccounts } from '.'

interface IAuthModal {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  showTwitter?: boolean
  showLightning?: boolean
  privateRoute?: boolean
}

const LnurlConnect = ({
  setQrContent,
  setLnurlState,
}: {
  setQrContent: any
  setLnurlState: any
}) => {
  const { toast } = useNotification()
  const handleLnurlLogin = async () => {
    fetch(`${AUTH_SERVICE_ENDPOINT}/lnurl`, {
      credentials: 'include',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then(({ lnurl }) => {
        setQrContent(lnurl)
        setLnurlState()
      })
      .catch((err) => {
        toast({
          status: 'error',
          title: 'Something went wrong.',
          description: 'Please try again',
        })
      })
  }

  return (
    <ButtonComponent
      w="100%"
      primary
      standard
      backgroundColor="#ffe600"
      _hover={{ bg: '#e3c552' }}
      leftIcon={<Icon as={BsLightningChargeFill} />}
      onClick={async () => handleLnurlLogin()}
    >
      Lightning
    </ButtonComponent>
  )
}

const ConnectAccounts = ({
  setModalStates,
  setQrContent,
  onClose,
  showTwitter,
  showLightning,
}: any) => {
  const { user } = useAuthContext()
  const [setLnurlState] = setModalStates
  return (
    <VStack justifyContent="center" alignItems="center">
      <Text color="brand.textGrey2" fontSize="12px" marginBottom={5}>
        Connecting with Twitter or Lightning allows you to keep track of your
        favorite projects and to launch your own projects.
      </Text>
      <Stack width="100%">
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
      <Caption paddingTop="5px">
        {
          "If you're having trouble connecting with Twitter on Mobile, first try logging in on Twitter.com on your browser, then try again."
        }
      </Caption>
    </VStack>
  )
}

export const AuthModal = (authModalProps: IAuthModal) => {
  const {
    isOpen,
    onClose,
    title,
    description,
    showTwitter = true,
    showLightning = true,
    privateRoute = false,
  } = authModalProps

  const {
    user,
    setUser,
    isLoggedIn,
    isAuthModalOpen: loginIsOpen,
  } = useAuthContext()
  const { toast } = useNotification()
  const isMobile = useMobileMode()
  const navigate = useNavigate()
  const location = useLocation()
  const isMe = () => location.pathname === `/profile/${user.id}`

  const [qrContent, setQrContent] = useState('')
  const [modalState, setModalState] = useState<IAuthModalState>(
    isMe() ? authModalStates.manage : authModalStates.initial,
  )
  const [modalTitle, setModalTitle] = useState(
    title ||
      (modalState === authModalStates.manage ? 'Manage accounts' : 'Connect'),
  )
  const [modalDescription, setModalDescription] = useState(description)
  const [copy, setcopy] = useState(false)

  /*
	Handler Functions
	*/
  const handleCopy = () => {
    navigator.clipboard.writeText(qrContent)
    setcopy(true)
    setTimeout(() => {
      setcopy(false)
    }, 2000)
  }

  /*
	Set Modal State Functions
	*/
  const updateModalState = () => {
    if (isLoggedIn && isMe()) {
      if (modalState !== authModalStates.manage) {
        setManageState()
      }
    } else if (modalState !== authModalStates.initial) {
      setInitialState()
    }
  }

  const setLnurlState = () => {
    setModalTitle('Connect with Lightning')
    setModalDescription('Scan the QR code to connect to your Lightning wallet.')
    setModalState(authModalStates.lnurl)
  }

  const setManageState = () => {
    setModalTitle('Manage Accounts')
    setModalDescription('')
    setModalState(authModalStates.manage)
  }

  const setInitialState = () => {
    setModalTitle('Connect')
    setModalDescription(
      'Connect to launch your idea and to appear as a contributor when you fund an initiative.',
    )
    setModalState(authModalStates.initial)
  }

  /*
	UseEffect Functions
	*/
  useEffect(() => {
    updateModalState()
  }, [loginIsOpen])

  useEffect(() => {
    if (modalState === 'lnurl') {
      setModalTitle('Connect with Lightning')

      const id = setInterval(() => {
        let hasError = false

        fetch(`${AUTH_SERVICE_ENDPOINT}/access-token`, {
          credentials: 'include',
          redirect: 'follow',
        })
          .then((response) => {
            if (!(response.status >= 200 && response.status < 400)) {
              hasError = true
            }

            return response.json()
          })
          .then((response) => {
            if (hasError) {
              setModalTitle('Please try again.')
              throw new Error(response.reason)
            }

            const { user: userData }: { user: User } = response

            if (userData) {
              setUser({ ...defaultUser, ...userData })
              onClose()
            }
          })
          .catch((err) => {
            setModalTitle('Please try again.')
            setModalDescription('The authentication failed.')
            setModalState(
              isMe() ? authModalStates.manage : authModalStates.initial,
            )
            toast({
              title: 'Something went wrong',
              description: `The authentication request failed: ${err.message}.`,
              status: 'error',
            })
          })
      }, 1000)

      return () => clearInterval(id)
    }
  }, [modalState])

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
                <Link href={`lightning:${qrContent}`}>
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
                </Link>
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
        )

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
        )

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
        )
    }
  }

  // TODO: Fix the line below. This is intended to check if the previous route was internal. Replace the "Go Back" button
  // with a "Go To Home" button if the previous route was external.
  // const previousInternal = document.referrer && new URL(document.referrer).origin === new URL(history.location.pathname).origin;

  const handlePrivateRouteModalClose = () => {
    if (privateRoute) {
      navigate(-1)
    }
  }

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
  )
}
