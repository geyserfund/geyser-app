import { HStack, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { ProfileAvatar } from '@/shared/components/display/ProfileAvatar'
import { ProfileText } from '@/shared/components/display/ProfileText'
import { RankMedal } from '@/shared/components/display/RankMedal'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { FormatCurrencyType } from '@/shared/utils/hooks/useCurrencyFormatter'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { LeaderboardPeriod, useImpactFundsFieldPartnerLeaderboardQuery } from '@/types'
import { getShortAmountLabel } from '@/utils'

import { ProjectRowLayout } from '../../landing/views/mainView/defaultView/components/ProjectRowLayout.tsx'
import { useTopContributors } from '../hooks'
import { useTopAmbassadors } from '../hooks/useTopAmbassadors'
import { SponsorshipBanner } from './SponsorshipBanner'

const MAX_HEROES = 10

const HeroListLabels = {
  username: 'username',
  userImageUrl: 'userImageUrl',
  amount: 'contributionsTotal',
  usdAmount: 'contributionsTotalUsd',
} as const

export const GeyserHeroes = () => {
  const period = LeaderboardPeriod.Month
  const { contributors, loading: contributorsLoading } = useTopContributors(period, MAX_HEROES)
  const { ambassadors, loading: ambassadorsLoading } = useTopAmbassadors(period, MAX_HEROES)
  const { data: fieldPartnerData, loading: fieldPartnersLoading } = useImpactFundsFieldPartnerLeaderboardQuery({
    variables: { input: { limit: MAX_HEROES } },
  })

  return (
    <ProjectRowLayout w="full" title={t('Top Heroes')}>
      <VStack w="full" flex={1}>
        <SponsorshipBanner />
        <Stack direction={{ base: 'column', lg: 'row' }} w="full" alignItems="start" spacing={4}>
          <HeroSectionWrapper
            title={t('Field Partners')}
            description={t('Trusted local partners help projects launch, access capital, and share their impact.')}
            linkTo={`${getPath('discoveryImpactFunds')}#field-partners`}
          >
            <RenderFieldPartnerList
              rows={fieldPartnerData?.impactFundFieldPartnerLeaderboard.rows ?? []}
              loading={fieldPartnersLoading}
            />
          </HeroSectionWrapper>
          <HeroSectionWrapper
            title={t('Contributors')}
            description={t('Power local project ideas with their sats.')}
            linkTo={getPath('hallOfFameHeroesContributor')}
          >
            <RenderHeroList period={period} data={contributors} loading={contributorsLoading} labels={HeroListLabels} />
          </HeroSectionWrapper>
          <HeroSectionWrapper
            title={t('Ambassadors')}
            description={t('Share trusted local projects and help them grow.')}
            linkTo={getPath('hallOfFameHeroesAmbassador')}
          >
            <RenderHeroList period={period} data={ambassadors} loading={ambassadorsLoading} labels={HeroListLabels} />
          </HeroSectionWrapper>
        </Stack>
      </VStack>
    </ProjectRowLayout>
  )
}

const HeroSectionWrapper = ({
  title,
  description,
  linkTo,
  children,
}: {
  title: string
  description: string
  linkTo: string
  children: React.ReactNode
}) => (
  <CardLayout w="full" flex={1} h="full" dense paddingY={4}>
    <VStack w="full" alignItems="start" paddingX={4}>
      <Link to={linkTo} style={{ textDecoration: 'none' }}>
        <Body size="xl" light bold>
          {title}
        </Body>
      </Link>
      <Body size="sm light">{description}</Body>
    </VStack>
    {children}
  </CardLayout>
)

const RenderFieldPartnerList = ({
  rows,
  loading,
}: {
  rows: Array<{
    rank: number
    fieldPartnerId: string
    fieldPartner: string
    country: string
    projectsLaunched: number
    enabledContributionSats: number
  }>
  loading?: boolean
}) => (
  <VStack w="full" alignItems="start">
    {loading
      ? [...Array(MAX_HEROES).keys()].map((key) => <HeroesListitemSkeleton key={key} />)
      : rows.map((row) => (
          <HStack
            as={Link}
            to={getPath('userProfile', row.fieldPartnerId)}
            paddingX={4}
            w="full"
            flex={1}
            overflow="hidden"
            key={row.fieldPartnerId}
            minWidth="250px"
            maxWidth="335px"
            _hover={{ cursor: 'pointer', backgroundColor: 'neutral1.3' }}
          >
            <RankMedal rank={row.rank} />
            <ProfileAvatar borderRadius="50%" height="40px" width="40px" />
            <VStack w="full" overflow="hidden" flex={1} spacing={0} alignItems="start">
              <ProfileText w="full" bold isTruncated>
                {row.fieldPartner}
              </ProfileText>
              <Body size="xs" medium isTruncated>
                {`${row.country} · ${row.projectsLaunched} projects`}
                <Body as="span" light>{` · ${getShortAmountLabel(row.enabledContributionSats)} sats enabled`}</Body>
              </Body>
            </VStack>
          </HStack>
        ))}
  </VStack>
)

const RenderHeroList = ({
  data,
  loading,
  labels,
}: {
  period: LeaderboardPeriod
  data: any[]
  loading?: boolean
  labels: { username: string; userImageUrl: string; amount: string; usdAmount: string }
}) => {
  const { formatAmount } = useCurrencyFormatter()

  return (
    <VStack w="full" alignItems="start">
      {loading
        ? [...Array(MAX_HEROES).keys()].map((key) => <HeroesListitemSkeleton key={key} />)
        : data.map((datum, index) => (
            <HStack
              as={Link}
              to={getPath('userProfile', datum.userId)}
              paddingX={4}
              w="full"
              flex={1}
              overflow="hidden"
              key={`${datum[labels.username]}-${index}`}
              minWidth="250px"
              maxWidth="335px"
              _hover={{ cursor: 'pointer', backgroundColor: 'neutral1.3' }}
            >
              <RankMedal rank={index + 1} />
              <ProfileAvatar
                borderRadius="50%"
                height="40px"
                width="40px"
                src={datum[labels.userImageUrl]}
                guardian={datum.userGuardianType}
              />
              <VStack w="full" overflow="hidden" flex={1} spacing={0} alignItems="start">
                <ProfileText guardian={datum.userGuardianType} w="full" bold isTruncated>
                  {datum[labels.username]}
                </ProfileText>
                <Body size="xs" medium isTruncated>
                  {`${formatAmount(datum[labels.usdAmount], FormatCurrencyType.Usd)} `}
                  <Body as="span" light>{`(${getShortAmountLabel(datum[labels.amount])} sats)`}</Body>
                </Body>
              </VStack>
            </HStack>
          ))}
    </VStack>
  )
}

const HeroesListitemSkeleton = () => (
  <HStack
    paddingX={4}
    w="full"
    flex={1}
    overflow="hidden"
    minWidth="250px"
    maxWidth="335px"
    _hover={{ cursor: 'pointer', backgroundColor: 'neutral1.3' }}
  >
    <SkeletonLayout height="16px" width="16px" />
    <SkeletonLayout borderRadius="50%" height="40px" width="40px" />
    <VStack w="full" overflow="hidden" flex={1} spacing={0.5} alignItems="start">
      <SkeletonLayout height="24px" width="100px" />
      <SkeletonLayout height="18px" width="50px" />
    </VStack>
  </HStack>
)
