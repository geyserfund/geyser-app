import { Button, Stack } from '@chakra-ui/react'
import { HStack, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

import { ConnectWithEmail } from '@/modules/auth/ConnectWithEmail'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'

import { useAuthContext } from '../../context'
import { SocialAccountType } from '../../modules/auth'
import { ConnectWithLightning } from '../../modules/auth/ConnectWithLightning'
import { ConnectWithNostr } from '../../modules/auth/ConnectWithNostr'
import {
  ConnectWithSocial,
  TWITTER_AUTH_ATTEMPT_KEY,
  TWITTER_AUTH_ATTEMPT_MESSAGE_TIME_MILLIS,
} from '../../modules/auth/ConnectWithSocial'
import { AuthFlowIntent } from '../../modules/auth/type.ts'
import { useAuthToken } from '../../modules/auth/useAuthToken.tsx'
import { hasFacebookAccount, hasGithubAccount, hasGoogleAccount, hasNostrAccount, hasTwitterAccount } from '../../utils'
import { Caption } from '../typography'

export type AuthModalAdditionalprops = {
  title?: string
  description?: string
  noEmailPopup?: boolean
  showTwitter?: boolean
  showNostr?: boolean
  showLightning?: boolean
  showFacebook?: boolean
  showGoogle?: boolean
  showGithub?: boolean
  privateRoute?: boolean
  authFlowIntent?: AuthFlowIntent
}
type AuthModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
} & AuthModalAdditionalprops

const ConnectAccounts = ({
  onClose,
  onSuccess,
  showTwitter,
  showFacebook,
  showNostr,
  showLightning,
  showGoogle,
  showGithub,
  authFlowIntent,
}: any) => {
  const { t } = useTranslation()
  const { user } = useAuthContext()

  const [failedTwitter, setFailedTwitter] = useState(false)

  useEffect(() => {
    const val = localStorage.getItem(TWITTER_AUTH_ATTEMPT_KEY)

    const previousAttemptTimeStamp = Number(val)
    const currentTimestamp = DateTime.now().toMillis()

    if (
      previousAttemptTimeStamp &&
      currentTimestamp - previousAttemptTimeStamp < TWITTER_AUTH_ATTEMPT_MESSAGE_TIME_MILLIS
    ) {
      setFailedTwitter(true)
    } else {
      setFailedTwitter(false)
    }
  }, [])

  const handleClose = () => {
    onClose()
    onSuccess?.()
  }

  return (
    <VStack width="full" justifyContent="center" alignItems="center">
      <Stack width="100%" spacing="10px">
        {!hasNostrAccount(user) && showNostr && (
          <ConnectWithNostr onClose={handleClose} authFlowIntent={authFlowIntent} />
        )}
        {!hasTwitterAccount(user) && showTwitter && (
          <ConnectWithSocial
            accountType={SocialAccountType.twitter}
            onClose={handleClose}
            authFlowIntent={authFlowIntent}
          />
        )}

        <HStack w="full" spacing="20px">
          {!hasFacebookAccount(user) && showFacebook && (
            <ConnectWithSocial
              accountType={SocialAccountType.facebook}
              onClose={handleClose}
              authFlowIntent={authFlowIntent}
              flex={1}
            />
          )}
          {!hasGoogleAccount(user) && showGoogle && (
            <ConnectWithSocial
              accountType={SocialAccountType.google}
              onClose={handleClose}
              authFlowIntent={authFlowIntent}
              flex={1}
            />
          )}
        </HStack>

        <HStack w="full" spacing="20px">
          {showLightning && <ConnectWithLightning flex={1} onClose={handleClose} authFlowIntent={authFlowIntent} />}
          {!hasGithubAccount(user) && showGithub && (
            <ConnectWithSocial
              flex={1}
              accountType={SocialAccountType.github}
              onClose={handleClose}
              authFlowIntent={authFlowIntent}
            />
          )}
        </HStack>
      </Stack>
      {failedTwitter && (
        <Caption paddingTop="5px">
          {t(
            "If you're having trouble connecting with Twitter on Mobile, first try logging in on Twitter.com on your browser, then try again.",
          )}
        </Caption>
      )}
    </VStack>
  )
}

export const AuthModal = (authModalProps: AuthModalProps) => {
  const { t } = useTranslation()

  const [isOtpStarted, setIsOtpStarted] = useState(false)

  const {
    isOpen,
    onClose,
    onSuccess,
    title,
    description,
    noEmailPopup = false,
    showTwitter = true,
    showNostr = true,
    showLightning = true,
    showFacebook = true,
    showGoogle = true,
    showGithub = true,
    privateRoute = false,
    authFlowIntent = AuthFlowIntent.login,
  } = authModalProps

  const navigate = useNavigate()
  const location = useLocation()
  const [modalIntent, setModalIntent] = useState(authFlowIntent)

  useAuthToken(isOpen, modalIntent)

  const handlePrivateRouteModalClose = () => {
    if (privateRoute) {
      if (location.key) {
        navigate(-1)
      } else {
        navigate('/')
      }
    }
  }

  const isSignup = modalIntent === AuthFlowIntent.signup
  const modalTitle = isOtpStarted
    ? t('Check your email')
    : title || t(isSignup ? 'Create your Geyser account' : 'Sign in to Geyser')
  const modalDescription = t(
    description ||
      (isSignup
        ? 'Create a new account with the method you want to use for future sign-ins.'
        : 'Choose the same method you used when you created your account.'),
  )

  useEffect(() => {
    return () => {
      setIsOtpStarted(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setModalIntent(authFlowIntent)
    }
  }, [authFlowIntent, isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={privateRoute ? handlePrivateRouteModalClose : onClose}
      size="sm"
      closeOnOverlayClick={!privateRoute && !isOtpStarted}
      closeOnEsc={!privateRoute}
      onOverlayClick={handlePrivateRouteModalClose}
      onEsc={handlePrivateRouteModalClose}
      title={modalTitle}
      useInert={false}
    >
      <VStack w="full" justifyContent="center" paddingTop={3} alignItems="start" spacing={4}>
        {!noEmailPopup && (
          <ConnectWithEmail onClose={onClose} isOTPStarted={setIsOtpStarted} authFlowIntent={modalIntent} />
        )}
        {!isOtpStarted && (
          <>
            <VStack w="full" alignItems="start" spacing={0}>
              {modalDescription && <Body size="sm">{modalDescription}</Body>}
            </VStack>
            <ConnectAccounts
              onClose={onClose}
              onSuccess={onSuccess}
              showNostr={showNostr && window.nostr}
              showTwitter={showTwitter}
              showLightning={showLightning}
              showFacebook={showFacebook}
              showGoogle={showGoogle}
              showGithub={showGithub}
              authFlowIntent={modalIntent}
            />
            <Button
              alignSelf="center"
              variant="link"
              colorScheme="primary1"
              size="sm"
              onClick={() => setModalIntent(isSignup ? AuthFlowIntent.login : AuthFlowIntent.signup)}
            >
              {isSignup ? t('Already have an account? Sign in') : t('New to Geyser? Sign up')}
            </Button>
          </>
        )}
      </VStack>
    </Modal>
  )
}
