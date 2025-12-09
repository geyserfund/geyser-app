import { Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

export const FailedToClaimNotification = ({
  hasFundedToCampaign,
  onOpen,
}: {
  hasFundedToCampaign: boolean
  onOpen: () => void
}) => {
  const { isProjectOwner } = useProjectAtom()

  if (isProjectOwner) {
    return (
      <Feedback variant={FeedBackVariant.NEUTRAL}>
        <VStack spacing={1} align="stretch">
          <Body size="xl" bold>
            {t('Funds not claimed!')}
          </Body>
          <Body dark>
            {t(
              'You were unsuccessful in claiming the funds. The funds of this project are being returned to contributors.',
            )}
          </Body>
        </VStack>
      </Feedback>
    )
  }

  return (
    <Feedback variant={FeedBackVariant.NEUTRAL}>
      <VStack spacing={1} align="stretch">
        <Body size="xl" bold>
          {t('Funds not claimed!')}
        </Body>
        <Body dark>
          {t('The creator failed to claim the funds of this project and they are being returned to contributors.')}
        </Body>
        {hasFundedToCampaign && (
          <HStack w="full" justifyContent="flex-end">
            <Button colorScheme="primary1" variant="solid" size="lg" onClick={onOpen}>
              {t('Claim your funds')}
            </Button>
          </HStack>
        )}
      </VStack>
    </Feedback>
  )
}
