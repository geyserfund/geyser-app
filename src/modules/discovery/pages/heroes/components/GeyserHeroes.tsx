import { HStack, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
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
import { LeaderboardPeriod } from '@/types'
import { getShortAmountLabel } from '@/utils'

import { ProjectRowLayout } from '../../landing/views/mainView/defaultView/components/ProjectRowLayout.tsx'
import { useTopContributors } from '../hooks'
import { useTopAmbassadors } from '../hooks/useTopAmbassadors'
import { useTopCreators } from '../hooks/useTopCreators'
import { StandardOption } from '../types'
import { SponsorshipBanner } from './SponsorshipBanner'
import { TitleWithPeriod } from './TitleWithPeriod'

const MAX_HEROES = 10

const HeroListLabels = {
  username: 'username',
  userImageUrl: 'userImageUrl',
  amount: 'contributionsTotal',
  usdAmount: 'contributionsTotalUsd',
}

export const GeyserHeroes = () => {
  const [period, setPeriod] = useState<LeaderboardPeriod>(LeaderboardPeriod.Month)

  const handlePeriodChange = (selectedOption: StandardOption<LeaderboardPeriod> | null) => {
    if (selectedOption) {
      setPeriod(selectedOption.value)
    }
  }

  const { contributors, loading: contributorsLoading } = useTopContributors(period, MAX_HEROES)

  const { ambassadors, loading: ambassadorsLoading } = useTopAmbassadors(period, MAX_HEROES)

  const { creators, loading: creatorsLoading } = useTopCreators(period, MAX_HEROES)

  return (
    <ProjectRowLayout
      w="full"
      title={t('Top Heroes')}
      rightContent={
        <TitleWithPeriod
          w="auto"
          period={period}
          seeAllTo={getPath('heroesContributor')}
          handlePeriodChange={handlePeriodChange}
        />
      }
    >
      <VStack w="full" flex={1}>
        <SponsorshipBanner />
        <Stack direction={{ base: 'column', lg: 'row' }} w="full" alignItems={'start'} spacing={4}>
          <HeroSectionWrapper title={t('Creators')} description="Lead initiatives and bring ideas to life.">
            <RenderHeroList period={period} data={creators} loading={creatorsLoading} labels={HeroListLabels} />
          </HeroSectionWrapper>
          <HeroSectionWrapper title={t('Contributors')} description="Power project ideas with their sats.">
            <RenderHeroList period={period} data={contributors} loading={contributorsLoading} labels={HeroListLabels} />
          </HeroSectionWrapper>
          <HeroSectionWrapper title={t('Ambassadors')} description="Spread the word to help projects grow.">
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
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) => {
  return (
    <CardLayout w="full" flex={1} h="full" dense paddingY={4}>
      <VStack w="full" alignItems={'start'} paddingX={4}>
        <Link
          to={getPath(
            `hallOfFameHeroes${
              title === 'Creators' ? 'Creator' : title === 'Contributors' ? 'Contributor' : 'Ambassador'
            }`,
          )}
          style={{ textDecoration: 'none' }}
        >
          <Body size="xl" light bold>
            {title}
          </Body>
        </Link>
        <Body size="sm light">{description}</Body>
      </VStack>
      {children}
    </CardLayout>
  )
}

const RenderHeroList = ({
  period,
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
    <VStack w="full" alignItems={'start'}>
      {loading
        ? [...Array(10).keys()].map((key) => <HeroesListitemSkeleton key={key} />)
        : data.map((datum, index) => {
            return (
              <HStack
                as={Link}
                to={getPath('userProfile', datum.userId)}
                paddingX={4}
                w="full"
                flex={1}
                overflow={'hidden'}
                key={`${datum[labels?.username]}-${index}`}
                minWidth={'250px'}
                maxWidth={'335px'}
                _hover={{ cursor: 'pointer', backgroundColor: 'neutral1.3' }}
              >
                <RankMedal rank={index + 1} />
                <ProfileAvatar
                  borderRadius={'50%'}
                  height="40px"
                  width="40px"
                  src={datum[labels?.userImageUrl]}
                  guardian={datum.userGuardianType}
                />
                <VStack w="full" overflow="hidden" flex={1} spacing={0} alignItems="start">
                  <ProfileText guardian={datum.userGuardianType} w="full" bold isTruncated>
                    {datum[labels?.username]}
                  </ProfileText>
                  <Body size="xs" medium isTruncated>
                    {`${formatAmount(datum[labels?.usdAmount], FormatCurrencyType.Usd)} `}
                    <Body as="span" light>{`(${getShortAmountLabel(datum[labels?.amount])} sats)`}</Body>
                  </Body>
                </VStack>
              </HStack>
            )
          })}
    </VStack>
  )
}

const HeroesListitemSkeleton = () => {
  return (
    <HStack
      paddingX={4}
      w="full"
      flex={1}
      overflow={'hidden'}
      minWidth={'250px'}
      maxWidth={'335px'}
      _hover={{ cursor: 'pointer', backgroundColor: 'neutral1.3' }}
    >
      <SkeletonLayout height="16px" width="16px" />
      <SkeletonLayout borderRadius={'50%'} height="40px" width="40px" />

      <VStack w="full" overflow="hidden" flex={1} spacing={0.5} alignItems="start">
        <SkeletonLayout height="24px" width="100px" />
        <SkeletonLayout height="18px" width="50px" />
      </VStack>
    </HStack>
  )
}
