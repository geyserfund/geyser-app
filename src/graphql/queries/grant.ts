import { gql } from '@apollo/client'

export const QUERY_GRANTS = gql`
  query Grants {
    grants {
      id
      title
      name
      shortDescription
      description
      status
      statuses {
        status
        startAt
      }
      sponsors {
        id
        name
        url
        image
        status
        createdAt
      }
    }
  }
`

export const QUERY_GRANT = gql`
  query Grant($input: GrantGetInput!) {
    grant(input: $input) {
      id
      title
      name
      shortDescription
      description
      balance
      status
      statuses {
        status
        startAt
      }
      applicants {
        project {
          id
          name
          title
          thumbnailImage
          shortDescription
          description
        }
        status
        funding {
          communityFunding
          grantAmount
          grantAmountDistributed
        }
      }
      sponsors {
        id
        name
        url
        image
        status
        createdAt
      }
    }
  }
`
