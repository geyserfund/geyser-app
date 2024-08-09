import { StackProps, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { DateTime } from 'luxon'
import { useState } from 'react'

import { ScrollInvoke } from '@/helpers'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { fundersFamily, LeaderboardPeriod } from '@/modules/project/state/fundersAtom'
import { usePaginationAtomHook } from '@/shared/hooks'
import { OrderByOptions, ProjectFunderFragment, useProjectPageFundersQuery } from '@/types'
import { useMobileMode } from '@/utils'

import { NoContribution } from '../../../body/sections/leaderboardSummary/components/NoContribution'
import { LeaderboardItem, LeaderboardItemSkeleton } from './components/LeaderboardItem'

export const MAXIMUM_LEADERBOARD_ITEMS = 30

type LeaderboardListProps = {
  period: LeaderboardPeriod
  dateTime: DateTime
} & StackProps

export const LeaderboardList = ({ period, dateTime, ...props }: LeaderboardListProps) => {
  const isMobile = useMobileMode()

  const { project } = useProjectAtom()

  const [funders, setFunders] = useAtom(fundersFamily({ period }))

  const [isLoading, setIsLoading] = useState(true)

  const current = dateTime.toMillis()
  const aWeekAgo = dateTime.minus({ days: 7 }).toMillis()
  const aMonthAgo = dateTime.minus({ days: 30 }).toMillis()

  const dateRange =
    period === LeaderboardPeriod.lastWeek
      ? { startDateTime: aWeekAgo, endDateTime: current }
      : period === LeaderboardPeriod.lastMonth
      ? { startDateTime: aMonthAgo, endDateTime: current }
      : undefined

  const where = {
    projectId: project.id,
    confirmed: true,
    dateRange,
  }

  const orderBy = {
    amountFunded: OrderByOptions.Desc,
  }

  const { fetchMore } = useProjectPageFundersQuery({
    skip: !project.id,
    fetchPolicy: 'network-only',
    variables: {
      input: {
        where,
        orderBy,
        pagination: {
          take: MAXIMUM_LEADERBOARD_ITEMS,
        },
      },
    },
    onCompleted(data) {
      handleDataUpdate(data.fundersGet || [])
      setIsLoading(false)
    },
    onError(error) {
      setIsLoading(false)
    },
  })

  const { handleDataUpdate, isLoadingMore, noMoreItems, fetchNext } = usePaginationAtomHook<ProjectFunderFragment>({
    fetchMore,
    queryName: ['fundersGet'],
    itemLimit: MAXIMUM_LEADERBOARD_ITEMS,
    where,
    orderBy,
    setData: setFunders,
  })

  const id = 'leaderboard-scroll-container'

  if (isLoading) {
    return <LeaderboardListSkeleton />
  }

  if (funders.length === 0) {
    return <NoContribution />
  }

  return (
    <VStack w="full" h="full" id={id} overflowY={{ base: undefined, lg: 'auto' }} {...props}>
      {funders.map((funder, index) => {
        return <LeaderboardItem key={funder.id} funder={funder} rank={index + 1} />
      })}
      <ScrollInvoke
        elementId={!isMobile ? id : undefined}
        onScrollEnd={fetchNext}
        isLoading={isLoadingMore}
        noMoreItems={noMoreItems}
      />
    </VStack>
  )
}

const LeaderboardListSkeleton = () => {
  return (
    <VStack w="full" h="full" overflowY={{ base: undefined, lg: 'auto' }}>
      {[1, 2, 3, 4, 5, 6].map((item) => {
        return <LeaderboardItemSkeleton key={item} />
      })}
    </VStack>
  )
}
