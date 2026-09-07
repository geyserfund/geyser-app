import { DateTime } from 'luxon'

import { isManagedCircularGrantProject } from '@/modules/project/domain/managedCircularGrant.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getTimeLeft } from '@/shared/utils/project/getAonData.ts'

import { CircularGrantBalanceLabel } from './CircularGrantBalanceLabel.tsx'
import { GoalCampaignBalanceDisplay } from './GoalCampaignBalanceDisplay.tsx'

/** AON-style presentation for an Open-Funding Circular Grant's protected goal. */
export const ManagedCircularGrantBalanceDisplay = () => {
  const { project } = useProjectAtom()

  if (!isManagedCircularGrantProject(project)) return null

  const { fundingSummary } = project
  const goalSats = fundingSummary?.goalSats
  if (goalSats === null || goalSats === undefined) return null

  const endsAt = fundingSummary.endsAt ? DateTime.fromMillis(Number(fundingSummary.endsAt)) : null
  const timeLeft = endsAt ? getTimeLeft(endsAt) : null

  return (
    <GoalCampaignBalanceDisplay
      label={<CircularGrantBalanceLabel />}
      raisedSats={fundingSummary.raisedSats}
      goalSats={goalSats}
      fundersCount={project.fundersCount ?? 0}
      percentageFunded={fundingSummary.percentageFunded ?? 0}
      timeLeft={timeLeft}
      deadlineLabel={endsAt?.toLocaleString(DateTime.DATETIME_MED) ?? null}
      isFundingOpen={fundingSummary.isFundingOpen}
    />
  )
}
