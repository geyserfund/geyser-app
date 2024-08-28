import { gql } from '@apollo/client'

import {
  FRAGMENT_PROFILE_NOTIFICATIONS_SETTINGS,
  FRAGMENT_USER_NOTIFICATION_SETTINGS,
} from '../fragments/profileNotificationsSettingsFragment'

export const QUERY_PROFILE_NOTIFICATIONS_SETTINGS = gql`
  ${FRAGMENT_PROFILE_NOTIFICATIONS_SETTINGS}
  query ProfileNotificationsSettings($userId: BigInt!) {
    userNotificationSettingsGet(userId: $userId) {
      ...ProfileNotificationsSettings
    }
  }
`

export const QUERY_USER_NOTIFICATION_SETTINGS = gql`
  ${FRAGMENT_USER_NOTIFICATION_SETTINGS}
  query UserNotificationsSettings($userId: BigInt!) {
    userNotificationSettingsGet(userId: $userId) {
      ...UserNotificationsSettings
    }
  }
`
