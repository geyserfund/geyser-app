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
      type
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
      type
      statuses {
        status
        endAt
        startAt
      }
      boardMembers {
        user {
          username
          imageUrl
          id
          externalAccounts {
            accountType
            externalId
            externalUsername
            id
            public
          }
        }
      }
      applicants {
        contributorsCount
        contributors(input: { pagination: { take: 50 } }) {
          user {
            id
            imageUrl
          }
        }
        project {
          id
          name
          title
          thumbnailImage
          shortDescription
          description
          wallets {
            id
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
  query GrantStatistics {
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

export const QUERY_GRANT_GET = gql`
  query GrantGet($input: GrantGetInput!) {
    grant(input: $input) {
      applicants {
        project {
          name
          id
        }
      }
    }
  }
`
