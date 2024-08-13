import { Box, HStack, Image, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { ContributionsIcon1 } from '@/components/icons/svg/ContributionsIcon1'
import { RocketLaunchIcon } from '@/components/icons/svg/RocketLaunch'
import { ImageWithReload } from '@/components/ui'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { BronzeMedalUrl, GoldMedalUrl, SilverMedalUrl } from '@/shared/constants/platform/url'
import { useCurrencyFormatter } from '@/shared/utils/hooks'
import { GlobalContributorLeaderboardRow, LeaderboardPeriod } from '@/types'

import { useTopContributors } from '../hooks'
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
      maxHeight="750px"
      backgroundColor="neutralAlpha.1"
      borderRadius={{ base: 'none', lg: '8px' }}
      border={{ base: 'none', lg: '1px solid' }}
      borderColor={{ base: 'transparent', lg: 'neutralAlpha.6' }}
      p={{ base: 0, lg: 4 }}
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
  const navigate = useNavigate()

  const { formatAmount } = useCurrencyFormatter()

  const formattedAmountContributed = formatAmount(contributor.contributionsCount, 'BTCSAT')

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  const handleClick = () => {
    navigate(getPath('userProfile', contributor.username))
  }

  return (
    <HStack
      width="full"
      spacing={4}
      padding={'8px, 16px, 8px, 16px'}
      onClick={handleClick}
      _hover={{ cursor: 'pointer' }}
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
      <ImageWithReload src={contributor.userImageUrl} alt={contributor.username} boxSize="40px" borderRadius="16px" />
      <VStack maxHeight="38px" alignItems="flex-start" flex={1} spacing={0}>
        <Body fontSize={'14px'} bold isTruncated>
          {truncateText(contributor.username, 35)}
        </Body>
        <Body size="xs" dark>
          {formattedAmountContributed} <ContributionsIcon1 /> {contributor.projectsContributedCount}{' '}
          <RocketLaunchIcon />
        </Body>
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
