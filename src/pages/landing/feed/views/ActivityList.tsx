import { Divider, Text } from '@chakra-ui/react'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import { ActivityForLandingPageFragment } from '../../../../types'
import {
  ContributionActivityItem,
  EntryActivityItem,
  ProjectActivityItem,
  RewardActivityItem,
} from '../components'
import { ActivityResource } from '../types'

const renderActivity = (activity: ActivityForLandingPageFragment) => {
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

export const ActivityList = ({
  activities,
}: {
  activities: ActivityForLandingPageFragment[]
}) => {
  const { t } = useTranslation()
  if (activities.length === 0) {
    return <Text>{t('This user has no activity yet.')}</Text>
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
                color="neutral.200"
              />
            )}
          </Fragment>
        )
      })}
    </>
  )
}
