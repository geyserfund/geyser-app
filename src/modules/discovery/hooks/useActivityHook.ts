import { useAtomValue, useSetAtom } from 'jotai'
import { DateTime } from 'luxon'
import { useEffect } from 'react'

import { useAuthContext } from '@/context'
import { ActivityFeedName, useActivitiesGetLazyQuery } from '@/types'

import { followedActivityDotAtom, myProjectsActivityDotAtom } from '../state/activityDotAtom'
import { lastVisitedFollowedActivityDateAtom, lastVistedMyProjectActivityDateAtom } from '../state/lastVisitedAtom'

export const useActivityHook = () => {
  const { user } = useAuthContext()

  const lastVistedMyProjectActivityDate = useAtomValue(lastVistedMyProjectActivityDateAtom)
  const setMyProjectActivityDot = useSetAtom(myProjectsActivityDotAtom)

  const lastVisitedFollowedActivityDate = useAtomValue(lastVisitedFollowedActivityDateAtom)
  const setFollowedActivityDot = useSetAtom(followedActivityDotAtom)

  const [getActivitesGetQuery] = useActivitiesGetLazyQuery({})

  useEffect(() => {
    if (!user.id) {
      return
    }

    const dateNow = DateTime.now().toJSDate()

    getActivitesGetQuery({
      variables: {
        input: {
          where: {
            feed: ActivityFeedName.MyProjects,
            createdAt: {
              endDateTime: dateNow,
              startDateTime: lastVistedMyProjectActivityDate,
            },
          },
        },
      },
      onCompleted(data) {
        const myProjectsActivity = data?.activitiesGet.activities || []
        if (myProjectsActivity.length > 0) {
          setMyProjectActivityDot(true)
        } else {
          setMyProjectActivityDot(false)
        }
      },
    })
  }, [lastVistedMyProjectActivityDate, user, setMyProjectActivityDot])

  useEffect(() => {
    if (!user.id) {
      return
    }

    const dateNow = DateTime.now().toJSDate()
    getActivitesGetQuery({
      variables: {
        input: {
          where: {
            feed: ActivityFeedName.FollowedProjects,
            createdAt: {
              endDateTime: dateNow,
              startDateTime: lastVisitedFollowedActivityDate,
            },
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
  }, [lastVisitedFollowedActivityDate, user, setFollowedActivityDot])
}
