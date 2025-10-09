import { Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

export default function CampaignFailedNotification() {
  const { isProjectOwner } = useProjectAtom()

  if (isProjectOwner) {
    return (
      <Feedback variant={FeedBackVariant.NEUTRAL}>
        <VStack spacing={1} align="stretch">
          <Body size="xl" bold>
            {t('Campaign failed!')}
          </Body>
          <Body dark>{t('Your project was unsuccessful and the funds will be returned to contributors.')}</Body>
        </VStack>
      </Feedback>
    )
  }

  return (
    <Feedback variant={FeedBackVariant.NEUTRAL}>
      <VStack spacing={1} align="stretch">
        <Body size="xl" bold>
          {t('Campaign failed!')}
        </Body>
        <Body dark>
          {t('The project did not reach its funding goal and the funds are being returned to the contributors.')}
        </Body>
        <HStack w="full" justifyContent="flex-end">
          <Button colorScheme="neutral1" variant="solid" size="lg">
            {t('Donate to matching')}
          </Button>
          <Button colorScheme="primary1" variant="solid" size="lg">
            {t('Claim your funds')}
          </Button>
        </HStack>
      </VStack>
    </Feedback>
  )
}
