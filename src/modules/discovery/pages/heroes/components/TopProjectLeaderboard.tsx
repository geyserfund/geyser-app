import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import { Trans } from 'react-i18next'
import { Link } from 'react-router'

import { useTopProjects } from '@/modules/discovery/hooks/useTopProjects.ts'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { RankMedal } from '@/shared/components/display/RankMedal'
import { SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { getPathWithGeyserHero } from '@/shared/constants'
import { standardPadding } from '@/shared/styles'
import { FormatCurrencyType } from '@/shared/utils/hooks/useCurrencyFormatter'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { GlobalProjectLeaderboardRow, LeaderboardPeriod } from '@/types'
import { getShortAmountLabel } from '@/utils'

import { StandardOption } from '../types'
import { TitleWithPeriod } from './TitleWithPeriod'

const MAX_PROJECTS = 100

export const TopProjectLeaderboard = () => {
  const [period, setPeriod] = useState<LeaderboardPeriod>(LeaderboardPeriod.Month)

  const handlePeriodChange = (selectedOption: StandardOption<LeaderboardPeriod> | null) => {
    if (selectedOption) {
      setPeriod(selectedOption.value)
    }
  }

  const { projects, loading } = useTopProjects(period, MAX_PROJECTS)

  return (
    <VStack w="full" flex={1} overflowY={'auto'}>
      <TitleWithPeriod
        title={t('Top Projects')}
        period={period}
        handlePeriodChange={handlePeriodChange}
        px={standardPadding}
      />
      <VStack w="full" alignItems={'start'} paddingBottom={6} spacing={0}>
        {loading
          ? [...Array(9).keys()].map((key) => {
              return <ProjectHeroDisplaySkeleton key={key} />
            })
          : projects.map((project, index) => {
              return <ProjectHeroDisplay key={project.projectName} project={project} index={index} />
            })}
      </VStack>
    </VStack>
  )
}

const ProjectHeroDisplay = ({ project, index }: { project: GlobalProjectLeaderboardRow; index: number }) => {
  const { formatAmount } = useCurrencyFormatter()
  return (
    <HStack
      overflow={'hidden'}
      width="full"
      px={standardPadding}
      as={Link}
      to={getPathWithGeyserHero('project', project.projectName)}
      paddingX={{ base: 4, lg: 6 }}
      paddingY={2}
      _hover={{ cursor: 'pointer', backgroundColor: 'neutral1.3' }}
    >
      <HStack justifyContent={'start'} minWidth="32px">
        <RankMedal rank={index + 1} boxSize={'32px'} size="20px" />
      </HStack>
      <HStack flex={1} overflow={'hidden'} borderRadius="16px" paddingRight={2}>
        <ImageWithReload
          borderRadius={'16px'}
          height="64px"
          width="64px"
          src={project.projectThumbnailUrl}
          alt={`${project.projectTitle} project thumbnail image`}
        />
        <VStack w="full" overflow="hidden" flex={1} spacing={0} alignItems="start">
          <Body w="full" bold isTruncated>
            {project.projectTitle}
          </Body>
          <Body w="full" light isTruncated>
            <Trans
              i18nKey={
                'Raised <1>{{usdAmount}}</1> ({{satsAmount}} sats) with <3>{{numberOfContributions}}</3> contributions from <5>{{numberOfFunders}}</5> users'
              }
              values={{
                usdAmount: formatAmount(project.contributionsTotalUsd, FormatCurrencyType.Usd),
                satsAmount: getShortAmountLabel(project.contributionsTotal),
                numberOfContributions: project.contributionsCount,
                numberOfFunders: project.contributorsCount,
              }}
            >
              {'Raised '}
              <Body as="span" medium dark>
                {'{{usdAmount}}'}
              </Body>
              {' ({{satsAmount}} sats) with '}
              <Body as="span" medium dark>
                {'{{numberOfContributions}}'}
              </Body>
              {' contributions from '}
              <Body as="span" medium dark>
                {'{{numberOfFunders}}'}
              </Body>
              {' users'}
            </Trans>
          </Body>
        </VStack>
      </HStack>
    </HStack>
  )
}

const ProjectHeroDisplaySkeleton = () => {
  return (
    <HStack
      paddingX={{ base: 4, lg: 6 }}
      paddingY={2}
      flex={1}
      overflow={'hidden'}
      width="full"
      minWidth={'250px'}
      maxWidth={{ base: 'full', lg: '335px' }}
    >
      <SkeletonLayout height="32px" width="32px" />
      <HStack
        flex={1}
        overflow={'hidden'}
        _hover={{ cursor: 'pointer', backgroundColor: 'neutral1.3' }}
        borderRadius="16px"
        paddingRight={2}
      >
        <SkeletonLayout borderRadius={'16px'} height="64px" width="64px" />
        <VStack w="full" overflow="hidden" flex={1} spacing={1} alignItems="start">
          <SkeletonLayout height="24px" width="150px" />
          <SkeletonLayout height="22px" width="50px" />
        </VStack>
      </HStack>
    </HStack>
  )
}
