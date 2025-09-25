import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { aonProjectTimeLeft, getAonGoalPercentage } from '@/shared/utils/project/getAonData.ts'
import { Project } from '@/types/index.ts'

export const AonProgressData = ({
  project,
}: {
  project: Pick<Project, 'aonGoalInSats' | 'balance' | 'launchedAt' | 'aonGoalDurationInDays'>
}) => {
  const percentage = getAonGoalPercentage(project)
  const timeLeft = aonProjectTimeLeft(project)
  return (
    <Body
      size="sm"
      bold
      color={percentage > 100 ? 'primary1.11' : timeLeft?.label !== 'days left' ? 'warning.11' : 'neutral1.12'}
      isTruncated
    >
      {percentage ? (
        <>
          {timeLeft?.value} {timeLeft?.label} {' - '}
          <Body as="span" bold color={percentage >= 100 ? 'primary1.11' : 'neutral1.12'}>
            {percentage}% {t('funded')}
          </Body>
        </>
      ) : (
        t('Just launched!')
      )}
    </Body>
  )
}
