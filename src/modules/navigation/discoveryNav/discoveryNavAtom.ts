import { atom } from 'jotai'

import { currentRouteAtom } from '@/config/routes'
import { getPath, PathName } from '@/shared/constants'

import { discoveryNavItems } from './discoveryNavData'

export const currentPlatformNavItemAtom = atom((get) => {
  const currentMatchRoute = get(currentRouteAtom)

  if (!currentMatchRoute) return

  const currentItem = discoveryNavItems.find(
    (item) => currentMatchRoute.path === getPath(item.path, PathName.projectName),
  )
  return currentItem
})
