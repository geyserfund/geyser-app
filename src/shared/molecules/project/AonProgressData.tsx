import { t } from 'i18next'
import { DateTime } from 'luxon'

import { isManagedRecoverableGrantProject } from '@/modules/project/domain/managedRecoverableGrant.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useProjectToolkit } from '@/shared/utils/hooks/useProjectToolKit.ts'
import { aonProjectTimeLeft, getTimeLeft } from '@/shared/utils/project/getAonData.ts'
import type { ProjectForLandingPageFragment } from '@/types/index.ts'
import { ProjectFundingStrategy } from '@/types/index.ts'

export const AonProgressData = ({ project }: { project: ProjectForLandingPageFragment }) => {
  const { getAonGoalPercentage } = useProjectToolkit(project)
  const isAonProject = project.fundingStrategy === ProjectFundingStrategy.AllOrNothing
  const isManagedRecoverableGrant = isManagedRecoverableGrantProject(project)
  const percentage = isManagedRecoverableGrant ? project.fundingSummary.percentageFunded ?? 0 : getAonGoalPercentage()
  const managedEndsAt = project.fundingSummary.endsAt
    ? DateTime.fromMillis(Number(project.fundingSummary.endsAt))
    : null
  const timeLeft = isAonProject
    ? aonProjectTimeLeft(project.aonGoal)
    : managedEndsAt
    ? getTimeLeft(managedEndsAt)
    : null
  return (
    <Body
      size="sm"
      bold
      color={percentage > 100 ? 'primary1.11' : timeLeft?.unit !== 'day' ? 'warning.11' : 'neutral1.12'}
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
