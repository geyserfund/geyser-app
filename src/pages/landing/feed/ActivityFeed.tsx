import { Button, Divider, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { AlertBox } from '../../../components/ui'
import { ID } from '../../../constants'
import {
  useActivitySubsciptionContext,
  useAuthContext,
  useFilterContext,
} from '../../../context'
import { QUERY_ACTIVITIES_FOR_LANDING_PAGE } from '../../../graphql/queries/activities'
import { ScrollInvoke } from '../../../helpers'
import { useQueryWithPagination } from '../../../hooks'
import { ActivityForLandingPageFragment, Project } from '../../../types'
import { useMobileMode } from '../../../utils'
import { NoSearchResults } from '../components'
import { FilterTopBar } from '../projects/components'
import { ContributionActivityItemSkeleton } from './components'
import { NoFollowedProjects } from './views'
import { ActivityList } from './views/ActivityList'

const itemLimit = 50

export const ActivityFeed = () => {
  const isMobile = useMobileMode()

  const { followedProjects } = useAuthContext()
  const { clearActivity, activities: subscriptionActivities } =
    useActivitySubsciptionContext()
  const { filters } = useFilterContext()
  const { activity, tagIds, region, countryCode } = filters

  const [aggregatedActivites, setAggregatedActivites] = useState<
    ActivityForLandingPageFragment[]
  >([])

  const [initialFollowedProjects, setInitialFollowedProject] = useState<
    Pick<Project, 'id' | 'title' | 'name'>[]
  >([])

  useEffect(() => {
    if (followedProjects && initialFollowedProjects.length === 0) {
      setInitialFollowedProject(followedProjects)
    }
  }, [followedProjects, initialFollowedProjects])

  const {
    isLoading,
    isLoadingMore,
    noMoreItems,
    data: activities,
    error,
    fetchNext,
  } = useQueryWithPagination<ActivityForLandingPageFragment>({
    itemLimit,
    queryName: 'getActivities',
    query: QUERY_ACTIVITIES_FOR_LANDING_PAGE,
    where: {
      countryCode,
      region,
      resourceType: activity,
      tagIds,
      projectIds: initialFollowedProjects.map((project) => project.id),
    },
    options: {
      skip: initialFollowedProjects.length === 0,
      onCompleted() {
        clearActivity()
      },
    },
  })

  useEffect(() => {
    setAggregatedActivites(activities)
  }, [activities])

  const handleClick = () => {
    setAggregatedActivites([...subscriptionActivities, ...aggregatedActivites])
    clearActivity()
  }

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

  if (followedProjects.length === 0) {
    return <NoFollowedProjects />
  }

  if (isLoading || initialFollowedProjects.length === 0) {
    return <ContributionsSkeleton />
  }

  if (activities.length === 0) {
    return <NoSearchResults />
  }

  return (
    <VStack flexDirection={'column'} spacing={6} width="full">
      <VStack
        alignItems={'center'}
        width="full"
        spacing={'20px'}
        maxWidth="500px"
        paddingX={{ base: 0, lg: '10px' }}
      >
        {!isMobile && <FilterTopBar noSort paddingBottom="20px" />}

        {subscriptionActivities.length > 0 && (
          <ViewUpdates
            length={subscriptionActivities.length}
            onClick={handleClick}
          />
        )}

        <ActivityList activities={aggregatedActivites} />
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
    <VStack flexDirection={'column'} spacing={6} width="full" paddingX="0px">
      <VStack alignItems={'center'} width="full" spacing={'12px'} px={0}>
        {[1, 2, 3, 4, 5, 6].map((value) => {
          return (
            <VStack key={value} width="full">
              <ContributionActivityItemSkeleton />
              {value < 6 && (
                <Divider
                  borderBottomWidth="2px"
                  maxWidth="500px"
                  color="neutral.200"
                />
              )}
            </VStack>
          )
        })}
      </VStack>
    </VStack>
  )
}

const ViewUpdates = ({
  onClick,
  length,
}: {
  length: number
  onClick: () => void
}) => {
  const displayText =
    length > 1 ? `Show ${length} new items` : `Show ${length} new item`
  return (
    <>
      <Button
        size="sm"
        variant="secondary"
        onClick={onClick}
        _hover={{}}
        _focus={{ color: 'primary.700' }}
        _active={{ color: 'primary.700' }}
        color="primary.500"
      >
        {displayText}
      </Button>
      <Divider borderBottomWidth="2px" maxWidth="500px" color="neutral.200" />
    </>
  )
}
