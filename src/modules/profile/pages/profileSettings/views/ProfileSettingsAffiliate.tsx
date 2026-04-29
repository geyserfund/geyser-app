import {
  Badge,
  Button,
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
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { PiLightning, PiRocketLaunch } from 'react-icons/pi'
import { Link, useParams } from 'react-router'

import { AffiliateReferralProgramCard } from '@/components/molecules/AffiliateReferralProgramCard.tsx'
import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import {
  AffiliatePartnerPayoutSourceValue,
  AffiliatePayoutStatusValue,
} from '@/modules/profile/graphql/queries/affiliatePayoutsQuery.ts'
import {
  ConfigureUserWalletModal,
  hasConfiguredUserWallet,
} from '@/modules/profile/pages/profileSettings/components/ConfigureUserWalletModal.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import {
  DEFAULT_CONTRIBUTION_REFERRAL_PAYOUT_RATE,
  formatEffectiveAffiliatePayoutRate,
  GEYSER_PLATFORM_FEE_RATE,
  GEYSER_PROMOTION_FEE_RATE,
} from '@/shared/utils/affiliatePayout.ts'
import { FormatCurrencyType, useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { getFullDomainUrl } from '@/shared/utils/project/getFullDomainUrl.ts'
import { type UserAffiliatePayoutsQuery, useUserAffiliatePayoutsQuery } from '@/types'
import { toInt } from '@/utils'

import { ProfileSettingsLayout } from '../common/ProfileSettingsLayout'

type AffiliatePartnerPayoutRow = NonNullable<UserAffiliatePayoutsQuery['user']>['affiliatePartnerPayouts'][number]

const formatPayoutSource = (source: AffiliatePartnerPayoutSourceValue) => {
  if (source === 'PROJECT_REFERRAL') return t('Enabling project launches')
  return t('Enabling contributions')
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
  const { userId } = params
  const { formatAmount, formatUsdAmount } = useCurrencyFormatter()
  const configureWalletModal = useDisclosure()
  const userAccountKeys = useAtomValue(userAccountKeysAtom)

  useUserAccountKeys()

  const { data, loading } = useUserAffiliatePayoutsQuery({
    skip: !userId,
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: userId ? toInt(userId) : 0,
      },
    },
  })

  const affiliateData = data?.user
  const affiliatePartnerTerms = affiliateData?.affiliatePartnerTerms
  const payoutSummary = affiliateData?.affiliatePartnerPayoutSummary
  const payouts = affiliateData?.affiliatePartnerPayouts ?? []
  const heroId = affiliateData?.heroId ?? ''
  const hasUserWalletConfigured = hasConfiguredUserWallet(userAccountKeys ?? affiliateData?.accountKeys)

  const totalEarned = payoutSummary?.totalEarned ?? 0
  const totalPending = payoutSummary?.totalPending ?? 0
  const contributionReferralPayoutRate =
    affiliatePartnerTerms?.contributionReferralPayoutRate ?? DEFAULT_CONTRIBUTION_REFERRAL_PAYOUT_RATE
  const projectReferralPayoutRate = affiliatePartnerTerms?.projectReferralPayoutRate ?? 0
  const contributionReferralLink = heroId ? getFullDomainUrl(`/?hero=${encodeURIComponent(heroId)}`) : ''
  const projectReferralLink = heroId ? getFullDomainUrl(`/launch?hero=${encodeURIComponent(heroId)}`) : ''

  return (
    <ProfileSettingsLayout desktopTitle={t('Ambassador Earnings')}>
      <VStack w="100%" spacing={6} alignItems="stretch" px={{ base: 0, lg: 6 }}>
        <Body color="neutral1.11" px={{ base: 0, lg: 0 }}>
          {t('Earn Bitcoin by helping projects launch or get funded')}
        </Body>

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
            <AffiliateReferralProgramCard
              icon={PiLightning}
              title={t('Enabling contributions')}
              description={t(
                'Share your contribution link with supporters. You will earn {{rate}} of contribution enabled, paid out from Geyser promotion network contributions.',
                {
                  rate: formatEffectiveAffiliatePayoutRate(contributionReferralPayoutRate, GEYSER_PROMOTION_FEE_RATE),
                },
              )}
              payoutHighlight={t('{{rate}} of contribution enabled', {
                rate: formatEffectiveAffiliatePayoutRate(contributionReferralPayoutRate, GEYSER_PROMOTION_FEE_RATE),
              })}
              linkValue={contributionReferralLink}
            />
            <AffiliateReferralProgramCard
              icon={PiRocketLaunch}
              title={t('Enabling project launches')}
              description={t(
                'Share your launch link with creators. You will receive a fixed 5k sats when the project launches, plus {{rate}} of contribution enabled from the Geyser platform fee, up to 25,000 sats per project.',
                {
                  rate: formatEffectiveAffiliatePayoutRate(projectReferralPayoutRate, GEYSER_PLATFORM_FEE_RATE),
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
              {t('Affiliate payouts are processed monthly and can be withdrawn from the')}{' '}
              <ChakraLink as={Link} to={getPath('userProfileSettingsWallet', userId || '')} color="primary1.9">
                {t('Wallet')}
              </ChakraLink>{' '}
              {t('page.')}
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
                  <Body size="sm">{t('Configure your wallet so you can receive the payouts.')}</Body>
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
