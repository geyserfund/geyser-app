import { gql } from '@apollo/client'

import { FRAGMENT_CREATOR_NOTIFICATIONS_SETTINGS } from '../fragments/creatorNotificationsSettingsFragment'

export const QUERY_CREATOR_NOTIFICATIONS_SETTINGS = gql`
  ${FRAGMENT_CREATOR_NOTIFICATIONS_SETTINGS}
  query CreatorNotificationsSettings($userId: BigInt!) {
    settingsNotificationsCreatorGet(userId: $userId) {
      ...CreatorNotificationsSettings
    }
  }
`
