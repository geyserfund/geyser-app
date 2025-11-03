import { Box, HStack, Image, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'
import { PiLightning, PiRocketLaunch } from 'react-icons/pi'
import { Link } from 'react-router'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { BronzeMedalUrl, GoldMedalUrl, SilverMedalUrl } from '@/shared/constants/platform/url'
import { GlobalContributorLeaderboardRow, LeaderboardPeriod } from '@/types'
import { commaFormatted } from '@/utils'

import { useTopContributors } from '../../heroes/hooks'
import { ScrollableList } from './ScrollableList'

interface TopContributorsProps {
  period: LeaderboardPeriod
}

const MAX_CONTRIBUTORS = 100

export const TopContributors = ({ period }: TopContributorsProps) => {
  const { contributors, loading } = useTopContributors(period, MAX_CONTRIBUTORS)

  return (
    <VStack
      width="100%"
      alignItems="flex-start"
      maxHeight={{ base: '100%', lg: '750px' }}
      backgroundColor="neutralAlpha.1"
      borderRadius={{ base: 'none', lg: '8px' }}
      border={{ base: 'none', lg: '1px solid' }}
      borderColor={{ base: 'transparent', lg: 'neutralAlpha.6' }}
      py={{ base: 0, lg: 4 }}
      overflow="hidden"
    >
      {loading ? (
        <TopContributorsSkeleton />
      ) : (
        <ScrollableList
          data={contributors}
          renderItem={(contributor, index) => (
            <ContributorItem key={contributor.userId} contributor={contributor} rank={index + 1} />
          )}
        />
      )}
    </VStack>
  )
}

const ContributorItem = ({ contributor, rank }: { contributor: GlobalContributorLeaderboardRow; rank: number }) => {
  return (
    <HStack
      width="100%"
      spacing={4}
      as={Link}
      to={getPath('userProfile', contributor.userId)}
      _hover={{ backgroundColor: 'neutral1.3', cursor: 'pointer' }}
      py={1}
      px={4}
    >
      <Box justifyContent="center" minWidth="30px">
        {rank <= 3 ? (
          <RankMedal rank={rank} />
        ) : (
          <Body size={'sm'} align={'center'} bold muted>
            {rank}
          </Body>
        )}
      </Box>
      <ImageWithReload
        src={contributor.userImageUrl}
        alt={contributor.username}
        boxSize="42px"
        borderRadius="50%"
        maxHeight="42px"
      />
      <VStack maxHeight="42px" alignItems="flex-start" flex={1} spacing={0}>
        <Body size={'sm'} bold isTruncated>
          {contributor.username}
        </Body>
        <HStack spacing={2}>
          <HStack spacing={0.5}>
            <Body size="sm" dark>
              ${commaFormatted(contributor.contributionsTotalUsd)}
            </Body>
          </HStack>

          <HStack spacing={0.5}>
            <PiLightning size="12px" />

            <Body size="sm" dark>
              {contributor.contributionsCount}
            </Body>
          </HStack>

          <HStack spacing={0.5}>
            <PiRocketLaunch size="12px" />

            <Body size="sm" dark>
              {contributor.projectsContributedCount}{' '}
            </Body>
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  )
}

const RankMedal = ({ rank }: { rank: number }) => {
  const medalUrl = [GoldMedalUrl, SilverMedalUrl, BronzeMedalUrl]
  return <Image src={medalUrl[rank - 1]} alt={`Rank ${rank}`} boxSize="32px" />
}

const TopContributorsSkeleton = () => {
  return (
    <VStack width="100%" spacing={4}>
      {[...Array(13)].map((_, index) => (
        <ContributorItemSkeleton key={index} />
      ))}
    </VStack>
  )
}

const ContributorItemSkeleton = () => {
  return (
    <HStack width="full" spacing={4} padding={'8px 16px'}>
      <Skeleton width="30px" height="30px" borderRadius="full" />
      <SkeletonCircle size="40px" />
      <VStack alignItems="flex-start" flex={1} spacing={1}>
        <Skeleton height="14px" width="120px" />
        <Skeleton height="12px" width="180px" />
      </VStack>
    </HStack>
  )
}
