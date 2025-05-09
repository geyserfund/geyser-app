import { Box, HStack, Image, Skeleton, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiLightning, PiUsers } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { useTopProjects } from '@/modules/discovery/hooks/useTopProjects.ts'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { BronzeMedalUrl, GoldMedalUrl, SilverMedalUrl } from '@/shared/constants/platform/url'
import { useCurrencyFormatter } from '@/shared/utils/hooks'
import { GlobalProjectLeaderboardRow, LeaderboardPeriod } from '@/types'

import { ScrollableList } from './ScrollableList'

interface TopProjectsProps {
  period: LeaderboardPeriod
}

const MAX_PROJECTS = 100

export const TopProjects = ({ period }: TopProjectsProps) => {
  const { projects, loading } = useTopProjects(period, MAX_PROJECTS)

  return (
    <VStack
      width={{ base: '100%', lg: '150%' }}
      maxHeight={{ base: '100%', lg: '750px' }}
      alignItems="flex-start"
      backgroundColor="neutralAlpha.1"
      borderRadius={{ base: 'none', lg: '8px' }}
      border={{ base: 'none', lg: '1px solid' }}
      borderColor={{ base: 'transparent', lg: 'neutralAlpha.6' }}
      py={{ base: 0, lg: 4 }}
      overflow="hidden"
    >
      {loading ? (
        <TopProjectsSkeleton />
      ) : (
        <ScrollableList
          data={projects}
          renderItem={(project, index) => <ProjectItem key={project.projectName} project={project} rank={index + 1} />}
        />
      )}
    </VStack>
  )
}

const ProjectItem = ({ project, rank }: { project: GlobalProjectLeaderboardRow; rank: number }) => {
  const { t } = useTranslation()

  const { formatAmount } = useCurrencyFormatter()

  const formattedAmountContributed = formatAmount(project.contributionsTotal, 'BTCSAT')
  const formattedUsdAmount = formatAmount(project.contributionsTotalUsd, 'USD')

  return (
    <HStack
      width="100%"
      spacing={4}
      as={Link}
      to={getPath('project', project.projectName)}
      _hover={{ backgroundColor: 'neutral1.3', cursor: 'pointer' }}
      py={1}
      px={4}
    >
      <Box justifyContent="center" minWidth="30px">
        {rank <= 3 ? (
          <RankMedal rank={rank} />
        ) : (
          <Body align={'center'} fontSize="14px" bold color={'neutralAlpha.9'}>
            {rank}
          </Body>
        )}
      </Box>
      <ImageWithReload
        src={project?.projectThumbnailUrl || ''}
        alt={project.projectTitle}
        boxSize="64px"
        borderRadius="16px"
        maxHeight="64px"
        minWidth="64px"
      />
      <HStack maxHeight="64px" alignItems="center" justifyContent="flex-start" flex={1} overflow="hidden">
        <VStack alignItems="flex-start" flex={1} spacing={1}>
          <Body fontSize={'14px'} bold isTruncated>
            {project.projectTitle}
          </Body>

          <VStack alignItems="flex-start" spacing={0}>
            <Body size="sm" dark>
              {formattedAmountContributed}{' '}
              <Body as="span" size="sm" muted>
                {`(${formattedUsdAmount})`}
              </Body>
            </Body>
            <HStack spacing={1}>
              <HStack spacing={0.5}>
                <Body size="sm" muted>
                  {t('through')}{' '}
                </Body>
                <PiLightning size="12px" /> {t('from')}{' '}
                <Body as="span" size="sm" dark>
                  {project.contributionsCount}
                </Body>{' '}
              </HStack>
              <HStack spacing={0.5}>
                <Body as="span" size="sm" muted>
                  {t('from')}{' '}
                </Body>
                <PiUsers size="12px" />
                <Body size="sm" dark>
                  {project.contributorsCount}
                </Body>{' '}
              </HStack>
            </HStack>
          </VStack>
        </VStack>
      </HStack>
    </HStack>
  )
}

const RankMedal = ({ rank }: { rank: number }) => {
  const medalUrl = [GoldMedalUrl, SilverMedalUrl, BronzeMedalUrl]
  return <Image src={medalUrl[rank - 1]} alt={`Rank ${rank}`} boxSize="32px" />
}

const TopProjectsSkeleton = () => {
  return (
    <VStack width="100%" spacing={4}>
      {[...Array(10)].map((_, index) => (
        <ProjectItemSkeleton key={index} />
      ))}
    </VStack>
  )
}

const ProjectItemSkeleton = () => {
  return (
    <HStack width="full" spacing={4} padding={'8px 24px'}>
      <Skeleton width="30px" height="30px" borderRadius="full" />
      <Skeleton width="64px" height="64px" borderRadius="16px" />
      <VStack alignItems="flex-start" flex={1} spacing={1}>
        <Skeleton height="14px" width="120px" />
        <Skeleton height="12px" width="180px" />
        <Skeleton height="12px" width="150px" />
      </VStack>
    </HStack>
  )
}
