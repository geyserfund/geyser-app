import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { aonProjectTimeLeft, getAonGoalPercentage } from '@/shared/utils/project/getAonData.ts'
import { ProjectAonGoalForLandingPageFragment } from '@/types/index.ts'

export const AonProgressData = ({ aonGoal }: { aonGoal: ProjectAonGoalForLandingPageFragment }) => {
  const percentage = getAonGoalPercentage(aonGoal)
  const timeLeft = aonProjectTimeLeft(aonGoal)
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
