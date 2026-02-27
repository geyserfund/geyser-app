import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { useProjectToolkit } from '@/shared/utils/hooks/useProjectToolKit'
import { aonProjectTimeLeft } from '@/shared/utils/project/getAonData.ts'
import { ProjectForLandingPageFragment } from '@/types/index.ts'

export const AonProgressData = ({ project }: { project: ProjectForLandingPageFragment }) => {
  const { getAonGoalPercentage } = useProjectToolkit(project)
  const percentage = getAonGoalPercentage()
  const timeLeft = aonProjectTimeLeft(project.aonGoal)
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
