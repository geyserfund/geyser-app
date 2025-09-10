import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { useMemo } from 'react'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'

import { LiveProgressAqua } from '../../../../../../../../../shared/components/feedback/LiveProgressAqua.tsx'

export const AonProjectBalanceDisplay = () => {
  const { project } = useProjectAtom()

  const { balance, balanceUsdCent } = project

  const { formatAmount } = useCurrencyFormatter()

  /** Calculate time left for AON project showing only the largest time unit */
  const timeLeft = useMemo(() => {
    if (!project.launchedAt || !project.aonGoalDurationInDays) {
      return null
    }

    const launchDate = DateTime.fromMillis(project.launchedAt)
    const aonEndDate = launchDate.plus({ days: project.aonGoalDurationInDays })
    const currentDateTime = DateTime.now()

    if (currentDateTime >= aonEndDate) {
      return null // Time is up, don't show the component
    }

    const duration = aonEndDate.diff(currentDateTime, ['days', 'hours', 'minutes', 'seconds']).toObject()
    const days = Math.floor(duration.days || 0)
    const hours = Math.floor(duration.hours || 0)
    const minutes = Math.floor(duration.minutes || 0)
    const seconds = Math.floor(duration.seconds || 0)

    // Show the largest available time unit
    if (days > 0) {
      return { value: days, label: days === 1 ? t('day left') : t('days left') }
    }

    if (hours > 0) {
      return { value: hours, label: hours === 1 ? t('hour left') : t('hours left') }
    }

    if (minutes > 0) {
      return { value: minutes, label: minutes === 1 ? t('minute left') : t('minutes left') }
    }

    if (seconds > 0) {
      return { value: seconds, label: seconds === 1 ? t('second left') : t('seconds left') }
    }

    return null // No time left
  }, [project.launchedAt, project.aonGoalDurationInDays])

  // Don't render the component if time is up

  const percent = useMemo(() => {
    if (!project.aonGoalInSats || !balance) {
      return 0
    }

    return (balance * 100) / project.aonGoalInSats
  }, [balance, project.aonGoalInSats])

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
