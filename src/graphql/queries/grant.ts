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
      image
      balance
      statuses {
        status
        endAt
        startAt
      }
      applicants {
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
      image
      statuses {
        status
        endAt
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
          funders {
            id
            user {
              id
              username
              imageUrl
            }
          }
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

export const QUERY_GRANT_STATISTICS = gql`
  query Query {
    grantStatistics {
      grants {
        amountFunded
        amountGranted
        count
      }
      applicants {
        countFunded
      }
    }
  }
`
