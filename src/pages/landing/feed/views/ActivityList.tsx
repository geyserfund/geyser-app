import { Divider, Text } from '@chakra-ui/react'

import { Activity } from '../../../../types'
import { ActivityResource } from '../activity.graphql'
import { ContributionActivityItem, EntryActivityItem } from '../components'
import { ProjectActivityItem } from '../components/ProjectActivityItem'
import { RewardActivityItem } from '../components/RewardActivityItem'

export const ActivityList = ({ activities }: { activities: Activity[] }) => {
  const renderActivity = (activity: Activity) => {
    if (!activity.resource) {
      return null
    }

    switch (activity.resource.__typename) {
      case ActivityResource.fundingTx:
        return <ContributionActivityItem fundingTx={activity.resource} />
      case ActivityResource.project:
        return <ProjectActivityItem project={activity.resource} />
      case ActivityResource.entry:
        return <EntryActivityItem entry={activity.resource} />
      case ActivityResource.projectReward:
        return <RewardActivityItem reward={activity.resource} />

      default:
        return null
    }
  }

  if (activities.length === 0) {
    return <Text>No any activity</Text>
  }

  return (
    <>
      {activities.map((activity, index) => {
        return (
          <>
            {renderActivity(activity)}
            {index < activities.length && (
              <Divider
                borderBottomWidth="2px"
                maxWidth="500px"
                color="brand.200"
              />
            )}
          </>
        )
      })}
    </>
  )
}
