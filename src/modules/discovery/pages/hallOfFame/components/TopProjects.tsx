import { Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ImageWithReload } from '@/components/ui'
import { RankMedal } from '@/shared/components/display/RankMedal'
import { CardLayout, SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { useCurrencyFormatter } from '@/shared/utils/hooks'
import { FormatCurrencyType } from '@/shared/utils/hooks/useCurrencyFormatter'
import { GlobalProjectLeaderboardRow, LeaderboardPeriod } from '@/types'
import { getShortAmountLabel } from '@/utils'

import { useTopProjects } from '../hooks'
import { StandardOption } from '../types'
import { TitleWithPeriod } from './TitleWithPeriod'

const MAX_PROJECTS = 9

export const TopProjects = () => {
  const [period, setPeriod] = useState<LeaderboardPeriod>(LeaderboardPeriod.Month)

  const handlePeriodChange = (selectedOption: StandardOption<LeaderboardPeriod> | null) => {
    if (selectedOption) {
      setPeriod(selectedOption.value)
    }
  }

  const { projects, loading } = useTopProjects(period, MAX_PROJECTS)

  return (
    <VStack w="full">
      <TitleWithPeriod title={t('Top Projects')} period={period} handlePeriodChange={handlePeriodChange} />
      <CardLayout w="full" direction="row" flexWrap={'wrap'}>
        {loading
          ? [...Array(9).keys()].keys().map((key) => {
              return <ProjectHeroDisplaySkeleton key={key} />
            })
          : projects.map((project, index) => {
              return <ProjectHeroDisplay key={project.projectName} project={project} index={index} />
            })}
      </CardLayout>
      <HStack w="full" justifyContent="center" pt={1}>
        <Button as={Link} to={getPath('hallOfFameProjects')} variant="soft" colorScheme="neutral1">
          {t('See all top projects')}
        </Button>
      </HStack>
    </VStack>
  )
}

const ProjectHeroDisplay = ({ project, index }: { project: GlobalProjectLeaderboardRow; index: number }) => {
  const { formatAmount } = useCurrencyFormatter()
  return (
    <HStack flex={1} overflow={'hidden'} minWidth={'250px'} maxWidth={{ base: 'full', lg: '335px' }}>
      <HStack justifyContent={'start'} minWidth="32px">
        <RankMedal rank={index + 1} boxSize={'32px'} size="20px" />
      </HStack>
      <HStack
        as={Link}
        to={getPath('project', project.projectName)}
        flex={1}
        overflow={'hidden'}
        _hover={{ cursor: 'pointer', backgroundColor: 'neutral1.3' }}
        borderRadius="16px"
        paddingRight={2}
      >
        <ImageWithReload borderRadius={'16px'} height="64px" width="64px" src={project.projectThumbnailUrl} />
        <VStack w="full" overflow="hidden" flex={1} spacing={0} alignItems="start">
          <Body w="full" bold isTruncated>
            {project.projectTitle}
          </Body>
          <Body size="sm" medium isTruncated>
            {`${formatAmount(project.contributionsTotalUsd, FormatCurrencyType.Usd)} `}
            <Body as="span" light>{`(${getShortAmountLabel(project.contributionsTotal)} sats)`}</Body>
          </Body>
        </VStack>
      </HStack>
    </HStack>
  )
}

const ProjectHeroDisplaySkeleton = () => {
  return (
    <HStack flex={1} overflow={'hidden'} minWidth={'250px'} maxWidth={{ base: 'full', lg: '335px' }}>
      <HStack justifyContent={'start'} minWidth="32px">
        <SkeletonLayout height="32px" width="32px" />
      </HStack>
      <HStack
        flex={1}
        overflow={'hidden'}
        _hover={{ cursor: 'pointer', backgroundColor: 'neutral1.3' }}
        borderRadius="16px"
        paddingRight={2}
      >
        <SkeletonLayout borderRadius={'16px'} height="64px" width="64px" />
        <VStack w="full" overflow="hidden" flex={1} spacing={0} alignItems="start">
          <SkeletonLayout height="24px" width="150px" />
          <SkeletonLayout height="22px" width="50px" />
        </VStack>
      </HStack>
    </HStack>
  )
}
