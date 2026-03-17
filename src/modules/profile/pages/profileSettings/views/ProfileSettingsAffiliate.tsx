import {
  Badge,
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
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { t } from 'i18next'
import type { ElementType } from 'react'
import { Link, useParams } from 'react-router'
import { PiCopy, PiLightning, PiRocketLaunch } from 'react-icons/pi'

import {
  AffiliatePartnerPayoutSourceValue,
  AffiliatePayoutStatusValue,
  QUERY_USER_AFFILIATE_PAYOUTS,
  UserAffiliatePayoutsQueryResult,
  UserAffiliatePayoutsQueryVariables,
} from '@/modules/profile/graphql/queries/affiliatePayoutsQuery.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { getFullDomainUrl } from '@/shared/utils/project/getFullDomainUrl.ts'
import { FormatCurrencyType, useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { CopyButton } from '@/shared/molecules/CopyButton.tsx'
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

const formatPayoutRate = (rate: number | null | undefined) => `${Math.round((rate ?? 0) * 100)}%`

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
    <Body size="sm" color="neutralAlpha.11">
      {label}
    </Body>
    <Skeleton isLoaded={!isLoading}>
      <H2 size="2xl">{value}</H2>
    </Skeleton>
    <Skeleton isLoaded={!isLoading}>
      <Body size="sm" color="neutralAlpha.11">
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
  copyLabel,
}: {
  title: string
  description: string
  icon: ElementType
  payoutHighlight: string
  linkValue: string
  copyLabel: string
}) => {
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
          {linkValue ? (
            <CopyButton
              alignSelf={{ base: 'stretch', sm: 'flex-start' }}
              variant="ghost"
              rightIcon={<PiCopy />}
              copyText={linkValue}
            >
              {copyLabel}
            </CopyButton>
          ) : (
            <Body size="sm" color="neutralAlpha.11">
              {t('Your hero ID is required before sharing affiliate links.')}
            </Body>
          )}
        </HStack>

        <Body color="neutralAlpha.11" w="100%">
          {description}
        </Body>
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
          <H2 size="lg">{t('How does it work?')}</H2>

          <Stack spacing={4} w="100%">
            <ReferralProgramCard
              icon={PiLightning}
              title={t('Contribution referrals')}
              description={t("Share your contribution link with supporters. Payouts come from Geyser's promotion fee whenever a referred contribution is completed.")}
              payoutHighlight={t('{{rate}} payout rate', {
                rate: formatPayoutRate(contributionReferralPayoutRate),
              })}
              linkValue={contributionReferralLink}
              copyLabel={t('Copy referral link')}
            />
            <ReferralProgramCard
              icon={PiRocketLaunch}
              title={t('Project referrals')}
              description={t('Share your launch link with creators. You will receive a fixed 5k sats when the project launches, and {{rate}} of the Geyser platform fee, up to {{cap}} sats per project.', {
                rate: formatPayoutRate(projectReferralPayoutRate),
                cap: projectReferralPayoutCapSats.toLocaleString(),
              })}
              payoutHighlight={t('5,000 sats + {{rate}} payout rate', {
                rate: formatPayoutRate(projectReferralPayoutRate),
              })}
              linkValue={projectReferralLink}
              copyLabel={t('Copy launch referral link')}
            />
          </Stack>
        </VStack>

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

          <CardLayout spacing={3} borderColor="neutral1.6">
            <H2 size="lg">{t('Payout instructions')}</H2>
            <Body color="neutralAlpha.11">
              {t('Affiliate payouts are processed manually. Reach out to ')}
              <ChakraLink href="mailto:hello@geyser.fund" color="primary1.9">
                hello@geyser.fund
              </ChakraLink>
              {t(' with your lightning address or BTC address to receive payment.')}
            </Body>
            <Body color="neutralAlpha.11">{t('Only payouts above $10 will be processed.')}</Body>
          </CardLayout>

          <CardLayout spacing={4} borderColor="neutral1.6">
            <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap" spacing={2}>
              <H2 size="lg">{t('Payout history')}</H2>
              {!loading && (
                <Body size="sm" color="neutralAlpha.11">
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
              <Body color="neutralAlpha.11">{t('No affiliate payouts yet.')}</Body>
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
    </ProfileSettingsLayout>
  )
}
