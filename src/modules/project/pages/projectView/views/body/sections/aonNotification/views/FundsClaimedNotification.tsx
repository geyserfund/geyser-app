import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

export const FundsClaimedNotification = () => {
  const { isProjectOwner } = useProjectAtom()

  if (isProjectOwner) {
    return (
      <Feedback variant={FeedBackVariant.SUCCESS}>
        <VStack spacing={1} align="stretch">
          <Body size="xl" bold>
            {t('Funds claimed')}
          </Body>
          <Body dark>
            {t(
              'You have successfully claimed the funds. The project is still publicly visible but cannot receive contributions. If you wish to continue receiving contributions to this project, please reach out to us at support@geyser.fund.',
            )}
          </Body>
        </VStack>
      </Feedback>
    )
  }

  return (
    <Feedback variant={FeedBackVariant.SUCCESS}>
      <Body size="xl" bold>
        {t('Successfully funded!')}
      </Body>
    </Feedback>
  )
}
