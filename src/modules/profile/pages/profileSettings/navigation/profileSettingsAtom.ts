import { atom } from 'jotai'

import { currentRouteAtom } from '@/config/routes'
import { routeMatchForAtom } from '@/config/routes/routeGroups'
import { getPath, PathName } from '@/shared/constants'

import { profileSettingsItems } from './profileSettingsNavData'

export const currentProfileSettingsItemAtom = atom((get) => {
  const currentMatchRoute = get(currentRouteAtom)

  if (!currentMatchRoute) return

  const currentItem = profileSettingsItems.find(
    (item) => currentMatchRoute.path === getPath(item.path, PathName.userId),
  )
  return currentItem
})

export const isProfileSettingsMainRouteAtom = atom(routeMatchForAtom([getPath('userProfileSettings', PathName.userId)]))
