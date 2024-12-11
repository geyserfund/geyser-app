export enum ProfileSettingsType {
  general = 'general',
  notifications = 'notifications',
  subscriptions = 'subscriptions',
}

import { IconType } from 'react-icons'
import { PiBell, PiRepeat, PiUser } from 'react-icons/pi'

import { PathsMap } from '@/shared/constants'

export type ProfileSettingsItem = {
  label: string
  path: keyof PathsMap
  type?: ProfileSettingsType
  icon: IconType
}

export const profileSettingsItems: ProfileSettingsItem[] = [
  {
    label: 'Profile',
    path: 'userProfileSettingsGeneral',
    type: ProfileSettingsType.general,
    icon: PiUser,
  },

  {
    label: 'Notifications',
    path: 'userProfileSettingsNotifications',
    type: ProfileSettingsType.notifications,
    icon: PiBell,
  },
  {
    label: 'Subscriptions',
    path: 'userProfileSettingsSubscriptions',
    type: ProfileSettingsType.subscriptions,
    icon: PiRepeat,
  },
]
