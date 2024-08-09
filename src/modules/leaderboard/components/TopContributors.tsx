import { HStack, Image, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { GlobalContributorLeaderboardRow, LeaderboardPeriod } from '@/types'
import { commaFormatted } from '@/utils'

import { useTopContributors } from '../hooks'
import { ScrollableList } from './ScrollableList'

interface TopContributorsProps {
  period: LeaderboardPeriod
}

export const TopContributors = ({ period }: TopContributorsProps) => {
  const { t } = useTranslation()
  const { contributors } = useTopContributors(period)

  return (
    <VStack width="full" alignItems="flex-start" spacing={4}>
      <Text fontSize="2xl" fontWeight="bold">
        {t('Top Contributors')}
      </Text>
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
  const { t } = useTranslation()

  return (
    <HStack width="full" spacing={4} p={2} borderBottom="1px" borderColor="gray.200">
      <Text fontWeight="bold" minWidth="30px">
        {rank <= 3 ? <RankMedal rank={rank} /> : `#${rank}`}
      </Text>
      <VStack alignItems="flex-start" flex={1}>
        <Text fontWeight="bold">{contributor.username}</Text>
        <Text fontSize="sm">{commaFormatted(contributor.contributionsTotal)} sats</Text>
        <Text fontSize="sm">
          {t('{{count}} projects contributed', { count: contributor.projectsContributedCount })}
        </Text>
      </VStack>
    </HStack>
  )
}

const RankMedal = ({ rank }: { rank: number }) => {
  const medalColors = ['gold', 'silver', 'bronze']
  return <Image src={`/images/medals/${medalColors[rank - 1]}.svg`} alt={`Rank ${rank}`} boxSize="24px" />
}
