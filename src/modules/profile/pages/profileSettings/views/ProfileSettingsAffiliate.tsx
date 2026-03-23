import {
  Box,
  Badge,
  Button,
  Icon,
  HStack,
  Link as ChakraLink,
  SimpleGrid,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import type { ElementType } from 'react'
import { Link, useParams } from 'react-router'
import { PiCopy, PiLightning, PiRocketLaunch } from 'react-icons/pi'

import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import {
  AffiliatePartnerPayoutSourceValue,
  AffiliatePayoutStatusValue,
  QUERY_USER_AFFILIATE_PAYOUTS,
  UserAffiliatePayoutsQueryResult,
  UserAffiliatePayoutsQueryVariables,
} from '@/modules/profile/graphql/queries/affiliatePayoutsQuery.ts'
import {
  ConfigureUserWalletModal,
  hasConfiguredUserWallet,
} from '@/modules/profile/pages/profileSettings/components/ConfigureUserWalletModal.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import {
  formatEffectiveAffiliatePayoutRate,
  GEYSER_PLATFORM_FEE_RATE,
  GEYSER_PROMOTION_FEE_RATE,
} from '@/shared/utils/affiliatePayout.ts'
import { getFullDomainUrl } from '@/shared/utils/project/getFullDomainUrl.ts'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton.ts'
import { FormatCurrencyType, useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { toInt } from '@/utils'

import { ProfileSettingsLayout } from '../common/ProfileSettingsLayout'

type AffiliatePartnerPayoutRow = NonNullable<UserAffiliatePayoutsQueryResult['user']>['affiliatePartnerPayouts'][number]

const formatPayoutSource = (source: AffiliatePartnerPayoutSourceValue) => {
  if (source === 'PROJECT_REFERRAL') return t('Project referral')
  return t('Contribution referral')
}

const formatPayoutStatus = (status: AffiliatePayoutStatusValue) => {
  if (status === 'PAID') return t('Paid')
  return t('Pending')
}

const getPayoutStatusColorScheme = (status: AffiliatePayoutStatusValue) => {
  if (status === 'PAID') return 'green'
  return 'yellow'
}

const formatPayoutDate = (date: string | null | undefined) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString()
}

const SummaryCard = ({
  label,
  value,
  helper,
  isLoading,
}: {
  label: string
  value: string
  helper: string
  isLoading: boolean
}) => (
  <CardLayout spacing={2} borderColor="neutral1.6" height="100%">
    <Body size="sm" color="neutral1.11">
      {label}
    </Body>
    <Skeleton isLoaded={!isLoading}>
      <H2 size="2xl">{value}</H2>
    </Skeleton>
    <Skeleton isLoaded={!isLoading}>
      <Body size="sm" color="neutral1.11">
        {helper}
      </Body>
    </Skeleton>
  </CardLayout>
)

const ReferralProgramCard = ({
  title,
  description,
  icon,
  payoutHighlight,
  linkValue,
}: {
  title: string
  description: string
  icon: ElementType
  payoutHighlight: string
  linkValue: string
}) => {
  const { onCopy, hasCopied } = useCopyToClipboard(linkValue)
  const referralLinkContent = linkValue ? (
    <HStack
      as="button"
      type="button"
      onClick={onCopy}
      w="100%"
      p={4}
      bg="neutral1.1"
      borderWidth="1px"
      borderColor={hasCopied ? 'primary1.6' : 'neutral1.5'}
      borderRadius="xl"
      spacing={4}
      justifyContent="space-between"
      alignItems="center"
      cursor="pointer"
      transition="border-color 0.2s ease, background-color 0.2s ease"
      _hover={{
        borderColor: hasCopied ? 'primary1.6' : 'neutral1.6',
        bg: 'neutral1.2',
      }}
      _active={{
        bg: 'neutral1.2',
      }}
    >
      <VStack spacing={1} alignItems="flex-start" flex={1} minW={0}>
        <Body size="xs" medium color={hasCopied ? 'primary1.9' : 'neutral1.9'}>
          {t('Referral link')}
        </Body>
        <Box w="100%" overflowWrap="anywhere">
          <Body size="sm" color="neutral1.12" textAlign="left" medium>
            {linkValue.replace('https://', '')}
          </Body>
        </Box>
      </VStack>

      <HStack
        spacing={2}
        px={3}
        py={2}
        borderRadius="full"
        bg={hasCopied ? 'primary1.3' : 'neutral1.3'}
        borderWidth="1px"
        borderColor={hasCopied ? 'primary1.5' : 'neutral1.5'}
        flexShrink={0}
      >
        <Body size="sm" medium color={hasCopied ? 'primary1.10' : 'neutral1.11'}>
          {hasCopied ? t('Copied') : t('Copy')}
        </Body>
        <Icon as={PiCopy} boxSize={5} color={hasCopied ? 'primary1.10' : 'neutral1.11'} />
      </HStack>
    </HStack>
  ) : (
    <Body size="sm" color="neutral1.11">
      {t('Your hero ID is required before sharing affiliate links.')}
    </Body>
  )

  return (
    <CardLayout spacing={4} borderColor="neutral1.6" height="100%">
      <VStack spacing={3} alignItems="stretch">
        <HStack justifyContent="space-between" alignItems="center" spacing={4} flexWrap="wrap">
          <HStack spacing={3} alignItems="center" minW={0} flexWrap="wrap">
            <Icon as={icon} boxSize={5} color="primary1.9" />
            <H2 size="md">{title}</H2>
            <Badge colorScheme="primary1" variant="soft" borderRadius="full" px={3} py={1.5}>
              <Body size="md" medium>
                {payoutHighlight}
              </Body>
            </Badge>
          </HStack>
        </HStack>

        <Body color="neutral1.11" w="100%">
          {description}
        </Body>

        {referralLinkContent}
      </VStack>
    </CardLayout>
  )
}

