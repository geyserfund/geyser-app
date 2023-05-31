import { useCallback, useMemo } from 'react'

import { RenderTab, TabComponent } from '../../../../components/molecules'
import { User } from '../../../../types'
import { ProfileActivity } from './ProfileActivity'
import { ProfileFollowed } from './ProfileFollowed'
import { ProfileProjects } from './ProfileProjects'

export const ProfileTabs = ({
  userProfile,
  isLoading,
  isViewingOwnProfile,
}: {
  userProfile: User
  isLoading: boolean
  isViewingOwnProfile?: boolean
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
      sub: userProfile.ownerOf?.length || undefined,
      Component: () => (
        <ProfileProjects
          userProfile={userProfile}
          isViewingOwnProfile={isViewingOwnProfile}
        />
      ),
    }),
    [userProfile, isViewingOwnProfile],
  )

  const followedTab = useMemo(
    () => ({
      title: 'Following',
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

    if (userProfile.ownerOf?.length > 0 || isViewingOwnProfile) {
      tabs = [projectsTab, ...tabs]
    }

    if (userProfile.projectFollows?.length) {
      tabs.push(followedTab)
    }

    return tabs
  }, [
    userProfile,
    isLoading,
    activityTab,
    followedTab,
    isViewingOwnProfile,
    projectsTab,
  ])

  return <TabComponent tabs={getTabs()} />
}
