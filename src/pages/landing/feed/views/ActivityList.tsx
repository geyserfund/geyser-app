import { Divider, Text } from '@chakra-ui/react'
import { Fragment } from 'react'

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
        return (
          <ContributionActivityItem
            fundingTx={activity.resource}
            dateTime={activity.createdAt}
            showsProjectLink
          />
        )
      case ActivityResource.project:
        return (
          <ProjectActivityItem
            project={activity.resource}
            dateTime={activity.createdAt}
          />
        )
      case ActivityResource.entry:
        return (
          <EntryActivityItem
            entry={activity.resource}
            dateTime={activity.createdAt}
          />
        )
      case ActivityResource.projectReward:
        return (
          <RewardActivityItem
            reward={activity.resource}
            dateTime={activity.createdAt}
          />
        )

      default:
        return null
    }
  }

  if (activities.length === 0) {
    return <Text>This user has no activity yet.</Text>
  }

  return (
    <>
      {activities.map((activity, index) => {
        return (
          <Fragment key={activity.id}>
            {renderActivity(activity)}
            {index < activities.length - 1 && (
              <Divider
                borderBottomWidth="2px"
                maxWidth="500px"
                color="brand.200"
              />
            )}
          </Fragment>
        )
      })}
    </>
  )
}
