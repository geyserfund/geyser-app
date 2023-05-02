import { useSubscription } from '@apollo/client'
import { createContext, useCallback, useContext, useState } from 'react'

import { ACTIVITY_CREATION_SUBSCRIPTION } from '../graphql/subscriptions'
import { Activity, ActivityCreatedSubscriptionInput } from '../types'
import { toInt } from '../utils'
import { useAuthContext } from './auth'

export interface ActivitySubscriptionState {
  activities: Activity[]
  clearActivity: () => void
}

const defaultActivitySubscriptionContext = {
  activities: [],
  addActivitiy() {},
  clearActivity() {},
}

export const ActivitySubscriptionContext =
  createContext<ActivitySubscriptionState>(defaultActivitySubscriptionContext)

export const ActivitySubscriptionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [activities, setActivities] = useState<Activity[]>([])
  const { isLoggedIn, user } = useAuthContext()

  const skipSubscription = !isLoggedIn || !(user?.projectFollows?.length > 0)

  useSubscription<
    { activityCreated: Activity },
    ActivityCreatedSubscriptionInput
  >(ACTIVITY_CREATION_SUBSCRIPTION, {
    variables: {
      where: {
        projectIds: user?.projectFollows.map((projects) => toInt(projects?.id)),
      },
    },
    skip: skipSubscription,
    onSubscriptionData(options) {
      const activityCreated = options.subscriptionData.data?.activityCreated
      if (activityCreated) {
        setActivities([...activities, activityCreated])
      }
    },
  })

  const clearActivity = useCallback(() => {
    setActivities([])
  }, [])

  return (
    <ActivitySubscriptionContext.Provider value={{ activities, clearActivity }}>
      {children}
    </ActivitySubscriptionContext.Provider>
  )
}

export const useActivitySubsciptionContext = () =>
  useContext(ActivitySubscriptionContext)
