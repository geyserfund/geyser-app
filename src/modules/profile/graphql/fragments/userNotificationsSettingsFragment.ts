import { gql } from '@apollo/client'

export const FRAGMENT_USER_NOTIFICATIONS_SETTINGS = gql`
  fragment UserNotificationsSettings on UserNotificationSettings {
    userId
    notificationSettings {
      notificationType
      isEnabled
      configurations {
        id
        name
        description
        value
        type
        options
      }
    }
  }
`
