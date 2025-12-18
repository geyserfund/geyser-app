import { Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import { Link } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { getAonFailedClaimDeadline } from '@/shared/utils/project/getAonData.ts'

export default function CampaignFailedNotification({
  hasFundedToCampaign,
  onOpen,
}: {
  hasFundedToCampaign: boolean
  onOpen: () => void
}) {
  const { isProjectOwner, project } = useProjectAtom()
  const daysLeft = getAonFailedClaimDeadline(project.aonGoal)

  if (isProjectOwner) {
    return (
      <Feedback variant={FeedBackVariant.NEUTRAL}>
        <VStack spacing={1} align="stretch">
          <Body size="xl" bold>
            {t('Campaign did not reach goal')}
          </Body>
          <Body dark>{t('Your project was unsuccessful and the funds will be returned to the contributors.')}</Body>
        </VStack>
      </Feedback>
    )
  }

  return (
    <Feedback variant={FeedBackVariant.NEUTRAL}>
      <VStack spacing={1} align="stretch">
        <Body size="xl" bold>
          {t('Campaign did not reach goal')}
        </Body>
        <Body dark>
          {t(
            'The campaign did not reach its funding goal, as a result the funds are being returned to the contributors.',
          )}
        </Body>
        {hasFundedToCampaign && (
          <>
            <Body dark>
              <Trans
                i18nKey="You have {{time}} {{unit}}  left to claim your refund. After that, unclaimed funds are automatically sent to the <4> Geyser Impact Fund.</4>"
                values={{ time: daysLeft?.value || 0, unit: daysLeft?.label || 'days' }}
              >
                {
                  'You have {{time}} {{unit}}  left to claim your refund. After that, unclaimed funds are automatically sent to the '
                }
                <Body as={Link} to={getPath('impactFund')}>
                  Geyser Impact Fund.
                </Body>
              </Trans>
            </Body>
            <HStack w="full" justifyContent="flex-end">
              <Button colorScheme="primary1" variant="solid" size="lg" onClick={onOpen}>
                {t('Claim your funds')}
              </Button>
            </HStack>
          </>
        )}
      </VStack>
    </Feedback>
  )
}
