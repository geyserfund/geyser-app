import { atom } from 'jotai'

import { currentRouteAtom } from '@/config/routes'
import { getPath, PathName, PathsMap } from '@/shared/constants'

import { bottomNavItems } from './DiscoveryBottomNav.tsx'
import { DiscoveryNavItemKey, discoveryNavItems } from './discoveryNavData'

export const currentPlatformNavItemAtom = atom((get) => {
  const currentMatchRoute = get(currentRouteAtom)

  if (!currentMatchRoute) return

  const currentItem = discoveryNavItems.find((item) => {
    if (item.key === DiscoveryNavItemKey.Activity) {
      return currentMatchRoute.path?.includes(getPath(item.path, PathName.projectName))
    }

    return currentMatchRoute.path === getPath(item.path, PathName.projectName)
  })
  return currentItem
})

export const currentBottomNavItemAtom = atom((get) => {
  const currentMatchRoute = get(currentRouteAtom)

  if (!currentMatchRoute) return

  const currentItem = bottomNavItems.find((item) => {
    return currentMatchRoute.path === getPath(item.path as keyof PathsMap, PathName.projectName)
  })
  return currentItem
})
