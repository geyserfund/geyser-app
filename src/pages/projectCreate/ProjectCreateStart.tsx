import {
  Box,
  Button,
  Image,
  ImageProps,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import {
  getPath,
  LaunchProjectEntryUrl,
  LaunchProjectFeesUrl,
  LaunchProjectGiftUrl,
  LaunchProjectKeyUrl,
  LaunchProjectLightningUrl,
  LaunchProjectRocketUrl,
  LaunchProjectWorldUrl,
} from '../../constants'
import { useAuthContext } from '../../context'
import { MfaAction } from '../../types'
import { hasNostrAccount, hasTwitterAccount, useMobileMode } from '../../utils'
import { ConnectWithNostr } from '../auth/ConnectWithNostr'
import { ConnectWithTwitter } from '../auth/ConnectWithTwitter'
import { VerifyYourEmail } from '../otp'
import { FormContinueButton } from './components/FormContinueButton'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'

export const ProjectCreateStart = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const { loading, user, isLoggedIn } = useAuthContext()
  const navigate = useNavigate()

  const { isOpen, onClose, onOpen } = useDisclosure()

  const params = useParams<{ projectId: string }>()

  const handleBack = () => navigate('/')

  const handleNext = () =>
    navigate(
      params.projectId
        ? `${getPath('privateProjectLaunch')}/${params.projectId}`
        : getPath('privateProjectLaunch'),
    )

  useEffect(() => {
    if (isLoggedIn) {
      if (!user.email || !user.isEmailVerified) {
        onOpen()
      } else {
        onClose()
      }
    }
  }, [user, isLoggedIn, onOpen, onClose])

  return (
    <ProjectCreateLayout
      title={<Text variant="h2">{t('Create a new project')}</Text>}
      onBackClick={handleBack}
    >
      <VStack spacing={8} w="100%">
        <Image src={LaunchProjectRocketUrl} alt="create project rocket" />

        <Text variant="h3">
          {t(
            'Transform your ideas into real world projects backed by your community',
          )}
        </Text>

        <Box
          display="flex"
          justifyContent="space-between"
          w="100%"
          flexWrap="wrap"
        >
          <ProjectInfoButton
            src={LaunchProjectWorldUrl}
            alt="create project world"
          >
            {t('Raise funds from anywhere in the world')}
          </ProjectInfoButton>
          <ProjectInfoButton
            src={LaunchProjectLightningUrl}
            alt="create project lightning"
          >
            {t('Receive funds from on-chain & lightning')}
          </ProjectInfoButton>
          <ProjectInfoButton
            src={LaunchProjectGiftUrl}
            alt="create project gift"
          >
            {t('Sell rewards and perks for your project')}
          </ProjectInfoButton>
          <ProjectInfoButton
            src={LaunchProjectEntryUrl}
            alt="create project entry"
          >
            {t('Update your community by writing Entries')}
          </ProjectInfoButton>
          <ProjectInfoButton
            src={LaunchProjectFeesUrl}
            alt="create project fees"
          >
            {t('Low 2% fees and no fees for node-runners')}
          </ProjectInfoButton>
          <ProjectInfoButton src={LaunchProjectKeyUrl} alt="create project key">
            {t('Remain in control of your funds')}
          </ProjectInfoButton>
        </Box>

        {!loading && !hasTwitterAccount(user) && !hasNostrAccount(user) ? (
          <VStack w="100%">
            <Text color="neutral.700" pb={3}>
              {t(
                'You need to login with Twitter or Nostr, which connects your social profile to your project.',
              )}
            </Text>
            <ConnectWithTwitter />
            <ConnectWithNostr />
            {!isMobile ? (
              <Text color="neutral.600" variant="caption">
                {t(
                  "If twitter button isn't opening a Twitter authentication page, make sure pop-ups are enabled in your browser's preferences.",
                )}
              </Text>
            ) : null}

            {/* 
            // @TODO: Open hotjar?
            <Text
              color="neutral.600"
              w="100%"
              textAlign="left"
              variant="caption"
            >
              Looking for another login method? Let us know <Link>here</Link>.
            </Text> */}
          </VStack>
        ) : (
          <Box w="100%">
            <FormContinueButton width="100%" onClick={handleNext} />
          </Box>
        )}
      </VStack>
      <VerifyYourEmail
        isOpen={isOpen}
        onClose={() => {}}
        noClose={true}
        action={MfaAction.UserEmailVerification}
      />
    </ProjectCreateLayout>
  )
}

const ProjectInfoButton = ({
  src,
  alt,
  children,
}: PropsWithChildren<Pick<ImageProps, 'src' | 'alt'>>) => {
  const [isHover, setHover] = useState(false)
  return (
    <Button
      my={2}
      flexGrow={0}
      variant="secondary"
      height="160px"
      width="160px"
      display="flex"
      _hover={{}}
      _active={{}}
      cursor="default"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image
        sx={isHover ? { transform: 'scale(1.2)' } : undefined}
        src={src}
        alt={alt}
      />
      <Text whiteSpace="break-spaces" color="neutral.700">
        {children}
      </Text>
    </Button>
  )
}
