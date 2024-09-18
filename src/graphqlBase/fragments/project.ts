import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_FOR_COMMUNITY_VOTE_GRANT = gql`
  fragment ProjectCommunityVoteGrant on CommunityVoteGrant {
    id
    status
    title
  }
`

export const FRAGMENT_PROJECT_GRANT_APPLICATIONS = gql`
  ${FRAGMENT_PROJECT_FOR_COMMUNITY_VOTE_GRANT}
  fragment ProjectGrantApplications on Project {
    grantApplications {
      id
      status
      grant {
        ...ProjectCommunityVoteGrant
      }
    }
  }
`

export const FRAGMENT_PROJECT_NOSTR_KEYS = gql`
  fragment ProjectNostrKeys on Project {
    id
    name
    keys {
      nostrKeys {
        privateKey {
          nsec
        }
        publicKey {
          npub
        }
      }
    }
  }
`

export const FRAGMENT_PROJECT_REWARD_FOR_LANDING_PAGE = gql`
  fragment ProjectRewardForLandingPage on ProjectReward {
    cost
    description
    id
    image
    rewardName: name
    sold
    stock
    maxClaimable
    rewardProject: project {
      id
      name
      title
      rewardCurrency
      owners {
        id
        user {
          id
          username
          imageUrl
        }
      }
    }
  }
`

export const FRAGMENT_PROJECT_REWARD_FOR_CREATE_UPDATE = gql`
  fragment ProjectRewardForCreateUpdate on ProjectReward {
    id
    name
    description
    cost
    image
    deleted
    stock
    sold
    hasShipping
    maxClaimable
    isAddon
    isHidden
    category
    preOrder
    estimatedAvailabilityDate
    estimatedDeliveryInWeeks
  }
`

export const FRAGMENT_PROJECT = gql`
  fragment Project on Project {
    id
    title
    name
    type
    shortDescription
    description
    defaultGoalId
    balance
    balanceUsdCent
    createdAt
    updatedAt
    image
    thumbnailImage
    links
    status
    rewardCurrency
    fundersCount
    fundingTxsCount
  }
`

export const FRAGMENT_PROJECT_AVATAR = gql`
  fragment ProjectAvatar on Project {
    id
    name
    thumbnailImage
    title
  }
`

export const FRAGMENT_PROJECT_FOR_OWNER = gql`
  fragment ProjectForOwner on Project {
    id
    name
    image
    thumbnailImage
    title
    status
    createdAt
  }
`
