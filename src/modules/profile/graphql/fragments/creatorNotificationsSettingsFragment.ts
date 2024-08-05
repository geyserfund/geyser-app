import { gql } from '@apollo/client'

export const FRAGMENT_CREATOR_NOTIFICATIONS_SETTINGS = gql`
  fragment CreatorNotificationsSettings on CreatorNotificationSettings {
    userId
    project {
      id
      title
    }
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
