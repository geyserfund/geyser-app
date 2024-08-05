import { gql } from '@apollo/client'

import { FRAGMENT_USER_NOTIFICATIONS_SETTINGS } from '../fragments/userNotificationsSettingsFragment'

export const QUERY_USER_NOTIFICATIONS_SETTINGS = gql`
  ${FRAGMENT_USER_NOTIFICATIONS_SETTINGS}
  query UserNotificationsSettings($userId: BigInt!) {
    settingsNotificationsUserGet(userId: $userId) {
      ...UserNotificationsSettings
    }
  }
`
