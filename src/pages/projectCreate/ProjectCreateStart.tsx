import { Box, Button, Image, ImageProps, Text, VStack } from '@chakra-ui/react'
import { PropsWithChildren, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import {
  getPath,
  LaunchProjectCoinsUrl,
  LaunchProjectEntryUrl,
  LaunchProjectFeesUrl,
  LaunchProjectGiftUrl,
  LaunchProjectKeyUrl,
  LaunchProjectWorldUrl,
} from '../../constants'
import { LIGHTNING_FEE_PERCENTAGE } from '../../constants/platform/wallet'
import { useAuthContext } from '../../context'
import { useMobileMode } from '../../utils'
import { ExternalAccountType, SocialAccountType } from '../auth'
import { ConnectWithNostr } from '../auth/ConnectWithNostr'
import { ConnectWithSocial } from '../auth/ConnectWithSocial'
import { useRefreshAuthToken } from '../auth/useAuthToken'
import { FormContinueButton } from './components/FormContinueButton'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'

export const ProjectCreateStart = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const { loading, isLoggedIn, user } = useAuthContext()
  const navigate = useNavigate()

  const params = useParams<{ projectId: string }>()

  const handleBack = () => navigate('/')

  const handleNext = () =>
    navigate(
      params.projectId ? `${getPath('privateProjectLaunch')}/${params.projectId}` : getPath('privateProjectLaunch'),
    )

  const userHasProjectCreatableAccounts = Boolean(
    user?.externalAccounts?.find((account) => account.accountType !== ExternalAccountType.lightning),
  )
  useRefreshAuthToken(!isLoggedIn || !userHasProjectCreatableAccounts)

  return (
    <ProjectCreateLayout
      title={<Text variant="h2">{t('Create a new project')}</Text>}
      continueButton={<FormContinueButton flexGrow={1} onClick={handleNext} isDisabled={!isLoggedIn} />}
      onBackClick={handleBack}
    >
      <VStack spacing={8} w="100%">
        <Text variant="h3">{t('Transform your ideas into real world projects backed by your community')}</Text>

        <Box display="flex" justifyContent="space-between" w="100%" flexWrap="wrap">
          <ProjectInfoButton src={LaunchProjectWorldUrl} alt="create project world">
            {t('Raise funds from anywhere in the world')}
          </ProjectInfoButton>
          <ProjectInfoButton src={LaunchProjectCoinsUrl} alt="create project lightning">
            {t('Receive funds from on-chain & lightning')}
          </ProjectInfoButton>
          <ProjectInfoButton src={LaunchProjectGiftUrl} alt="create project gift">
            {t('Sell rewards and perks for your project')}
          </ProjectInfoButton>
          <ProjectInfoButton src={LaunchProjectEntryUrl} alt="create project entry">
            {t('Update your community by writing Entries')}
          </ProjectInfoButton>
          <ProjectInfoButton src={LaunchProjectFeesUrl} alt="create project fees">
            {t(`Low ${LIGHTNING_FEE_PERCENTAGE}% fees and no fees for node-runners`)}
          </ProjectInfoButton>
          <ProjectInfoButton src={LaunchProjectKeyUrl} alt="create project key">
            {t('Remain in control of your funds')}
          </ProjectInfoButton>
        </Box>

        {!loading && (!isLoggedIn || !userHasProjectCreatableAccounts) ? (
          <VStack w="100%">
            <Text color="neutral.700" pb={3}>
              {t('You need to login before creating your project.')}
            </Text>
            <VStack>
              <ConnectWithSocial accountType={SocialAccountType.twitter} w="full" />
              {!isMobile && <ConnectWithNostr w="full" />}
              <ConnectWithSocial accountType={SocialAccountType.facebook} w="full" />
              <ConnectWithSocial accountType={SocialAccountType.google} w="full" />
              {/* <ConnectWithLightning w="full" /> */}
              <ConnectWithSocial accountType={SocialAccountType.github} w="full" />
            </VStack>

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
        ) : null}
      </VStack>
    </ProjectCreateLayout>
  )
}

const ProjectInfoButton = ({ src, alt, children }: PropsWithChildren<Pick<ImageProps, 'src' | 'alt'>>) => {
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
      <Image sx={isHover ? { transform: 'scale(1.2)' } : undefined} src={src} alt={alt} maxHeight="80px" />
      <Text whiteSpace="break-spaces" color="neutral.700">
        {children}
      </Text>
    </Button>
  )
}
