import { useAtomValue, useSetAtom } from 'jotai'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'

import { useAuthContext } from '@/context'
import { ActivityFeedName, useActivitiesGetQuery } from '@/types'

import { myProjectsActivityDotAtom } from '../state/activityDotAtom'
import { lastVistedMyProjectActivityDateAtom } from '../state/lastVisitedAtom'

export const useActivityHook = () => {
  const { user } = useAuthContext()

  const lastVistedMyProjectActivityDate = useAtomValue(lastVistedMyProjectActivityDateAtom)
  const setMyProjectActivityDot = useSetAtom(myProjectsActivityDotAtom)

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
      const myProjectsActivity = data?.activitiesGet.activities || []

      if (myProjectsActivity.length > 0) {
        setMyProjectActivityDot(true)
      } else {
        setMyProjectActivityDot(false)
      }
    },
  })

  useEffect(() => {
    if (!user.id) {
      setMyProjectActivityDot(false)
    }
  }, [user, setMyProjectActivityDot])
}
