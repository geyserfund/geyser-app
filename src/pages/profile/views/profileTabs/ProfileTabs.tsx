import { useCallback } from 'react'

import { useUserProfileAtomValue, useViewingOwnProfileAtomValue } from '../../state'
import { RenderTab, TabComponent } from './components/TabComponent'
import { useProfileContributions } from './hooks/useProfileContributions'
import { useProfileFollowed } from './hooks/useProfileFollowed'
import { useProfileOrders } from './hooks/useProfileOrders'
import { useProfileProjects } from './hooks/useProfileProjects'

export const ProfileTabs = ({ isLoading }: { isLoading: boolean }) => {
  const userProfile = useUserProfileAtomValue()
  const isViewingOwnProfile = useViewingOwnProfileAtomValue()

  const projectsTab = useProfileProjects(userProfile.id)
  const followedTab = useProfileFollowed(userProfile.id)
  const contributionsTab = useProfileContributions(userProfile.id)
  const purchasesTab = useProfileOrders(userProfile.id, isViewingOwnProfile)

  const getTabs = useCallback(() => {
    const tabs: RenderTab[] = [contributionsTab]

    if (projectsTab.sub > 0 || isViewingOwnProfile || projectsTab.isLoading) {
      tabs.unshift(projectsTab)
    }

    if ((purchasesTab.sub > 0 || purchasesTab.isLoading) && isViewingOwnProfile) {
      tabs.push(purchasesTab)
    }

    if (followedTab.sub > 0 || followedTab.isLoading) {
      tabs.push(followedTab)
    }

    return tabs
  }, [followedTab, contributionsTab, isViewingOwnProfile, projectsTab, purchasesTab])

  const allLoading =
    isLoading ||
    (projectsTab.isLoading && followedTab.isLoading && contributionsTab.isLoading && purchasesTab.isLoading)

  return <TabComponent tabs={getTabs()} isLoading={allLoading} />
}
