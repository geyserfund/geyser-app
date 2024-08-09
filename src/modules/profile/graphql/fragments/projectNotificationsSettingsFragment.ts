import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_NOTIFICATIONS_SETTINGS = gql`
  fragment ProjectNotificationSettings on CreatorNotificationSettings {
    userId
    project {
      id
      title
      image
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
