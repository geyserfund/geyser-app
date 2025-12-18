import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { useProjectToolkit } from '@/shared/utils/hooks/useProjectToolKit.ts'
import { aonProjectTimeLeft } from '@/shared/utils/project/getAonData.ts'
import { ProjectAonGoalStatus } from '@/types/index.ts'

import { LiveProgressAqua } from '../../../../../../../../../shared/components/feedback/LiveProgressAqua.tsx'

const aonGoalFailedStatuses = [ProjectAonGoalStatus.Failed, ProjectAonGoalStatus.Cancelled]

export const AonProjectBalanceDisplay = () => {
  const { project } = useProjectAtom()

  const { formatAmount, formatUsdAmount } = useCurrencyFormatter()

  const { isFundingDisabled, getProjectBalance, getAonGoalPercentage } = useProjectToolkit(project)

  /** Calculate time left for AON project showing only the largest time unit */
  const timeLeft = useMemo(() => aonProjectTimeLeft(project.aonGoal), [project.aonGoal])

  const { sats: balance, usdCents: balanceUsdCent } = getProjectBalance()
  const goalAmount = project.aonGoal?.goalAmount

  const percent = getAonGoalPercentage()

  const fundingDisabled = isFundingDisabled()

  const failedStatus = project.aonGoal?.status && aonGoalFailedStatuses.includes(project.aonGoal.status)
  const fillGradient = failedStatus
    ? 'linear-gradient(90deg, #b9e8fa 0%, #c4d2e2 25%, #d4e6ef 55%, #a1b8ca 100%)'
    : 'linear-gradient(90deg,#00E4FF 0%,#00F5D4 45%,#4ADE80 100%)'
  const glowColor = failedStatus ? '#a1b8ca' : '#00E4FF'

  return (
    <VStack w="full" justifyContent={'space-between'} minHeight="128px" spacing={4}>
      <LiveProgressAqua
        value={60}
        height={22}
        radius={16}
        label="All-or-Nothing"
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
          <Body size="2xl" bold dark lineHeight={1}>
            {formatAmount(balance ?? 0, 'BTCSAT')}
          </Body>

          <Body size="md" light display="inline">
            <Body as="span" dark medium>
              {formatAmount(balanceUsdCent ?? 0, 'USDCENT')}
            </Body>
            {` ${t('raised')} `}
          </Body>
          <VStack w="full" display="flex" justifyContent="center" alignItems="start" spacing={0} pt={6}>
            <Body size="xl" bold dark lineHeight={1}>
              {project.fundersCount ?? 0}
            </Body>
            <Body size="md" light display="inline">
              {t('backers')}
            </Body>
          </VStack>
        </VStack>
        <VStack display="flex" justifyContent="center" alignItems="start" spacing={0}>
          <Body size="lg" bold dark lineHeight={1}>
            {formatAmount(goalAmount ?? 0, 'BTCSAT')}
          </Body>

          <Body size="md" light display="inline">
            <Body as="span" dark medium>
              {formatUsdAmount(goalAmount ?? 0)}
            </Body>
            {` ${t('goal')} `}
          </Body>

          {timeLeft && (
            <VStack w="full" display="flex" justifyContent="center" alignItems="start" spacing={0} pt={6}>
              <Body size="xl" bold dark lineHeight={1}>
                {timeLeft.value}
              </Body>
              <Body size="md" light display="inline">
                {timeLeft.label}
              </Body>
            </VStack>
          )}
        </VStack>
      </HStack>
    </VStack>
  )
}
