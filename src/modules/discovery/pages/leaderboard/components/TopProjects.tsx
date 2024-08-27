import { Box, HStack, Image, Skeleton, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiLightning, PiUsers } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

import { ImageWithReload } from '@/components/ui'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { BronzeMedalUrl, GoldMedalUrl, SilverMedalUrl } from '@/shared/constants/platform/url'
import { useCurrencyFormatter } from '@/shared/utils/hooks'
import { GlobalProjectLeaderboardRow, LeaderboardPeriod } from '@/types'

import { useTopProjects } from '../hooks'
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

  const navigate = useNavigate()

  const { formatAmount, formatUsdAmount } = useCurrencyFormatter()

  const formattedAmountContributed = formatAmount(project.contributionsTotal, 'BTCSAT')
  const formattedUsdAmount = formatUsdAmount(project.contributionsTotal)

  const projectUrl = getPath('project', project.projectName)

  const handleClick = () => {
    navigate(projectUrl)
  }

  return (
    <HStack
      width="100%"
      spacing={4}
      onClick={handleClick}
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
      />
      <HStack maxHeight="60px" alignItems="center" justifyContent="flex-start" flex={1}>
        <VStack alignItems="flex-start" flex={1} spacing={1}>
          <Body fontSize={'14px'} bold isTruncated>
            {project.projectTitle}
          </Body>

          <VStack alignItems="flex-start" spacing={0}>
            <Body size="xs" dark>
              {formattedAmountContributed}{' '}
              <Body as="span" size="xs" muted>
                {`(${formattedUsdAmount})`}
              </Body>
            </Body>
            <HStack spacing={1}>
              <HStack spacing={0.5}>
                <Body size="xs" muted>
                  {t('through')}{' '}
                  <Body as="span" size="xs" dark>
                    {project.contributionsCount}
                  </Body>{' '}
                </Body>
                <PiLightning size="12px" /> {t('from')}{' '}
              </HStack>
              <HStack spacing={0.5}>
                <Body size="xs" dark>
                  <Body as="span" size="xs" muted>
                    {t('from')}{' '}
                  </Body>
                  {project.contributorsCount}
                </Body>{' '}
                <PiUsers size="12px" />
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
