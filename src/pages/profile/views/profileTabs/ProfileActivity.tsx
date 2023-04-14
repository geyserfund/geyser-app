import { AlertBox } from '../../../../components/ui'
import { ID } from '../../../../constants'
import { ScrollInvoke } from '../../../../helpers'
import { useQueryWithPagination } from '../../../../hooks'
import { Activity, User } from '../../../../types'
import { useMobileMode } from '../../../../utils'
import {
  MapAliasedActivityProperties,
  QUERY_ACTIVITIES_FOR_LANDING_PAGE,
} from '../../../landing/feed/activity.graphql'
import { ContributionsSkeleton } from '../../../landing/feed/ActivityFeed'
import { ActivityList } from '../../../landing/feed/views/ActivityList'
import { ProfileTabLayout } from '../../components'

const MaxProfileActivityLimit = 12

export const ProfileActivity = ({ userProfile }: { userProfile: User }) => {
  const isMobile = useMobileMode()

  const {
    isLoading,
    isLoadingMore,
    noMoreItems,
    data: activities,
    error,
    fetchNext,
  } = useQueryWithPagination<Activity>({
    itemLimit: MaxProfileActivityLimit,
    queryName: 'getActivities',
    query: QUERY_ACTIVITIES_FOR_LANDING_PAGE,
    resultMap: MapAliasedActivityProperties,
    where: {
      userIds: [userProfile?.id],
    },
  })

  if (error) {
    return (
      <AlertBox
        height="200px"
        status="error"
        title="An error occurred while attempting to fetch user activity."
        message="Please try refreshing the page. You may also want to contact support if the problem persists."
      />
    )
  }

  return (
    <ProfileTabLayout title="Activity">
      {isLoading ? (
        <ContributionsSkeleton />
      ) : (
        <>
          <ActivityList activities={activities} />

          <ScrollInvoke
            elementId={isMobile ? undefined : ID.root}
            onScrollEnd={fetchNext}
            isLoading={isLoadingMore}
            noMoreItems={noMoreItems}
          />
        </>
      )}
    </ProfileTabLayout>
  )
}
