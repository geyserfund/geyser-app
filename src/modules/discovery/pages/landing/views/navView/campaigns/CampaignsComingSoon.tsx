import { Button, Image, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { useAuthModal } from '@/modules/auth/hooks/useAuthModal.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { CampaignsComingSoonImageUrl, getPath } from '@/shared/constants/index.ts'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'

import { NewCampaigns } from './views/NewCampaigns.tsx'

export const CampaignsComingSoon = () => {
  const { isLoggedIn } = useAuthContext()

  const navigate = useNavigate()

  const { loginOnOpen } = useAuthModal()

  const handleLaunchCampaignButtonClick = () => {
    if (!isLoggedIn) {
      loginOnOpen({
        showLightning: false,
        noEmailPopup: true,
        showGoogle: false,
      })
    }

    navigate(getPath('launchProject'))
  }

  return (
    <VStack w="full" gap={10} paddingBottom={8} px={standardPadding}>
      <Stack w="full" gap={8} direction={{ base: 'column', lg: 'row' }} alignItems="center">
        <Image
          height="auto"
          width="full"
          maxWidth="400px"
          src={CampaignsComingSoonImageUrl}
          alt="Campaigns Coming Soon"
        />
        <VStack w="full" width="full" gap={4}>
          <H2 size={{ base: 'xl', lg: '2xl' }} bold textAlign="center">
            {t('Launch your biggest ideas on Bitcoin with confidence')} <br />
            {t('All-or-Nothing campaigns are coming soon')}
          </H2>

          <Body size="md" textAlign="center">
            {t(
              'We’re unlocking a new kind of crowdfunding on Bitcoin. One that empowers creators to go big with confidence. With All-or-Nothing funds are only released if your campaign reaches its goal. If it does not, contributors can get their sats back',
            )}
          </Body>
        </VStack>
      </Stack>

      <VStack w="full" gap={6}>
        <H2 size={{ base: 'xl', lg: '3xl' }} bold>
          {t('Early Launches')}
        </H2>
        <VStack w="full" gap={3} align="stretch">
          <NewCampaigns />
        </VStack>
      </VStack>

      <Button size="xl" colorScheme="primary1" onClick={handleLaunchCampaignButtonClick}>
        {t('Launch your campaign')}
      </Button>

      <VStack w="full" gap={2}>
        <H2 size="2xl" bold>
          {t('Coming soon')}
        </H2>
        <Body size="lg" textAlign="center">
          {t('Start building your campaign now and be prepared to launch as soon as Open launches are available.')}
        </Body>

        <Feedback variant={FeedBackVariant.INFO} noIcon maxWidth="500px">
          <VStack w="full" alignItems="start" gap={0}>
            <H3 size="xl" bold>
              {t('All or Nothing open launch')}
            </H3>
            <Body size="lg>">{t('End of January 2026')}</Body>
          </VStack>
        </Feedback>
      </VStack>

      <VStack w="full" maxW="800px">
        <H2 size={{ base: 'xl', lg: '2xl' }} bold>
          {t('Powered by')}
        </H2>
        <Image
          src={'https://storage.googleapis.com/geyser-projects-media/app/campaigns/rootstock_image.png'}
          height="60px"
          width="auto"
          alt="All or Nothing"
        />
      </VStack>
    </VStack>
  )
}
