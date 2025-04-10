import { gql } from '@apollo/client'

export const AMBASSADOR_ADD_MUTATION = gql`
  mutation AmbassadorAdd($input: AmbassadorAddInput!) {
    ambassadorAdd(input: $input) {
      id
      payoutRate
      user {
        id
        username
      }
    }
  }
`

export const AMBASSADOR_UPDATE_MUTATION = gql`
  mutation AmbassadorUpdate($input: AmbassadorUpdateInput!) {
    ambassadorUpdate(input: $input) {
      id
      payoutRate
    }
  }
`
