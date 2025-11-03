import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { aonProjectTimeLeft } from '@/shared/utils/project/getAonData.ts'

import { LiveProgressAqua } from '../../../../../../../../../shared/components/feedback/LiveProgressAqua.tsx'

export const AonProjectBalanceDisplay = () => {
  const { project } = useProjectAtom()

  const { balance, balanceUsdCent } = project

  const { formatAmount } = useCurrencyFormatter()

  /** Calculate time left for AON project showing only the largest time unit */
  const timeLeft = useMemo(() => aonProjectTimeLeft(project.aonGoal), [project.aonGoal])

  // Don't render the component if time is up

  const percent = useMemo(() => {
    if (!project.aonGoal?.goalAmount || !balance) {
      return 0
    }

    return (balance * 100) / project.aonGoal.goalAmount
  }, [balance, project.aonGoal?.goalAmount])

  return (
    <VStack w="full" justifyContent={'space-between'} minHeight="128px" spacing={4}>
      <LiveProgressAqua
        value={percent}
        height={22}
        radius={16}
        label="All-or-Nothing"
        fillGradient="linear-gradient(90deg,#00E4FF 0%,#00F5D4 45%,#4ADE80 100%)"
        glowColor="#00E4FF"
        flowSpeedSec={15}
        waveIntensity={0.5}
        bubbleCount={Math.floor(1.2 * percent)}
        bubbleSpeed={0.2}
        bubbleSize={[2, 7]}
        sparkleCount={50}
        sparkleDurationMs={950}
      />

      <VStack w="100%" display="flex" justifyContent="center" alignItems="start" spacing={0}>
        <Body size="2xl" bold dark lineHeight={1}>
          {formatAmount(balance ?? 0, 'BTCSAT')}
        </Body>

        <Body size="md" light display="inline">
          <Body as="span" dark medium>
            {formatAmount(balanceUsdCent ?? 0, 'USDCENT')}
          </Body>
          {` ${t('contributed in total')} `}
        </Body>
      </VStack>

      <HStack w="full" justifyContent="start">
        <VStack w="full" display="flex" justifyContent="center" alignItems="start" spacing={0}>
          <Body size="xl" bold dark lineHeight={1}>
            {project.fundersCount ?? 0}
          </Body>
          <Body size="md" light display="inline">
            {t('backers')}
          </Body>
        </VStack>
        {timeLeft && (
          <VStack w="full" display="flex" justifyContent="center" alignItems="start" spacing={0}>
            <Body size="xl" bold dark lineHeight={1}>
              {timeLeft.value}
            </Body>
            <Body size="md" light display="inline">
              {timeLeft.label}
            </Body>
          </VStack>
        )}
      </HStack>
    </VStack>
  )
}
