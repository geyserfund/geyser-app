import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { useMemo } from 'react'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { PayoutRsk } from '@/modules/project/pages1/projectFunding/views/refundPayoutRsk/PayoutRsk.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

export const CampaignSuccessNotification = () => {
  const { project, isProjectOwner } = useProjectAtom()

  const payoutRskModal = useModal()

  /** Calculate days left for claiming funds */
  const daysLeft = useMemo(() => {
    if (!project.launchedAt || !project.aonGoalDurationInDays) {
      return '00:00:00'
    }

    const launchDate = DateTime.fromMillis(project.launchedAt)
    const claimDeadline = launchDate.plus({ days: project.aonGoalDurationInDays + 30 })
    const currentDateTime = DateTime.now()

    if (currentDateTime > claimDeadline) {
      return '00:00:00'
    }

    const duration = claimDeadline.diff(currentDateTime, ['days', 'hours', 'minutes']).toObject()
    const days = Math.floor(duration.days || 0)
    const hours = Math.floor(duration.hours || 0)
    const minutes = Math.floor(duration.minutes || 0)

    const formattedDays = days.toString().padStart(2, '0')
    const formattedHours = hours.toString().padStart(2, '0')
    const formattedMinutes = minutes.toString().padStart(2, '0')

    return `${formattedDays}:${formattedHours}:${formattedMinutes}`
  }, [project.launchedAt, project.aonGoalDurationInDays])

  if (!isProjectOwner) {
    return (
      <Feedback variant={FeedBackVariant.SUCCESS}>
        <Body size="xl" bold>
          {t('Successfully funded!')}
        </Body>
      </Feedback>
    )
  }

  return (
    <>
      <Feedback variant={FeedBackVariant.SUCCESS}>
        <VStack spacing={4} align="stretch">
          <Body size="xl" bold>
            {t('Congratulations, your campaign was a success!')}
          </Body>
          <Body dark>
            {t('You have')} {daysLeft} {t('days to claim the funds')}.
            {t('If you do not claim the funds on time, they will be returned to the contributors')}.
          </Body>
          <Button colorScheme="primary1" variant="solid" size="lg" w="full" onClick={payoutRskModal.onOpen}>
            {t('Claim funds now')}
          </Button>
        </VStack>
      </Feedback>
      <PayoutRsk {...payoutRskModal} project={project} />
    </>
  )
}
