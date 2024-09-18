import { useAtomValue, useSetAtom } from 'jotai'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'

import { useAuthContext } from '@/context'
import { ActivityFeedName, useActivitiesGetQuery } from '@/types'

import { followedActivityDotAtom, myProjectsActivityDotAtom } from '../state/activityDotAtom'
import { lastVisitedFollowedActivityDateAtom, lastVistedMyProjectActivityDateAtom } from '../state/lastVisitedAtom'

export const useActivityHook = () => {
  const { user } = useAuthContext()

  const lastVistedMyProjectActivityDate = useAtomValue(lastVistedMyProjectActivityDateAtom)
  const setMyProjectActivityDot = useSetAtom(myProjectsActivityDotAtom)

  const lastVisitedFollowedActivityDate = useAtomValue(lastVisitedFollowedActivityDateAtom)
  const setFollowedActivityDot = useSetAtom(followedActivityDotAtom)

  const [currentDateTime] = useState(DateTime.now().toMillis())

  useActivitiesGetQuery({
    fetchPolicy: 'network-only',
    skip: !user.id || !currentDateTime,
    variables: {
      input: {
        where: {
          feed: ActivityFeedName.MyProjects,
          createdAt: {
            endDateTime: currentDateTime,
            startDateTime: lastVistedMyProjectActivityDate,
          },
        },
        pagination: {
          take: 1,
        },
      },
    },
    onCompleted(data) {
      console.log('checking myprojeect acitvity', data)

      const myProjectsActivity = data?.activitiesGet.activities || []

      if (myProjectsActivity.length > 0) {
        setMyProjectActivityDot(true)
      } else {
        setMyProjectActivityDot(false)
      }
    },
  })

  useActivitiesGetQuery({
    fetchPolicy: 'network-only',
    skip: !user.id || !currentDateTime,
    variables: {
      input: {
        where: {
          feed: ActivityFeedName.FollowedProjects,
          createdAt: {
            endDateTime: currentDateTime,
            startDateTime: lastVisitedFollowedActivityDate,
          },
        },
        pagination: {
          take: 1,
        },
      },
    },
    onCompleted(data) {
      const myProjectsActivity = data?.activitiesGet.activities || []
      if (myProjectsActivity.length > 0) {
        setFollowedActivityDot(true)
      } else {
        setFollowedActivityDot(false)
      }
    },
  })

  useEffect(() => {
    if (!user.id) {
      setMyProjectActivityDot(false)
      setFollowedActivityDot(false)
    }
  }, [user, setMyProjectActivityDot, setFollowedActivityDot])
}
