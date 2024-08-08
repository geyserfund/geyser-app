import { gql } from '@apollo/client'

export const MUTATION_UPDATE_USER_NOTIFICATIONS_SETTINGS = gql`
  mutation UserNotificationsSettingsUpdate($userNotificationConfigurationId: BigInt!, $value: String!) {
    userNotificationConfigurationValueUpdate(
      userNotificationConfigurationId: $userNotificationConfigurationId
      value: $value
    )
  }
`
