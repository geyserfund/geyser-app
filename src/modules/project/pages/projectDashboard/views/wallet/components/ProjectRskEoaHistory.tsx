import { Badge, Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { usePrismWithdrawable } from '@/modules/project/pages/projectView/views/body/sections/tiaNotification/usePrismWithdrawable.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton.ts'

type ProjectRskEoaHistoryItem = {
  id: string | number | bigint
  rskAddress: string
  derivationPath?: string | null
  isCurrent: boolean
  createdAt?: string | Date | null
  replacedAt?: string | Date | null
}

export const ProjectRskEoaHistory = ({ rskEoas }: { rskEoas?: ProjectRskEoaHistoryItem[] | null }) => {
  if (!rskEoas?.length) return null

  const sortedRskEoas = [...rskEoas].sort((first, second) => Number(second.isCurrent) - Number(first.isCurrent))

  return (
    <VStack spacing={4} align="stretch" w="full">
      <VStack spacing={2} align="flex-start">
        <H2 size="md">{t('Project Rootstock wallets')}</H2>
        <Body size="sm" color="neutral1.10">
          {t(
            'Only the current address is used for new payouts. Historical addresses may still hold funds tied to an old seed/password.',
          )}
        </Body>
      </VStack>

      <Feedback variant={FeedBackVariant.WARNING}>
        <Body size="sm">
          {t(
            'Funds on historical addresses are not moved automatically and can only be recovered with the old seed/password backup.',
          )}
        </Body>
      </Feedback>

      <VStack spacing={3} align="stretch" w="full">
        {sortedRskEoas.map((rskEoa) => (
          <ProjectRskEoaHistoryRow key={`${rskEoa.id}`} rskEoa={rskEoa} />
        ))}
      </VStack>
    </VStack>
  )
}

const ProjectRskEoaHistoryRow = ({ rskEoa }: { rskEoa: ProjectRskEoaHistoryItem }) => {
  const { withdrawable, isLoading } = usePrismWithdrawable({ rskAddress: rskEoa.rskAddress })
  const { hasCopied, onCopy } = useCopyToClipboard(rskEoa.rskAddress)
  const balanceSats = withdrawable ? Number(withdrawable / 10000000000n) : 0

  return (
    <VStack align="stretch" spacing={3} borderWidth="1px" borderColor="neutral1.4" borderRadius="md" p={4} w="full">
      <HStack justify="space-between" align="flex-start" spacing={3}>
        <VStack align="flex-start" spacing={1} minW={0}>
          <HStack spacing={2}>
            <Badge colorScheme={rskEoa.isCurrent ? 'green' : 'gray'}>
              {rskEoa.isCurrent ? t('Current') : t('Historical')}
            </Badge>
            {!rskEoa.isCurrent && <Badge colorScheme="orange">{t('Old seed required')}</Badge>}
          </HStack>
          <Body size="sm" wordBreak="break-all">
            {rskEoa.rskAddress}
          </Body>
        </VStack>
        <Button size="sm" variant="outline" onClick={onCopy} flexShrink={0}>
          {hasCopied ? t('Copied') : t('Copy')}
        </Button>
      </HStack>

      <VStack align="stretch" spacing={1}>
        <Body size="sm" color="neutral1.10">
          {t('Derivation path: {{path}}', { path: rskEoa.derivationPath || t('Unavailable') })}
        </Body>
        <Body size="sm" color="neutral1.10">
          {isLoading
            ? t('Checking balance...')
            : t('Balance: {{balance}} sats', { balance: balanceSats.toLocaleString() })}
        </Body>
        {rskEoa.replacedAt ? (
          <Body size="sm" color="neutral1.10">
            {t('Replaced: {{date}}', { date: formatDate(rskEoa.replacedAt) })}
          </Body>
        ) : null}
      </VStack>
    </VStack>
  )
}

const formatDate = (date: string | Date) => new Date(date).toLocaleDateString()
