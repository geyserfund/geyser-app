import { Button, HStack, Skeleton, Tooltip, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { PiInfo } from 'react-icons/pi'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { isRecoverableGrantProject } from '@/modules/project/utils/isRecoverableGrantProject.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { useProjectToolkit } from '@/shared/utils/hooks/useProjectToolKit.ts'
import { aonProjectTimeLeft, getFormattedAonGoalUserFacingDeadline } from '@/shared/utils/project/getAonData.ts'
import { ProjectAonGoalStatus } from '@/types/index.ts'

import { RecoverableGrantTooltipLabel } from '../../recoverableGrant/RecoverableGrantExplainer.tsx'
import { GoalCampaignBalanceDisplay } from './GoalCampaignBalanceDisplay.tsx'

const aonGoalFailedStatuses = [ProjectAonGoalStatus.Failed, ProjectAonGoalStatus.Cancelled]

export const AonProjectBalanceDisplay = () => {
  const { project, projectAonGoalLoading, projectAonGoalError } = useProjectAtom()
  const { queryProject } = useProjectAPI()

  const { formatAmount } = useCurrencyFormatter()

  const { isFundingDisabled, getProjectBalance, getAonGoalPercentage } = useProjectToolkit(project)

  /** Calculate time left for AON project showing only the largest time unit */
  const timeLeft = useMemo(() => aonProjectTimeLeft(project.aonGoal), [project.aonGoal])
  const deadlineLabel = useMemo(() => getFormattedAonGoalUserFacingDeadline(project.aonGoal), [project.aonGoal])

  const { sats: balance, usdCents: balanceUsdCent } = getProjectBalance()
  const goalAmount = project.aonGoal?.goalAmount

  const percent = getAonGoalPercentage()

  const fundingDisabled = isFundingDisabled()
  const isRecoverableGrant = isRecoverableGrantProject(project)

  const failedStatus = project.aonGoal?.status && aonGoalFailedStatuses.includes(project.aonGoal.status)
  if (!project.aonGoal && (projectAonGoalLoading || projectAonGoalError)) {
    return (
      <VStack w="full" justifyContent={'space-between'} minHeight="128px" spacing={4}>
        <HStack w="full" justifyContent="space-between">
          <VStack display="flex" justifyContent="center" alignItems="start" spacing={0}>
            <Body size="2xl" bold dark lineHeight={1} sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {formatAmount(project.balance ?? 0, 'BTCSAT')}
            </Body>
            <Body size="md" light display="inline">
              <Body as="span" dark medium sx={{ fontVariantNumeric: 'tabular-nums' }}>
                {formatAmount(project.balanceUsdCent ?? 0, 'USDCENT')}
              </Body>
              {` ${t('raised')} `}
            </Body>
          </VStack>
          <VStack display="flex" justifyContent="center" alignItems="start" spacing={0}>
            <Body size="xl" bold dark lineHeight={1} sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {project.fundersCount ?? 0}
            </Body>
            <Body size="md" light display="inline">
              {t('backers')}
            </Body>
          </VStack>
        </HStack>

        {projectAonGoalLoading ? (
          <Skeleton height="20px" width="100%" borderRadius="full" />
        ) : (
          <VStack w="full" alignItems="start" spacing={2}>
            <Body size="sm" light>
              {t('Could not fetch All-or-Nothing goal data. Try again later.')}
            </Body>
            <Button size="sm" variant="outline" colorScheme="neutral1" onClick={queryProject.execute}>
              {t('Retry')}
            </Button>
          </VStack>
        )}
      </VStack>
    )
  }

  return (
    <GoalCampaignBalanceDisplay
      label={
        isRecoverableGrant ? (
          <HStack spacing={1}>
            <span>{t('Recoverable Grant')}</span>
            <Tooltip label={<RecoverableGrantTooltipLabel />} hasArrow placement="top">
              <span aria-label={t('Recoverable grant information')}>
                <PiInfo />
              </span>
            </Tooltip>
          </HStack>
        ) : (
          t('All-or-Nothing (Beta)')
        )
      }
      raisedSats={balance ?? 0}
      raisedUsdCent={balanceUsdCent}
      goalSats={goalAmount ?? 0}
      fundersCount={project.fundersCount ?? 0}
      percentageFunded={percent}
      timeLeft={timeLeft}
      deadlineLabel={deadlineLabel}
      isFundingOpen={!fundingDisabled}
      failed={Boolean(failedStatus)}
    />
  )
}
