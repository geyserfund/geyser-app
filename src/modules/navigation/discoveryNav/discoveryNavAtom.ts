import { atom } from 'jotai'

import { currentRouteAtom } from '@/config/routes'
import { getPath, PathName } from '@/shared/constants'

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
