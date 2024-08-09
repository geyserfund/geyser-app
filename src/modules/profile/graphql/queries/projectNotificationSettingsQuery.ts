import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_NOTIFICATIONS_SETTINGS } from '../fragments/projectNotificationsSettingsFragment'

export const QUERY_PROJECT_NOTIFICATIONS_SETTINGS = gql`
  ${FRAGMENT_PROJECT_NOTIFICATIONS_SETTINGS}
  query ProjectNotificationSettings($projectId: BigInt!) {
    projectNotificationSettingsGet(projectId: $projectId) {
      ...ProjectNotificationSettings
    }
  }
`
