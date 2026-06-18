import { Button, HStack, Icon, Link as ChakraLink, Tooltip, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import type { ReactNode } from 'react'
import { PiArrowUpRight } from 'react-icons/pi'
import { Link as RouterLink } from 'react-router'

import { MIN_BITCOIN_PAYOUT_SATS_FORMATTED } from '@/modules/project/constants/payout.ts'
import { usePrismWithdrawable } from '@/modules/project/pages/projectView/views/body/sections/tiaNotification/usePrismWithdrawable.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { __production__ } from '@/shared/constants/index.ts'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { getRootstockExplorerAddressUrl } from '@/shared/utils/external/rootstock.ts'

const SATS_PER_RBTC = 10000000000n
const CURRENT_PROJECT_DERIVATION_PATH_BASE = __production__ ? "m/44'/137'/0'/0" : "m/44'/37310'/0'/0"
const LEGACY_PROJECT_DERIVATION_PATH_BASE = __production__ ? "m/44'/137'/0'/1" : "m/44'/37310'/0'/1"
const PROJECT_WALLET_RECOVERY_GUIDE_URL =
  'https://guide.geyser.fund/geyser-docs/product-guides/project-features/recovering-funds-from-a-geyser-project-wallet'

type ProjectRskEoaHistoryItem = {
  id: string | number | bigint
  rskAddress: string
  derivationPath?: string | null
  isCurrent: boolean
  createdAt?: string | Date | null
  replacedAt?: string | Date | null
}

type ProjectRskEoaHistoryProps = {
  projectId: string | number | bigint
  currentRskEoa?: string | null
  rskEoas?: ProjectRskEoaHistoryItem[] | null
  profileSeedSettingsPath?: string
  withdraw?: ProjectWalletWithdrawButtonProps
}

type ProjectWalletWithdrawButtonProps = {
  showWithdrawableBalance: boolean
  isBelowMinWithdrawThreshold: boolean
  hasOngoingWithdraw: boolean
  showWithdraw: boolean
  onOpen: () => void
}

export const ProjectRskEoaHistory = ({
  projectId,
  currentRskEoa,
  rskEoas,
  profileSeedSettingsPath,
  withdraw,
}: ProjectRskEoaHistoryProps) => {
  const walletRows = getWalletRows({ projectId, currentRskEoa, rskEoas })

  if (!walletRows.length) return null

  const currentWallet = walletRows.find((rskEoa) => rskEoa.isCurrent)
  const historicalWallets = walletRows.filter((rskEoa) => !rskEoa.isCurrent)
  const derivationPath = currentWallet?.derivationPath || getCurrentProjectDerivationPath(projectId)

  return (
    <VStack spacing={5} align="stretch" w="full">
      <VStack spacing={2} align="flex-start" w="full">
        <Body size="xl" medium>
          {t('Project wallet')}
        </Body>
        <Body size="sm" color="neutral1.10">
          {t(
            'Only the current address is used for new payouts and withdrawals. The derivation path always uses the project ID as the final number.',
          )}
        </Body>
        <VStack align="stretch" spacing={1} pt={1} w="full">
          <Body size="md" medium>
            {t('Derivation path')}
          </Body>
          <Body size="sm" color="neutral1.11" wordBreak="break-word">
            {derivationPath}
          </Body>
        </VStack>
        <VStack align="stretch" spacing={1} pt={1} w="full">
          <Body size="md" medium>
            {t('Recovery Seed')}
          </Body>
          <Body size="sm" color="neutral1.10">
            {t('The same recovery seed is used for your user wallet and all project wallets. You can view it in your ')}
            {profileSeedSettingsPath ? (
              <ChakraLink as={RouterLink} to={profileSeedSettingsPath} textDecoration="underline">
                {t('profile wallet settings')}
              </ChakraLink>
            ) : (
              t('profile wallet settings')
            )}
            .
          </Body>
        </VStack>
      </VStack>

      {currentWallet ? (
        <WalletSection
          title={t('Current wallet')}
          action={withdraw ? <ProjectWalletWithdrawButton {...withdraw} /> : null}
        >
          <ProjectRskEoaHistoryRow rskEoa={currentWallet} />
        </WalletSection>
      ) : null}

      {historicalWallets.length ? (
        <WalletSection title={t('Historical addresses')}>
          <Feedback variant={FeedBackVariant.WARNING}>
            <Body size="sm">
              {t(
                'Historical addresses are not used for new payouts. Funds on them can be recovered with their associated seed together with the derivation path shown above.',
              )}
              <Body as="span" size="sm">
                {' '}
                {t('Learn more about how to do that in our')}{' '}
              </Body>
              <ChakraLink href={PROJECT_WALLET_RECOVERY_GUIDE_URL} isExternal textDecoration="underline">
                {t('guide')}
              </ChakraLink>
              .
            </Body>
          </Feedback>

          <VStack spacing={3} align="stretch" w="full">
            {historicalWallets.map((rskEoa) => (
              <ProjectRskEoaHistoryRow key={`${rskEoa.id}`} rskEoa={rskEoa} />
            ))}
          </VStack>
        </WalletSection>
      ) : null}
    </VStack>
  )
}

const WalletSection = ({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) => (
  <VStack spacing={3} align="stretch" w="full">
    <HStack justify="space-between" align="center" spacing={3}>
      <Body size="md" medium>
        {title}
      </Body>
      {action}
    </HStack>
    {children}
  </VStack>
)

const ProjectWalletWithdrawButton = ({
  showWithdrawableBalance,
  isBelowMinWithdrawThreshold,
  hasOngoingWithdraw,
  showWithdraw,
  onOpen,
}: ProjectWalletWithdrawButtonProps) => {
  if (!showWithdrawableBalance) return null

  return (
    <Tooltip
      label={t('Minimum withdrawal is {{amount}} sats. Increase your balance to enable withdrawals.', {
        amount: MIN_BITCOIN_PAYOUT_SATS_FORMATTED,
      })}
      hasArrow
      shouldWrapChildren
      isDisabled={hasOngoingWithdraw || !isBelowMinWithdrawThreshold}
    >
      <Button
        colorScheme={showWithdraw ? 'primary1' : 'neutral1'}
        variant="solid"
        size="md"
        flexShrink={0}
        onClick={onOpen}
        isDisabled={!showWithdraw || hasOngoingWithdraw}
      >
        {t('Withdraw')}
      </Button>
    </Tooltip>
  )
}

const ProjectRskEoaHistoryRow = ({ rskEoa }: { rskEoa: ProjectRskEoaHistoryItem }) => {
  const { withdrawable, isLoading } = usePrismWithdrawable({ rskAddress: rskEoa.rskAddress })
  const balanceSats = withdrawable ? Number(withdrawable / SATS_PER_RBTC) : 0
  const balance = isLoading
    ? t('Checking balance...')
    : t('{{balance}} sats', { balance: balanceSats.toLocaleString() })

  return (
    <VStack align="stretch" spacing={3} borderWidth="1px" borderColor="neutral1.4" borderRadius="8px" p={4} w="full">
      <HStack
        justify="space-between"
        align={{ base: 'flex-start', md: 'center' }}
        spacing={4}
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <WalletAddressDetail address={rskEoa.rskAddress} />
        <WalletDetail label={t('Chain')} value={t('Rootstock')} />
        {rskEoa.isCurrent && rskEoa.createdAt ? (
          <WalletDetail
            label={t('Created on')}
            value={formatDate(rskEoa.createdAt)}
            align={{ base: 'start', md: 'end' }}
          />
        ) : null}
        {!rskEoa.isCurrent && rskEoa.replacedAt ? (
          <WalletDetail
            label={t('Rotated on')}
            value={formatDate(rskEoa.replacedAt)}
            align={{ base: 'start', md: 'end' }}
          />
        ) : null}
        <WalletDetail label={t('Balance')} value={balance} align={{ base: 'start', md: 'end' }} />
      </HStack>
    </VStack>
  )
}

const WalletAddressDetail = ({ address }: { address: string }) => (
  <VStack align="start" spacing={1} minW={0}>
    <Body size="xs" medium color="neutral1.9">
      {t('Address')}
    </Body>
    <HStack spacing={1} align="center" minW={0}>
      <Body size="sm" color="neutral1.11" wordBreak="break-word">
        {address}
      </Body>
      <ChakraLink
        href={getRootstockExplorerAddressUrl(address)}
        isExternal
        display="inline-flex"
        alignItems="center"
        color="neutral1.10"
        flexShrink={0}
        _hover={{ color: 'neutral1.11' }}
      >
        <Icon as={PiArrowUpRight} boxSize="14px" aria-label={t('View on Rootstock explorer')} />
      </ChakraLink>
    </HStack>
  </VStack>
)

const WalletDetail = ({
  label,
  value,
  align = 'start',
}: {
  label: string
  value: string
  align?: { base: 'start' | 'end'; md: 'start' | 'end' } | 'start' | 'end'
}) => (
  <VStack align={align} spacing={1} minW={0}>
    <Body size="xs" medium color="neutral1.9">
      {label}
    </Body>
    <Body size="sm" color="neutral1.11" wordBreak="break-word">
      {value}
    </Body>
  </VStack>
)

const getWalletRows = ({
  projectId,
  currentRskEoa,
  rskEoas,
}: ProjectRskEoaHistoryProps): ProjectRskEoaHistoryItem[] => {
  const rows = rskEoas?.length
    ? rskEoas.map((rskEoa) => ({
        ...rskEoa,
        derivationPath:
          rskEoa.derivationPath ||
          (rskEoa.isCurrent ? getCurrentProjectDerivationPath(projectId) : getLegacyProjectDerivationPath(projectId)),
      }))
    : []

  const hasCurrentRow = rows.some((rskEoa) => rskEoa.isCurrent)
  if (!hasCurrentRow && currentRskEoa) {
    rows.unshift({
      id: `current-${projectId.toString()}`,
      rskAddress: currentRskEoa,
      derivationPath: getCurrentProjectDerivationPath(projectId),
      isCurrent: true,
      createdAt: null,
      replacedAt: null,
    })
  }

  return rows.sort((first, second) => {
    if (first.isCurrent !== second.isCurrent) return first.isCurrent ? -1 : 1

    const firstDate = first.replacedAt || first.createdAt
    const secondDate = second.replacedAt || second.createdAt
    return getTimestamp(secondDate) - getTimestamp(firstDate)
  })
}

const getCurrentProjectDerivationPath = (projectId: string | number | bigint) => {
  return `${CURRENT_PROJECT_DERIVATION_PATH_BASE}/${projectId.toString()}`
}

const getLegacyProjectDerivationPath = (projectId: string | number | bigint) => {
  return `${LEGACY_PROJECT_DERIVATION_PATH_BASE}/${projectId.toString()}`
}

const getTimestamp = (date?: string | Date | null) => {
  if (!date) return 0

  const timestamp = new Date(date).getTime()
  return Number.isNaN(timestamp) ? 0 : timestamp
}

const formatDate = (date: string | Date) => new Date(date).toLocaleDateString()
