import { Divider, VStack } from '@chakra-ui/react'

import { AlertBox } from '../../../components/ui'
import { ID } from '../../../constants/components'
import { useAuthContext, useFilterContext } from '../../../context'
import { ScrollInvoke } from '../../../helpers'
import { useQueryWithPagination } from '../../../hooks'
import { Activity } from '../../../types/generated/graphql'
import { useMobileMode } from '../../../utils'
import { FilterTopBar } from '../projects/components'
import {
  ActivityResource,
  QUERY_ACTIVITIES_FOR_LANDING_PAGE,
} from './activity.graphql'
import { ContributionActivityItemSkeleton } from './components'
import { NoFollowedProjects } from './views'
import { ActivityList } from './views/ActivityList'

const itemLimit = 50

export const ActivityFeed = () => {
  const isMobile = useMobileMode()
  const { followedProjects } = useAuthContext()
  const { filters } = useFilterContext()
  const { activity, tagIds, region, countryCode } = filters

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
        const newResource = { ...activity.resource }
        if (newResource.__typename === ActivityResource.entry) {
          newResource.fundersCount = newResource.entryFundersCount
          newResource.description = newResource.entrydescription
        }

        if (newResource.__typename === ActivityResource.projectReward) {
          newResource.name = newResource.rewardName
          newResource.project = newResource.rewardProject
        }

        return { ...activity, resource: newResource }
      })
      return newActivities
    },
    where: {
      countryCode,
      region,
      resourceType: activity,
      tagIds,
      projectIds: followedProjects.map((project) => project.id),
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

  if (followedProjects.length === 0) {
    return <NoFollowedProjects />
  }

  return (
    <VStack flexDirection={'column'} spacing={6} width="full">
      <VStack
        alignItems={'center'}
        width="full"
        spacing={'20px'}
        maxWidth="500px"
        paddingX="10px"
      >
        {!isMobile && <FilterTopBar noSort />}
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
