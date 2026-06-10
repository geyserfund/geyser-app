import { Button, HStack, Skeleton, Tooltip, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { PiInfo } from 'react-icons/pi'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { useProjectToolkit } from '@/shared/utils/hooks/useProjectToolKit.ts'
import { aonProjectTimeLeft, getFormattedAonGoalUserFacingDeadline } from '@/shared/utils/project/getAonData.ts'
import { ProjectAonGoalStatus } from '@/types/index.ts'

import { LiveProgressAqua } from '../../../../../../../../../shared/components/feedback/LiveProgressAqua.tsx'
import { RecoverableGrantTooltipLabel } from '../../recoverableGrant'

const aonGoalFailedStatuses = [ProjectAonGoalStatus.Failed, ProjectAonGoalStatus.Cancelled]

export const AonProjectBalanceDisplay = () => {
  const { project, projectAonGoalLoading, projectAonGoalError } = useProjectAtom()
  const { queryProject } = useProjectAPI()

  const { formatAmount, formatUsdAmount } = useCurrencyFormatter()

  const { isFundingDisabled, getProjectBalance, getAonGoalPercentage } = useProjectToolkit(project)

  /** Calculate time left for AON project showing only the largest time unit */
  const timeLeft = useMemo(() => aonProjectTimeLeft(project.aonGoal), [project.aonGoal])
  const deadlineLabel = useMemo(() => getFormattedAonGoalUserFacingDeadline(project.aonGoal), [project.aonGoal])

  const { sats: balance, usdCents: balanceUsdCent } = getProjectBalance()
  const goalAmount = project.aonGoal?.goalAmount

  const percent = getAonGoalPercentage()

  const fundingDisabled = isFundingDisabled()
  const isRecoverableGrant = Boolean((project as typeof project & { isRecoverableGrant?: boolean }).isRecoverableGrant)

  const failedStatus = project.aonGoal?.status && aonGoalFailedStatuses.includes(project.aonGoal.status)
  const fillGradient = failedStatus
    ? 'linear-gradient(90deg, #b9e8fa 0%, #c4d2e2 25%, #d4e6ef 55%, #a1b8ca 100%)'
    : 'linear-gradient(90deg,#00E4FF 0%,#00F5D4 45%,#4ADE80 100%)'
  const glowColor = failedStatus ? '#a1b8ca' : '#00E4FF'

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
    <VStack w="full" justifyContent={'space-between'} minHeight="128px" spacing={4}>
      <LiveProgressAqua
        value={percent}
        height={22}
        radius={16}
        label={
          isRecoverableGrant ? (
            <HStack spacing={1}>
              <span>{t('Recoverable Grant')}</span>
              <Tooltip label={<RecoverableGrantTooltipLabel />} hasArrow placement="top">
                <span>
                  <PiInfo />
                </span>
              </Tooltip>
            </HStack>
          ) : (
            t('All-or-Nothing (Beta)')
          )
        }
        fillGradient={fillGradient}
        glowColor={glowColor}
        flowSpeedSec={15}
        waveIntensity={0.5}
        bubbleCount={Math.floor(1.2 * percent)}
        bubbleSpeed={0.2}
        bubbleSize={[2, 7]}
        sparkleCount={50}
        sparkleDurationMs={950}
        removeLiveDot={fundingDisabled}
      />

      <HStack w="full" justifyContent="space-between">
        <VStack display="flex" justifyContent="center" alignItems="start" spacing={0}>
          <Body size="2xl" bold dark lineHeight={1} sx={{ fontVariantNumeric: 'tabular-nums' }}>
            {formatAmount(balance ?? 0, 'BTCSAT')}
          </Body>

          <Body size="md" light display="inline">
            <Body as="span" dark medium sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {formatAmount(balanceUsdCent ?? 0, 'USDCENT')}
            </Body>
            {` ${t('raised')} `}
          </Body>
          <VStack w="full" display="flex" justifyContent="center" alignItems="start" spacing={0} pt={6}>
            <Body size="xl" bold dark lineHeight={1} sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {project.fundersCount ?? 0}
            </Body>
            <Body size="md" light display="inline">
              {t('backers')}
            </Body>
          </VStack>
        </VStack>
        <VStack display="flex" justifyContent="center" alignItems="start" spacing={0}>
          <Body size="lg" bold dark lineHeight={1} sx={{ fontVariantNumeric: 'tabular-nums' }}>
            {formatAmount(goalAmount ?? 0, 'BTCSAT')}
          </Body>

          <Body size="md" light display="inline">
            <Body as="span" dark medium sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {formatUsdAmount(goalAmount ?? 0)}
            </Body>
            {` ${t('goal')} `}
          </Body>

          {timeLeft && (
            <Tooltip label={deadlineLabel ? t('Deadline: {{deadline}}', { deadline: deadlineLabel }) : undefined}>
              <VStack w="full" display="flex" justifyContent="center" alignItems="start" spacing={0} pt={6}>
                <Body size="xl" bold dark lineHeight={1} sx={{ fontVariantNumeric: 'tabular-nums' }}>
                  {timeLeft.value}
                </Body>
                <Body size="md" light display="inline">
                  {timeLeft.label}
                </Body>
              </VStack>
            </Tooltip>
          )}
        </VStack>
      </HStack>
    </VStack>
  )
}
