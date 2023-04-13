import { useCallback, useMemo } from 'react'

import { RenderTab, TabComponent } from '../../../../components/molecules'
import { User } from '../../../../types'
import { ProfileActivity } from './ProfileActivity'
import { ProfileFollowed } from './ProfileFollowed'
import { ProfileProjects } from './ProfileProjects'

export const ProfileTabs = ({
  userProfile,
  isLoading,
}: {
  userProfile: User
  isLoading: boolean
}) => {
  const activityTab = useMemo(
    () => ({
      title: 'Activity',
      Component: () => <ProfileActivity userProfile={userProfile} />,
    }),
    [userProfile],
  )

  const projectsTab = useMemo(
    () => ({
      title: 'Projects',
      sub: userProfile.ownerOf?.length,
      Component: () => <ProfileProjects userProfile={userProfile} />,
    }),
    [userProfile],
  )

  const followedTab = useMemo(
    () => ({
      title: 'Followed',
      sub: userProfile.projectFollows?.length || undefined,
      Component: () => <ProfileFollowed userProfile={userProfile} />,
    }),
    [userProfile],
  )

  const getTabs = useCallback(() => {
    let tabs: RenderTab[] = [activityTab]
    if (isLoading) {
      return [activityTab]
    }

    if (userProfile.ownerOf?.length > 0) {
      tabs = [projectsTab, ...tabs]
    }

    if (userProfile.projectFollows?.length) {
      tabs.push(followedTab)
    }

    return tabs
  }, [userProfile, isLoading])

  return <TabComponent tabs={getTabs()} />
}
