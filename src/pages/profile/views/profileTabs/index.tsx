import { useCallback } from 'react'

import { RenderTab, TabComponent } from '../../../../components/molecules'
import { User } from '../../../../types'
import { ProfileActivity } from './ProfileActivity'
import { ProfileFollowed } from './ProfileFollowed'
import { ProfileProjects } from './ProfileProjects'

export const ProfileTabs = ({ userProfile }: { userProfile: User }) => {
  const getTabs = useCallback(() => {
    let tabs: RenderTab[] = [
      {
        title: 'Activity',
        Component: () => <ProfileActivity userProfile={userProfile} />,
      },
    ]

    if (userProfile.ownerOf?.length > 0) {
      tabs = [
        {
          title: 'Projects',
          sub: userProfile.ownerOf?.length,
          Component: () => <ProfileProjects userProfile={userProfile} />,
        },
        ...tabs,
      ]
    }

    if (userProfile.projectFollows?.length) {
      tabs.push({
        title: 'Followed',
        sub: userProfile.projectFollows?.length || undefined,
        Component: () => <ProfileFollowed userProfile={userProfile} />,
      })
    }

    return tabs
  }, [userProfile])

  return <TabComponent tabs={getTabs()} />
}
