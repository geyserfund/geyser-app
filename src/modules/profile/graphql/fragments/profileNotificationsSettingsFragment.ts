import { gql } from '@apollo/client'

const FRAGMENT_NOTIFICATION_CONFIGURATION = gql`
  fragment NotificationConfiguration on NotificationConfiguration {
    id
    name
    description
    value
    type
    options
  }
`

const FRAGMENT_NOTIFICATION_SETTINGS = gql`
  ${FRAGMENT_NOTIFICATION_CONFIGURATION}

  fragment NotificationSettings on NotificationSettings {
    notificationType
    isEnabled
    configurations {
      ...NotificationConfiguration
    }
  }
`

export const FRAGMENT_PROFILE_NOTIFICATIONS_SETTINGS = gql`
  ${FRAGMENT_NOTIFICATION_SETTINGS}

  fragment ProfileNotificationsSettings on ProfileNotificationSettings {
    userSettings {
      userId
      notificationSettings {
        ...NotificationSettings
      }
    }
    creatorSettings {
      userId
      project {
        id
        title
        image
      }
      notificationSettings {
        ...NotificationSettings
      }
    }
  }
`

export const FRAGMENT_USER_NOTIFICATION_SETTINGS = gql`
  ${FRAGMENT_NOTIFICATION_SETTINGS}

  fragment UserNotificationsSettings on ProfileNotificationSettings {
    userSettings {
      userId
      notificationSettings {
        ...NotificationSettings
      }
    }
  }
`