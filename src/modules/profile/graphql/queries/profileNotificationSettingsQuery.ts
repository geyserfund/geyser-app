import { gql } from '@apollo/client'

import { FRAGMENT_PROFILE_NOTIFICATIONS_SETTINGS } from '../fragments/profileNotificationsSettingsFragment'

export const QUERY_PROFILE_NOTIFICATIONS_SETTINGS = gql`
  ${FRAGMENT_PROFILE_NOTIFICATIONS_SETTINGS}
  query ProfileNotificationsSettings($userId: BigInt!) {
    userNotificationSettingsGet(userId: $userId) {
      ...ProfileNotificationsSettings
    }
  }
`
