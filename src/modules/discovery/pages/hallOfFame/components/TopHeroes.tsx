import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import { Trans } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ImageWithReload } from '@/components/ui'
import { RankMedal } from '@/shared/components/display/RankMedal'
import { SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { standardPadding } from '@/shared/styles'
import { useCurrencyFormatter } from '@/shared/utils/hooks'
import { FormatCurrencyType } from '@/shared/utils/hooks/useCurrencyFormatter'
import { LeaderboardPeriod } from '@/types'
import { getShortAmountLabel } from '@/utils'

import { useTopContributors } from '../hooks'
import { useTopAmbassadors } from '../hooks/useTopAmbassadors'
import { useTopCreators } from '../hooks/useTopCreators'
import { StandardOption } from '../types'
import { TitleWithPeriod } from './TitleWithPeriod'

export enum HeroType {
  Creators = 'Creators',
  Contributors = 'Contributors',
  Ambassadors = 'Ambassadors',
}

const MAX_HERO_COUNT = 100

const labelsCollection = {
  [HeroType.Contributors]: {
    amountUsd: 'contributionsTotalUsd',
    amount: 'contributionsTotal',
    numberOfContributions: 'contributionsCount',
    numberOfProjects: 'projectsContributedCount',
  },
  [HeroType.Ambassadors]: {
    amountUsd: 'contributionsTotalUsd',
    amount: 'contributionsTotal',
    numberOfContributions: '',
    numberOfProjects: 'projectsCount',
  },
  [HeroType.Creators]: {
    amountUsd: 'contributionsTotalUsd',
    amount: 'contributionsTotal',
    numberOfContributions: '',
    numberOfProjects: 'projectsCount',
  },
}

export const TopHeroes = ({ heroType }: { heroType: HeroType }) => {
  const [period, setPeriod] = useState<LeaderboardPeriod>(LeaderboardPeriod.Month)

  const handlePeriodChange = (selectedOption: StandardOption<LeaderboardPeriod> | null) => {
    if (selectedOption) {
      setPeriod(selectedOption.value)
    }
  }

  const { contributors, loading: contributorsLoading } = useTopContributors(period, MAX_HERO_COUNT, {
    skip: heroType !== HeroType.Contributors,
  })

  const { ambassadors, loading: ambassadorsLoading } = useTopAmbassadors(period, MAX_HERO_COUNT, {
    skip: heroType !== HeroType.Ambassadors,
  })

  const { creators, loading: creatorsLoading } = useTopCreators(period, MAX_HERO_COUNT, {
    skip: heroType !== HeroType.Creators,
  })

  const currentData =
    heroType === HeroType.Contributors ? contributors : heroType === HeroType.Ambassadors ? ambassadors : creators

  const loading =
    heroType === HeroType.Contributors
      ? contributorsLoading
      : heroType === HeroType.Ambassadors
      ? ambassadorsLoading
      : creatorsLoading

  return (
    <VStack w="full" flex={1} overflowY={'auto'}>
      <TitleWithPeriod
        title={t(
          heroType === HeroType.Contributors
            ? 'Top Contributors'
            : heroType === HeroType.Ambassadors
            ? 'Top Ambassadors'
            : 'Top Creators',
        )}
        period={period}
        handlePeriodChange={handlePeriodChange}
        px={standardPadding}
      />
      <VStack w="full" alignItems={'start'} paddingBottom={6}>
        {loading
          ? Array.from({ length: 5 }).map((_, index) => <HeroDisplaySkeleton key={index} />)
          : currentData.map((data, index) => {
              return (
                <HeroDisplay
                  key={index}
                  heroType={heroType}
                  rank={index + 1}
                  data={data}
                  labels={labelsCollection[heroType]}
                />
              )
            })}
      </VStack>
    </VStack>
  )
}

const HeroDisplay = ({
  heroType,
  rank,
  data,
  labels,
}: {
  heroType: HeroType
  rank: number
  data: { [key: string]: any }
  labels: { amountUsd: string; amount: string; numberOfContributions: string; numberOfProjects: string }
}) => {
  const { formatAmount } = useCurrencyFormatter()

  const renderContributorHeroStats = () => {
    return (
      <Body size="sm" light isTruncated>
        <Trans
          i18nKey={
            'Contributed <1>{{usdAmount}}</1> ({{satsAmount}} sats) with <3>{{numberOfContributions}}</3> contributions to <5>{{numberOfProjects}}</5> projects'
          }
          values={{
            usdAmount: formatAmount(data[labels.amountUsd], FormatCurrencyType.Usd),
            satsAmount: getShortAmountLabel(data[labels.amount]),
            numberOfContributions: data[labels.numberOfContributions],
            numberOfProjects: data[labels.numberOfProjects],
          }}
        >
          {'Contributed '}
          <Body as="span" medium dark>
            {'{{usdAmount}}'}
          </Body>
          {' ({{satsAmount}} sats) with '}
          <Body as="span" medium dark>
            {'{{numberOfContributions}}'}
          </Body>
          {' contributions to '}
          <Body as="span" medium dark>
            {'{{numberOfProjects}}'}
          </Body>
          {' projects'}
        </Trans>
      </Body>
    )
  }

  const renderAmbassadorHeroStats = () => {
    return (
      <Body size="sm" light isTruncated>
        <Trans
          i18nKey={'Enabled <1>{{usdAmount}}</1> ({{satsAmount}} sats) across <3>{{numberOfProjects}}</3> projects'}
          values={{
            usdAmount: formatAmount(data[labels.amountUsd], FormatCurrencyType.Usd),
            satsAmount: getShortAmountLabel(data[labels.amount]),
            numberOfProjects: data[labels.numberOfProjects],
          }}
        >
          {'Enabled '}
          <Body as="span" medium dark>
            {'{{usdAmount}}'}
          </Body>
          {' ({{satsAmount}} sats) across '}
          <Body as="span" medium dark>
            {'{{numberOfProjects}}'}
          </Body>
          {' projects'}
        </Trans>
      </Body>
    )
  }

  const renderCreatorHeroStats = () => {
    return (
      <Body size="sm" light isTruncated>
        <Trans
          i18nKey={'Raised <1>{{usdAmount}}</1> ({{satsAmount}} sats) across <3>{{numberOfProjects}}</3> projects'}
          values={{
            usdAmount: formatAmount(data[labels.amountUsd], FormatCurrencyType.Usdcent),
            satsAmount: getShortAmountLabel(data[labels.amount]),
            numberOfProjects: data[labels.numberOfProjects],
          }}
        >
          {'Raised '}
          <Body as="span" medium dark>
            {'{{usdAmount}}'}
          </Body>
          {' ({{satsAmount}} sats) across '}
          <Body as="span" medium dark>
            {'{{numberOfProjects}}'}
          </Body>
          {' projects'}
        </Trans>
      </Body>
    )
  }

  const renderDescription = () => {
    if (heroType === HeroType.Contributors) {
      return renderContributorHeroStats()
    }

    if (heroType === HeroType.Ambassadors) {
      return renderAmbassadorHeroStats()
    }

    if (heroType === HeroType.Creators) {
      return renderCreatorHeroStats()
    }
  }

  return (
    <HStack
      as={Link}
      to={getPath('userProfile', data.userId)}
      overflow={'hidden'}
      width="full"
      px={standardPadding}
      _hover={{ backgroundColor: 'neutral1.3', cursor: 'pointer' }}
    >
      <HStack justifyContent={'start'} minWidth="32px">
        <RankMedal rank={rank} boxSize={'32px'} size="20px" />
      </HStack>

      <ImageWithReload borderRadius={'50%'} height="64px" width="64px" src={data.userImageUrl} />
      <VStack w="full" overflow="hidden" flex={1} spacing={0} alignItems="start">
        <Body w="full" bold isTruncated>
          {data.username}
        </Body>
        {renderDescription()}
      </VStack>
    </HStack>
  )
}

const HeroDisplaySkeleton = () => {
  return (
    <HStack overflow={'hidden'} width="full" px={standardPadding}>
      <SkeletonLayout height="32px" width="32px" />

      <SkeletonLayout borderRadius={'50%'} height="64px" width="64px" />
      <VStack w="full" overflow="hidden" flex={1} spacing={1} alignItems="start">
        <SkeletonLayout height="20px" width="250px" />
        <SkeletonLayout height="26px" width="50px" />
      </VStack>
    </HStack>
  )
}
