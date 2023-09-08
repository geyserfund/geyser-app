import { useCallback, useMemo } from 'react'

import { RenderTab, TabComponent } from '../../../../components/molecules'
import { User } from '../../../../types'
import { ProfileActivity } from './ProfileActivity'
import { ProfileFollowed } from './ProfileFollowed'
import { ProfileProjects } from './ProfileProjects'
import { ProfileContributions } from './ProfileContributions'

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

  const contributionsTab = useMemo(
    () => ({
      title: 'My contributions',
      Component: () => <ProfileContributions userProfile={userProfile} />,
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

    if (isViewingOwnProfile) {
      tabs.push(contributionsTab)
    }

    if (userProfile.ownerOf?.length > 0 || isViewingOwnProfile) {
      tabs.unshift(projectsTab)
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
