import { Box, Collapse, HStack, Tooltip, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React, { useState } from 'react'
import { PiCaretDown, PiCheck, PiCopy, PiInfoFill } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { commaFormatted } from '@/utils/index.ts'

export type FeeBreakdownItem = {
  feeType: string
  description?: string | null
  amount: number
  currency: string
}

export type FeeSummary = {
  totalAmount: number
  currency: string
  items: FeeBreakdownItem[]
}

export type FeeSection = {
  /** Stable id so React reconciles correctly across renders */
  key: string
  label: string
  tooltip?: string
  summary: FeeSummary
  /** Whether this section's amount should be deducted from the net total. Defaults to true. */
  deductsFromNet?: boolean
  defaultOpen?: boolean
}

export type CopyableIdProps = {
  id: string
  label?: string
  hasCopied: boolean
  onCopy: () => void
  /** Number of characters of the ID to show before truncation. Default: 8 */
  visibleLength?: number
}

type PayoutSummaryPanelProps = {
  /** Title at the top of the panel. Default: "Payout Summary" */
  title?: string
  /** Label for the total balance row. Default: "Withdrawable balance" */
  totalLabel?: string
  /** Label for the final net amount row. Default: "Payout amount" */
  netLabel?: string
  /** The top-level amount displayed in the balance row, in sats. */
  amount: number
  /** Fee sections to display below the balance. Each can be collapsible with a breakdown. */
  fees?: FeeSection[]
  /** Optional copyable ID badge next to the title. */
  copyableId?: CopyableIdProps
}

const FEE_TYPE_LABELS: Record<string, string> = {
  AMBASSADOR: t('Ambassador fee'),
  PARTNER: t('Partner fee'),
  PLATFORM: t('Platform fee'),
  PROMOTION: t('Promotion fee'),
}

const formatFeeAmount = (amount: number, currency: string) => {
  if (currency === 'BTCSAT') {
    return t('{{amount}} sats', { amount: commaFormatted(amount) })
  }

  return commaFormatted(amount)
}

const FeeBreakdownRows = ({ items }: { items: FeeBreakdownItem[] }) => (
  <VStack align="stretch" spacing={1.5} pl={5}>
    {items.map((item, index) => (
      <HStack
        key={`${item.feeType}-${item.currency}-${item.description}-${index}`}
        justify="space-between"
        spacing={3}
        align="start"
      >
        <Body size="xs" color="neutral1.9" flex={1} minW={0}>
          {item.description || FEE_TYPE_LABELS[item.feeType] || item.feeType}
        </Body>
        <Body size="xs" color="neutral1.11" flexShrink={0}>
          {formatFeeAmount(item.amount, item.currency)}
        </Body>
      </HStack>
    ))}
  </VStack>
)

const FeeSectionRow = ({ section }: { section: FeeSection }) => {
  const hasBreakdown = section.summary.items.length > 0
  const [isOpen, setIsOpen] = useState(Boolean(section.defaultOpen) && hasBreakdown)

  const Header = (
    <HStack spacing={1.5} align="center">
      {hasBreakdown && (
        <Box
          color="neutral1.9"
          display="inline-flex"
          transition="transform 0.2s"
          transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
          flexShrink={0}
        >
          <PiCaretDown size={13} />
        </Box>
      )}
      <Body size="sm" color="neutral1.12">
        {section.label}
      </Body>
      {section.tooltip && (
        <Tooltip label={section.tooltip} placement="top" hasArrow>
          <Box
            as="span"
            color="neutral1.9"
            cursor="help"
            display="inline-flex"
            alignItems="center"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <PiInfoFill size={13} />
          </Box>
        </Tooltip>
      )}
    </HStack>
  )

  const Amount = (
    <Body size="sm" color="neutral1.12" flexShrink={0}>
      {formatFeeAmount(section.summary.totalAmount, section.summary.currency)}
    </Body>
  )

  return (
    <VStack align="stretch" spacing={2}>
      {hasBreakdown ? (
        <HStack
          justify="space-between"
          spacing={2}
          cursor="pointer"
          onClick={() => setIsOpen((v) => !v)}
          role="button"
          aria-expanded={isOpen}
        >
          {Header}
          {Amount}
        </HStack>
      ) : (
        <HStack justify="space-between" spacing={2}>
          {Header}
          {Amount}
        </HStack>
      )}

      {hasBreakdown && (
        <Collapse in={isOpen} animateOpacity>
          <FeeBreakdownRows items={section.summary.items} />
        </Collapse>
      )}
    </VStack>
  )
}

const CopyableIdBadge = ({ id, label, hasCopied, onCopy, visibleLength = 8 }: CopyableIdProps) => {
  const truncated = id.length > visibleLength ? `${id.slice(0, visibleLength)}…` : id
  const prefix = label ?? t('ID:')

  return (
    <HStack
      as="button"
      type="button"
      spacing={1}
      align="center"
      border="1px solid"
      borderColor="neutral1.5"
      borderRadius="md"
      px={2}
      py={0.5}
      onClick={onCopy}
      cursor="pointer"
      flexShrink={0}
      _hover={{ borderColor: 'neutral1.7', bg: 'neutral1.2' }}
      transition="all 0.15s"
    >
      <Body size="xs" color="neutral1.8" fontFamily="mono">
        {hasCopied ? t('Copied!') : `${prefix} ${truncated}`}
      </Body>
      <Box color="neutral1.7" display="inline-flex" alignItems="center">
        {hasCopied ? <PiCheck size={11} /> : <PiCopy size={11} />}
      </Box>
    </HStack>
  )
}

/** PayoutSummaryPanel: Right-column summary showing the balance, optional fee breakdown, and net amount. */
export const PayoutSummaryPanel: React.FC<PayoutSummaryPanelProps> = ({
  title = t('Payout Summary'),
  totalLabel = t('Withdrawable balance'),
  netLabel = t('Payout amount'),
  amount,
  fees = [],
  copyableId,
}) => {
  const visibleFees = fees.filter((fee) => fee.summary.totalAmount > 0)
  const deduction = visibleFees
    .filter((fee) => fee.deductsFromNet !== false)
    .reduce((sum, fee) => sum + fee.summary.totalAmount, 0)
  const netAmount = Math.max(0, amount - deduction)
  const showNet = deduction > 0

  return (
    <VStack align="stretch" spacing={4} w="full">
      <HStack justify="space-between" align="center" spacing={2}>
        <Body size="md" bold color="neutral1.12">
          {title}
        </Body>
        {copyableId && <CopyableIdBadge {...copyableId} />}
      </HStack>

      <HStack justify="space-between" spacing={2}>
        <Body size="sm" color="neutral1.12">
          {totalLabel}
        </Body>
        <Body size="sm" color="neutral1.12" flexShrink={0}>
          {t('{{amount}} sats', { amount: commaFormatted(amount) })}
        </Body>
      </HStack>

      {visibleFees.map((fee) => (
        <FeeSectionRow key={fee.key} section={fee} />
      ))}

      {showNet && (
        <HStack justify="space-between" spacing={3}>
          <Body size="sm" bold color="neutral1.12">
            {netLabel}
          </Body>
          <Body size="sm" bold color="neutral1.12" flexShrink={0}>
            {formatFeeAmount(netAmount, 'BTCSAT')}
          </Body>
        </HStack>
      )}
    </VStack>
  )
}
