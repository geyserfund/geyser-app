import { HStack, Tooltip, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import type { ReactNode } from 'react'

import { Body } from '@/shared/components/typography/Body.tsx'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import type { TimeLeft } from '@/shared/utils/project/getAonData.ts'

import { LiveProgressAqua } from '../../../../../../../../../shared/components/feedback/LiveProgressAqua.tsx'

type GoalCampaignBalanceDisplayProps = {
  label: ReactNode
  raisedSats: number
  raisedUsdCent?: number | null
  goalSats: number
  fundersCount: number
  percentageFunded: number
  timeLeft: TimeLeft | null
  deadlineLabel: string | null
  isFundingOpen: boolean
  failed?: boolean
}

/** Shared AON-style presentation for campaign-like project goals. */
export const GoalCampaignBalanceDisplay = ({
  label,
  raisedSats,
  raisedUsdCent,
  goalSats,
  fundersCount,
  percentageFunded,
  timeLeft,
  deadlineLabel,
  isFundingOpen,
  failed = false,
}: GoalCampaignBalanceDisplayProps) => {
  const { formatAmount, formatUsdAmount } = useCurrencyFormatter()
  const fillGradient = failed
    ? 'linear-gradient(90deg, #b9e8fa 0%, #c4d2e2 25%, #d4e6ef 55%, #a1b8ca 100%)'
    : 'linear-gradient(90deg,#00E4FF 0%,#00F5D4 45%,#4ADE80 100%)'
  const glowColor = failed ? '#a1b8ca' : '#00E4FF'

  return (
    <VStack w="full" justifyContent="space-between" minHeight="128px" spacing={4}>
      <LiveProgressAqua
        value={percentageFunded}
        height={22}
        radius={16}
        label={label}
        fillGradient={fillGradient}
        glowColor={glowColor}
        flowSpeedSec={15}
        waveIntensity={0.5}
        bubbleCount={Math.floor(1.2 * percentageFunded)}
        bubbleSpeed={0.2}
        bubbleSize={[2, 7]}
        sparkleCount={50}
        sparkleDurationMs={950}
        removeLiveDot={!isFundingOpen}
      />

      <HStack w="full" justifyContent="space-between">
        <VStack display="flex" justifyContent="center" alignItems="start" spacing={0}>
          <Body size="2xl" bold dark lineHeight={1} sx={{ fontVariantNumeric: 'tabular-nums' }}>
            {formatAmount(raisedSats, 'BTCSAT')}
          </Body>
          <Body size="md" light display="inline">
            <Body as="span" dark medium sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {raisedUsdCent === null || raisedUsdCent === undefined
                ? formatUsdAmount(raisedSats)
                : formatAmount(raisedUsdCent, 'USDCENT')}
            </Body>{' '}
            {t('raised')}
          </Body>
          <VStack w="full" display="flex" justifyContent="center" alignItems="start" spacing={0} pt={6}>
            <Body size="xl" bold dark lineHeight={1} sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {fundersCount}
            </Body>
            <Body size="md" light display="inline">
              {t('backers')}
            </Body>
          </VStack>
        </VStack>
        <VStack display="flex" justifyContent="center" alignItems="start" spacing={0}>
          <Body size="lg" bold dark lineHeight={1} sx={{ fontVariantNumeric: 'tabular-nums' }}>
            {formatAmount(goalSats, 'BTCSAT')}
          </Body>
          <Body size="md" light display="inline">
            <Body as="span" dark medium sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {formatUsdAmount(goalSats)}
            </Body>{' '}
            {t('goal')}
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
