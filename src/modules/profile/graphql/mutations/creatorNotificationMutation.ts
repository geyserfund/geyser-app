import { gql } from '@apollo/client'

export const MUTATION_UPDATE_CREATOR_NOTIFICATIONS_SETTINGS = gql`
  mutation CreatorNotificationsSettingsUpdate($creatorNotificationConfigurationId: BigInt!, $value: String!) {
    creatorNotificationConfigurationValueUpdate(
      creatorNotificationConfigurationId: $creatorNotificationConfigurationId
      value: $value
    )
  }
`
