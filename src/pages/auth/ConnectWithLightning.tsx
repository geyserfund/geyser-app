import {
  Box,
  Button,
  ButtonProps,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { QRCode } from 'react-qrcode-logo'

import { LogoDarkGreenImage } from '../../assets'
import { BoltSvgIcon } from '../../components/icons'
import { ButtonComponent } from '../../components/ui'
import Loader from '../../components/ui/Loader'
import { AUTH_SERVICE_ENDPOINT } from '../../constants'
import { useAuthContext } from '../../context'
import { defaultUser } from '../../defaults'
import { lightModeColors } from '../../styles'
import { User } from '../../types'
import {
  copyTextToClipboard,
  useMobileMode,
  useNotification,
} from '../../utils'
import { startWebLNFlow } from './components/webLnFlow'

interface ConnectWithLightningModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ConnectWithLightningProps extends ButtonProps {
  onClose?: () => void
}

export const ConnectWithLightning = ({
  onClose,
  ...rest
}: ConnectWithLightningProps) => {
  const {
    isOpen: isModalOpen,
    onClose: onModalClose,
    onOpen: onModalOpen,
  } = useDisclosure()

  const handleClose = () => {
    if (onClose) {
      onClose()
    }

    onModalClose()
  }

  return (
    <>
      <Button
        w="100%"
        backgroundColor="social.lightning"
        leftIcon={<BoltSvgIcon height="20px" width="20px" />}
        _hover={{ backgroundColor: 'social.lightningDark' }}
        color="black"
        onClick={onModalOpen}
        {...rest}
      >
        Lightning
      </Button>
      {/* To make sure the polling gets stopped, the component is demounted. */}
      {isModalOpen && (
        <ConnectWithLightningModal isOpen={isModalOpen} onClose={handleClose} />
      )}
    </>
  )
}

export const ConnectWithLightningModal = ({
  isOpen,
  onClose,
}: ConnectWithLightningModalProps) => {
  const isMobile = useMobileMode()
  const { toast } = useNotification()
  const { setUser } = useAuthContext()

  const [qrContent, setQrContent] = useState('')
  const [copy, setcopy] = useState(false)

  const handleCopy = () => {
    copyTextToClipboard(qrContent)
    setcopy(true)
    setTimeout(() => {
      setcopy(false)
    }, 2000)
  }

  const handleLnurlLogin = async () => {
    fetch(`${AUTH_SERVICE_ENDPOINT}/lnurl`, {
      credentials: 'include',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then(({ lnurl }) => {
        setQrContent(lnurl)
        startWebLNFlow({ paymentRequest: lnurl, toast })
      })
      .catch((err) => {
        toast({
          status: 'error',
          title: 'Something went wrong.',
          description: 'Please try again',
        })
      })
  }

  useEffect(() => {
    if (isOpen) {
      handleLnurlLogin()
    }
  }, [isOpen])

  useEffect(() => {
    if (!qrContent) {
      return
    }

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
            throw new Error(response.reason)
          }

          const { user: userData }: { user: User } = response

          if (userData) {
            setUser({ ...defaultUser, ...userData })
            onClose()
          }
        })
        .catch((err) => {
          clearInterval(id)
          toast({
            title: 'Something went wrong',
            description: `The authentication request failed: ${err.message}.`,
            status: 'error',
          })
        })
    }, 1000)

    return () => clearInterval(id)
  }, [qrContent])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center" padding="20px 15px">
        <ModalHeader>
          <Text fontSize="lg" fontWeight="bold">
            Connect with Lightning
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody width="100%">
          <Box
            justifyContent="center"
            alignItems="center"
            marginTop={2}
            marginLeft={2}
            marginRight={2}
          >
            <Text marginBottom={5}>
              Scan the QR code to connect to your Lightning wallet.
            </Text>

            <Link
              href="https://github.com/fiatjaf/lnurl-rfc#lnurl-documents"
              isExternal
              fontSize="sm"
              textDecoration="underline"
            >
              Check if your wallet supports LNURL-auth here.
            </Link>
            <VStack marginTop={3} marginBottom={3}>
              <Box
                border="4px solid"
                borderColor="primary.400"
                borderRadius={4}
              >
                <Link href={`lightning:${qrContent}`}>
                  <QRCode
                    qrStyle="dots"
                    logoImage={LogoDarkGreenImage}
                    logoHeight={30}
                    logoWidth={30}
                    eyeRadius={2}
                    removeQrCodeBehindLogo={true}
                    bgColor={lightModeColors.neutral[0]}
                    fgColor={lightModeColors.primary[900]}
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
              border="1px solid"
              borderColor="neutral.200"
              borderRadius={4}
              p={2}
            >
              <Text w="75%" color="neutral.600" cursor="default">
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
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
