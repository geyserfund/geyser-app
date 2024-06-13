import { gql } from '@apollo/client'

export const FRAGMENT_BOARD_VOTE_GRANTS = gql`
  fragment BoardVoteGrantsFragment on BoardVoteGrant {
    id
    title
    name
    shortDescription
    description
    balance
    status
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
`

export const FRAGMENT_COMMUNITY_VOTE_GRANTS = gql`
  fragment CommunityVoteGrantsFragment on CommunityVoteGrant {
    id
    title
    name
    shortDescription
    description
    balance
    status
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
    votes {
      voteCount
      voterCount
    }
    votingSystem
    distributionSystem
  }
`

export const FRAGMENT_BOARD_VOTE_GRANT = gql`
  fragment BoardVoteGrantFragment on BoardVoteGrant {
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
    applicants {
      contributorsCount
      contributors(input: { pagination: { take: 50 } }) {
        user {
          id
          imageUrl
        }
        amount
        timesContributed
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
  }
`
export const FRAGMENT_COMMUNITY_VOTE_GRANT = gql`
  fragment CommunityVoteGrantFragment on CommunityVoteGrant {
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
    applicants {
      contributorsCount
      contributors {
        user {
          id
          imageUrl
          username
        }
        amount
        timesContributed
        voteCount
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
    votes {
      voteCount
      voterCount
    }
    votingSystem
    distributionSystem
  }
`
