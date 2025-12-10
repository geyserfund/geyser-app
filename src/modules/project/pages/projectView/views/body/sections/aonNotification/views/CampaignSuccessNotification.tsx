import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { Trans } from 'react-i18next'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { PayoutRsk } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/PayoutRsk.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { getTimeLeft } from '@/shared/utils/project/getAonData.ts'

export const CampaignSuccessNotification = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const { queryProject } = useProjectAPI()
  const payoutRskModal = useModal()

  /** Calculate days left for claiming funds */
  const daysLeft = useMemo(() => {
    if (!project.aonGoal?.deployedAt || !project.aonGoal?.goalDurationInDays) {
      return '00:00:00'
    }

    const launchDate = DateTime.fromMillis(project.aonGoal?.deployedAt)
    const claimDeadline = launchDate.plus({ days: (project.aonGoal?.goalDurationInDays || 0) + 30 })

    const timeLeft = getTimeLeft(claimDeadline)
    if (!timeLeft) {
      return '00:00:00'
    }

    return `${timeLeft.value} ${timeLeft.label}`
  }, [project.aonGoal?.deployedAt, project.aonGoal?.goalDurationInDays])

  if (!isProjectOwner) {
    return (
      <Feedback variant={FeedBackVariant.SUCCESS}>
        <Body size="xl" bold>
          {t('Successfully funded')}
        </Body>
      </Feedback>
    )
  }

  return (
    <>
      <Feedback variant={FeedBackVariant.SUCCESS}>
        <VStack spacing={4} align="stretch">
          <Body size="xl" bold>
            {t('Congratulations, your campaign was a success')}
          </Body>
          <Body dark>
            <Trans
              i18nKey="You have <1>{{timeLeft}}</1> to claim the funds. If you do not claim the funds on time, they will be returned to the contributors."
              values={{ timeLeft: daysLeft }}
            >
              {'You have '}
              <Body as="span" bold>
                {'{{timeLeft}}'}
              </Body>{' '}
              {t(
                'to claim the funds. If you do not claim the funds on time, they will be returned to the contributors.',
              )}
            </Trans>
          </Body>
          <Button colorScheme="primary1" variant="solid" size="lg" w="full" onClick={payoutRskModal.onOpen}>
            {t('Claim funds now')}
          </Button>
        </VStack>
      </Feedback>
      <PayoutRsk {...payoutRskModal} project={project} onCompleted={() => queryProject.execute()} />
    </>
  )
}
