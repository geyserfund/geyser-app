import { Box, HStack, Image, VStack } from '@chakra-ui/react'

import { ContributionsIcon1 } from '@/components/icons/svg/ContributionsIcon1'
import { ContributorsIcon1 } from '@/components/icons/svg/ContributorsIcon1'
import { ImageWithReload } from '@/components/ui'
import { Body } from '@/shared/components/typography'
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
  const { contributors } = useTopContributors(period, MAX_CONTRIBUTORS)

  return (
    <VStack
      width="100%"
      alignItems="flex-start"
      backgroundColor="neutralAlpha.1"
      borderRadius="8px"
      border="1px solid"
      borderColor="neutralAlpha.6"
      p={4}
    >
      <ScrollableList
        data={contributors}
        renderItem={(contributor, index) => (
          <ContributorItem key={contributor.userId} contributor={contributor} rank={index + 1} />
        )}
      />
    </VStack>
  )
}

const ContributorItem = ({ contributor, rank }: { contributor: GlobalContributorLeaderboardRow; rank: number }) => {
  const { formatAmount } = useCurrencyFormatter()

  const formattedAmountContributed = formatAmount(contributor.contributionsCount, 'BTCSAT')

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  return (
    <HStack width="full" spacing={4} padding={'8px, 16px, 8px, 16px'}>
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
          <ContributorsIcon1 />
        </Body>
      </VStack>
    </HStack>
  )
}

const RankMedal = ({ rank }: { rank: number }) => {
  const medalUrl = [GoldMedalUrl, SilverMedalUrl, BronzeMedalUrl]
  return <Image src={medalUrl[rank - 1]} alt={`Rank ${rank}`} boxSize="32px" />
}
