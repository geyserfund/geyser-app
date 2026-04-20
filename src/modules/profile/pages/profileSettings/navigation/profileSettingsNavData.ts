export enum ProfileSettingsType {
  general = 'general',
  notifications = 'notifications',
  subscriptions = 'subscriptions',
  wallet = 'wallet',
  affiliate = 'affiliate',
}

import { IconType } from 'react-icons'
import { PiBell, PiCoins, PiRepeat, PiUser, PiWallet } from 'react-icons/pi'

import { PathsMap } from '@/shared/constants'

export type ProfileSettingsItem = {
  label: string
  path: keyof PathsMap
  type?: ProfileSettingsType
  icon: IconType
  showDividerAfter?: boolean
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
    showDividerAfter: true,
  },
  {
    label: 'Wallet',
    path: 'userProfileSettingsWallet',
    type: ProfileSettingsType.wallet,
    icon: PiWallet,
  },
  {
    label: 'Ambassador Earnings',
    path: 'userProfileSettingsAffiliate',
    type: ProfileSettingsType.affiliate,
    icon: PiCoins,
  },
  {
    label: 'Recurring Payments',
    path: 'userProfileSettingsSubscriptions',
    type: ProfileSettingsType.subscriptions,
    icon: PiRepeat,
  },
]
