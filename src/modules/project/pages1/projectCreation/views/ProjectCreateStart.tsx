import { Box, Button, Image, ImageProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PropsWithChildren, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Body, H1, H3 } from '@/shared/components/typography'

import { useAuthContext } from '../../../../../context'
import { ExternalAccountType, SocialAccountType } from '../../../../../pages/auth'
import { ConnectWithNostr } from '../../../../../pages/auth/ConnectWithNostr'
import { ConnectWithSocial } from '../../../../../pages/auth/ConnectWithSocial'
import { useRefreshAuthToken } from '../../../../../pages/auth/useAuthToken'
import {
  getPath,
  LaunchProjectCoinsUrl,
  LaunchProjectEntryUrl,
  LaunchProjectFeesUrl,
  LaunchProjectGiftUrl,
  LaunchProjectKeyUrl,
  LaunchProjectWorldUrl,
  LIGHTNING_FEE_PERCENTAGE,
} from '../../../../../shared/constants'
import { useMobileMode } from '../../../../../utils'
import { FormContinueButton } from '../components/FormContinueButton'
import { ProjectCreateLayout } from '../components/ProjectCreateLayout'

export const ProjectCreateStart = () => {
  const isMobile = useMobileMode()
  const { loading, isLoggedIn, user } = useAuthContext()
  const navigate = useNavigate()

  const params = useParams<{ projectId: string }>()

  const handleBack = () => navigate('/')

  const handleNext = () => navigate(params.projectId ? `${getPath('launch')}/${params.projectId}` : getPath('launch'))

  const userHasProjectCreatableAccounts = Boolean(
    user?.externalAccounts?.find((account) => account.accountType !== ExternalAccountType.lightning),
  )
  useRefreshAuthToken(!isLoggedIn || !userHasProjectCreatableAccounts)

  return (
    <ProjectCreateLayout
      title={
        <H1 size="2xl" bold>
          {t('Create a new project')}
        </H1>
      }
      continueButton={<FormContinueButton flexGrow={1} onClick={handleNext} isDisabled={!isLoggedIn} />}
      onBackClick={handleBack}
    >
      <VStack spacing={6} w="100%">
        <H3 size="lg" medium>
          {t('Transform your ideas into real world projects backed by your community')}
        </H3>

        <Box display="flex" justifyContent="space-between" w="100%" flexWrap="wrap">
          <ProjectInfoButton src={LaunchProjectWorldUrl} alt="create project world">
            {t('Raise funds from anywhere in the world')}
          </ProjectInfoButton>
          <ProjectInfoButton src={LaunchProjectCoinsUrl} alt="create project lightning">
            {t('Receive funds from on-chain & lightning')}
          </ProjectInfoButton>
          <ProjectInfoButton src={LaunchProjectGiftUrl} alt="create project gift">
            {t('Sell anything to reward your contributors')}
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

        {!loading && (!isLoggedIn || (isLoggedIn && !userHasProjectCreatableAccounts)) ? (
          <VStack w="100%" spacing={3}>
            {isLoggedIn && !userHasProjectCreatableAccounts ? (
              <Body align="center">
                {t(
                  'To create a project you first need to connect a social account to your profile using one of the following methods: ',
                )}
              </Body>
            ) : (
              <Body>{t('You need to login before creating your project.')}</Body>
            )}

            <VStack>
              <ConnectWithSocial accountType={SocialAccountType.twitter} w="full" />
              {!isMobile && <ConnectWithNostr w="full" />}
              <ConnectWithSocial accountType={SocialAccountType.facebook} w="full" />
              <ConnectWithSocial accountType={SocialAccountType.google} w="full" />
              {/* <ConnectWithLightning w="full" /> */}
              <ConnectWithSocial accountType={SocialAccountType.github} w="full" />
            </VStack>

            {!isMobile ? (
              <Body size="sm" light>
                {t(
                  "If twitter button isn't opening a Twitter authentication page, make sure pop-ups are enabled in your browser's preferences.",
                )}
              </Body>
            ) : null}
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
      variant="outline"
      colorScheme="neutral1"
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
      <Body size="xs" light whiteSpace="break-spaces">
        {children}
      </Body>
    </Button>
  )
}
