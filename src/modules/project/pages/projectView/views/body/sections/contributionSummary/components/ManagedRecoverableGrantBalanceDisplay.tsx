import { HStack, Tooltip } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { PiInfo } from 'react-icons/pi'

import { isManagedRecoverableGrantProject } from '@/modules/project/domain/managedRecoverableGrant.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getTimeLeft } from '@/shared/utils/project/getAonData.ts'

import { RecoverableGrantTooltipLabel } from '../../recoverableGrant/RecoverableGrantExplainer.tsx'
import { GoalCampaignBalanceDisplay } from './GoalCampaignBalanceDisplay.tsx'

/** AON-style presentation for an Open-Funding Recoverable Grant's protected goal. */
export const ManagedRecoverableGrantBalanceDisplay = () => {
  const { project } = useProjectAtom()

  if (!isManagedRecoverableGrantProject(project)) return null

  const { fundingSummary } = project
  const goalSats = fundingSummary?.goalSats
  if (goalSats === null || goalSats === undefined) return null

  const endsAt = fundingSummary.endsAt ? DateTime.fromMillis(Number(fundingSummary.endsAt)) : null
  const timeLeft = endsAt ? getTimeLeft(endsAt) : null

  return (
    <GoalCampaignBalanceDisplay
      label={
        <HStack spacing={1}>
          <span>{t('Recoverable Grant')}</span>
          <Tooltip label={<RecoverableGrantTooltipLabel />} hasArrow placement="top">
            <span aria-label={t('Recoverable grant information')}>
              <PiInfo />
            </span>
          </Tooltip>
        </HStack>
      }
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
