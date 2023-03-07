import { Divider, VStack } from '@chakra-ui/react'

import { AlertBox } from '../../../components/ui'
import { ID } from '../../../constants/components'
import { ScrollInvoke } from '../../../helpers'
import { useQueryWithPagination } from '../../../hooks'
import { Activity } from '../../../types/generated/graphql'
import { useMobileMode } from '../../../utils'
import {
  ActivityResource,
  QUERY_ACTIVITIES_FOR_LANDING_PAGE,
} from './activity.graphql'
import { ContributionActivityItemSkeleton } from './components'
import { ActivityList } from './views/ActivityList'

const itemLimit = 50

export const ActivityFeed = () => {
  const isMobile = useMobileMode()
  const {
    isLoading,
    isLoadingMore,
    noMoreItems,
    data: activities,
    error,
    fetchNext,
  } = useQueryWithPagination<Activity>({
    itemLimit,
    queryName: 'getActivities',
    query: QUERY_ACTIVITIES_FOR_LANDING_PAGE,
    resultMap(rawActivities: any[]) {
      // Re-mapping aliased keys to stick to Generated Types
      const newActivities = rawActivities.map((activity) => {
        const newActivity = { ...activity }
        if (activity.resource.__typename === ActivityResource.entry) {
          newActivity.resource.fundersCount =
            activity.resource.entryFundersCount
          newActivity.resource.description = activity.resource.entrydescription
        }

        if (activity.resource.__typename === ActivityResource.projectReward) {
          newActivity.resource.name = activity.resource.rewardName
          newActivity.resource.project = activity.resource.rewardProject
        }

        return newActivity
      })
      return newActivities
    },
  })

  if (error) {
    return (
      <AlertBox
        height="200px"
        status="error"
        title="An error occurred while attempting to fetch contributions."
        message="Please try refreshing the page. You may also want to contact support if the problem persists."
      />
    )
  }

  if (isLoading) {
    return <ContributionsSkeleton />
  }

  console.log('checking activities', activities)

  return (
    <VStack flexDirection={'column'} spacing={6} width="full">
      <VStack
        alignItems={'center'}
        width="full"
        spacing={'20px'}
        maxWidth="500px"
        paddingX="10px"
      >
        <ActivityList activities={activities} />
      </VStack>

      <ScrollInvoke
        elementId={isMobile ? undefined : ID.root}
        onScrollEnd={fetchNext}
        isLoading={isLoadingMore}
        noMoreItems={noMoreItems}
      />
    </VStack>
  )
}

export const ContributionsSkeleton = () => {
  return (
    <VStack flexDirection={'column'} spacing={6} width="full" paddingX="20px">
      <VStack alignItems={'center'} width="full" spacing={'12px'}>
        {[1, 2, 3, 4, 5, 6].map((value) => {
          return (
            <VStack key={value} width="full">
              <ContributionActivityItemSkeleton />
              {value < 6 && (
                <Divider
                  borderBottomWidth="2px"
                  maxWidth="500px"
                  color="brand.200"
                />
              )}
            </VStack>
          )
        })}
      </VStack>
    </VStack>
  )
}