const PayoutRow = ({ payout }: { payout: AffiliatePartnerPayoutRow }) => (
  <Tr key={payout.uuid}>
    <Td whiteSpace="nowrap">{formatPayoutDate(payout.paidAt ?? payout.createdAt)}</Td>
    <Td whiteSpace="nowrap">{formatPayoutSource(payout.source)}</Td>
    <Td minWidth="240px">
      {payout.project?.name ? (
        <ChakraLink as={Link} to={getPath('project', payout.project.name)} color="primary1.9">
          {payout.project.title}
        </ChakraLink>
      ) : (
        '—'
      )}
    </Td>
    <Td whiteSpace="nowrap">{`${payout.amount.toLocaleString()} sats`}</Td>
    <Td whiteSpace="nowrap">
      <Badge colorScheme={getPayoutStatusColorScheme(payout.status)} borderRadius="full" px={2.5} py={1}>
        {formatPayoutStatus(payout.status)}
      </Badge>
    </Td>
  </Tr>
)

export const ProfileSettingsAffiliate = () => {
  const params = useParams<{ userId: string }>()
  const userId = params.userId
  const { formatAmount, formatUsdAmount } = useCurrencyFormatter()
  const configureWalletModal = useDisclosure()
  const userAccountKeys = useAtomValue(userAccountKeysAtom)

  useUserAccountKeys()

  const { data, loading } = useQuery<UserAffiliatePayoutsQueryResult, UserAffiliatePayoutsQueryVariables>(
    QUERY_USER_AFFILIATE_PAYOUTS,
    {
      skip: !userId,
      fetchPolicy: 'cache-and-network',
      variables: {
        where: {
          id: userId ? toInt(userId) : 0,
        },
      },
    }
  )

  const affiliateData = data?.user
  const affiliatePartnerTerms = affiliateData?.affiliatePartnerTerms
  const payoutSummary = affiliateData?.affiliatePartnerPayoutSummary
  const payouts = affiliateData?.affiliatePartnerPayouts ?? []
  const heroId = affiliateData?.heroId ?? ''
  const hasUserWalletConfigured = hasConfiguredUserWallet(userAccountKeys ?? affiliateData?.accountKeys)

  const totalEarned = payoutSummary?.totalEarned ?? 0
  const totalPending = payoutSummary?.totalPending ?? 0
  const contributionReferralPayoutRate = affiliatePartnerTerms?.contributionReferralPayoutRate ?? 0
  const projectReferralPayoutRate = affiliatePartnerTerms?.projectReferralPayoutRate ?? 0
  const projectReferralPayoutCapSats = affiliatePartnerTerms?.projectReferralPayoutCapSats ?? 0
  const contributionReferralLink = heroId ? getFullDomainUrl(`/?hero=${encodeURIComponent(heroId)}`) : ''
  const projectReferralLink = heroId ? getFullDomainUrl(`/launch?hero=${encodeURIComponent(heroId)}`) : ''

  return (
    <ProfileSettingsLayout desktopTitle={t('Affiliate')}>
      <VStack w="100%" spacing={6} alignItems="stretch" px={{ base: 0, lg: 6 }}>
        <VStack spacing={4} alignItems="stretch">
          <H2 size="lg">{t('My Earnings')}</H2>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
            <SummaryCard
              label={t('Earnings to date')}
              value={formatAmount(totalEarned, FormatCurrencyType.Btcsat)}
              helper={formatUsdAmount(totalEarned)}
              isLoading={loading}
            />
            <SummaryCard
              label={t('Total pending payouts')}
              value={formatAmount(totalPending, FormatCurrencyType.Btcsat)}
              helper={formatUsdAmount(totalPending)}
              isLoading={loading}
            />
          </SimpleGrid>
        </VStack>

        <VStack spacing={4} alignItems="stretch">
          <H2 size="lg">{t('How does it work?')}</H2>

          <Stack spacing={4} w="100%">
            <ReferralProgramCard
              icon={PiLightning}
              title={t('Contribution referrals')}
              description={t(
                'Share your contribution link with supporters. You will earn {{rate}} of contribution enabled, paid out from Geyser promotion network contributions.',
                {
                  rate: formatEffectiveAffiliatePayoutRate(
                    contributionReferralPayoutRate,
                    GEYSER_PROMOTION_FEE_RATE,
                  ),
                },
              )}
              payoutHighlight={t('{{rate}} of contribution enabled', {
                rate: formatEffectiveAffiliatePayoutRate(
                  contributionReferralPayoutRate,
                  GEYSER_PROMOTION_FEE_RATE,
                ),
              })}
              linkValue={contributionReferralLink}
            />
            <ReferralProgramCard
              icon={PiRocketLaunch}
              title={t('Project referrals')}
              description={t(
                'Share your launch link with creators. You will receive a fixed 5k sats when the project launches, plus {{rate}} of contribution enabled from the Geyser platform fee, up to {{cap}} sats per project.',
                {
                  rate: formatEffectiveAffiliatePayoutRate(projectReferralPayoutRate, GEYSER_PLATFORM_FEE_RATE),
                  cap: projectReferralPayoutCapSats.toLocaleString(),
                },
              )}
              payoutHighlight={t('5,000 sats + {{rate}} of contribution enabled', {
                rate: formatEffectiveAffiliatePayoutRate(projectReferralPayoutRate, GEYSER_PLATFORM_FEE_RATE),
              })}
              linkValue={projectReferralLink}
            />
          </Stack>
        </VStack>

        <VStack spacing={4} alignItems="stretch">
          <CardLayout spacing={3} borderColor="neutral1.6">
            <H2 size="lg">{t('Payout instructions')}</H2>
            <Body color="neutral1.11">
              {t('Affiliate payouts are processed monthly. Only payouts above $10 will be processed.')}
            </Body>
            {!hasUserWalletConfigured ? (
              <Feedback variant={FeedBackVariant.WARNING} noIcon>
                <HStack
                  w="full"
                  justifyContent="space-between"
                  alignItems={{ base: 'flex-start', md: 'center' }}
                  flexDirection={{ base: 'column', md: 'row' }}
                  spacing={3}
                >
                  <Body size="sm">
                    {t('Configure your wallet so you can receive the payouts.')}
                  </Body>
                  <Button
                    colorScheme="warning"
                    variant="soft"
                    size="sm"
                    flexShrink={0}
                    onClick={configureWalletModal.onOpen}
                  >
                    {t('Configure your user wallet')}
                  </Button>
                </HStack>
              </Feedback>
            ) : null}
          </CardLayout>

          <CardLayout spacing={4} borderColor="neutral1.6">
            <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap" spacing={2}>
              <H2 size="lg">{t('Payout history')}</H2>
              {!loading && (
                <Body size="sm" color="neutral1.11">
                  {t('{{count}} payouts', { count: payouts.length })}
                </Body>
              )}
            </HStack>

            {loading ? (
              <Stack spacing={3}>
                <Skeleton height="48px" />
                <Skeleton height="48px" />
                <Skeleton height="48px" />
              </Stack>
            ) : payouts.length === 0 ? (
              <Body color="neutral1.11">{t('No affiliate payouts yet.')}</Body>
            ) : (
              <TableContainer w="100%" overflowX="auto">
                <Table variant="simple" size="md">
                  <Thead>
                    <Tr>
                      <Th>{t('Date')}</Th>
                      <Th>{t('Type')}</Th>
                      <Th>{t('Project')}</Th>
                      <Th>{t('Amount')}</Th>
                      <Th>{t('Status')}</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {payouts.map((payout) => (
                      <PayoutRow key={payout.uuid} payout={payout} />
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </CardLayout>
        </VStack>
      </VStack>
      <ConfigureUserWalletModal
        isOpen={configureWalletModal.isOpen}
        onClose={configureWalletModal.onClose}
        onConfigured={configureWalletModal.onClose}
      />
    </ProfileSettingsLayout>
  )
}
