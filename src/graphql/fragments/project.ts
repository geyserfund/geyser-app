import { gql } from '@apollo/client'

import { FRAGMENT_ENTRY_FOR_PROJECT } from './entries'
import { FRAGMENT_PROJECT_OWNER_USER, FRAGMENT_USER_FOR_AVATAR, FRAGMENT_USER_ME } from './user'
import { FRAGMENT_PROJECT_WALLET } from './wallet'

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

export const FRAGMENT_PROJECT_FOR_LANDING_PAGE = gql`
  fragment ProjectForLandingPage on Project {
    id
    name
    balance
    fundersCount
    thumbnailImage
    shortDescription
    title
    owners {
      id
      user {
        id
        username
        imageUrl
      }
    }
  }
`

export const FRAGMENT_PROJECT_FOR_PROFILE_PAGE = gql`
  fragment ProjectForProfilePage on Project {
    id
    name
    balance
    fundersCount
    thumbnailImage
    title
    shortDescription
    createdAt
    status
    wallets {
      id
      name
      state {
        status
        statusCode
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
  ${FRAGMENT_PROJECT_REWARD_FOR_CREATE_UPDATE}
  ${FRAGMENT_ENTRY_FOR_PROJECT}
  ${FRAGMENT_PROJECT_OWNER_USER}
  ${FRAGMENT_USER_FOR_AVATAR}
  ${FRAGMENT_PROJECT_WALLET}
  ${FRAGMENT_PROJECT_GRANT_APPLICATIONS}
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
    location {
      country {
        name
        code
      }
      region
    }
    tags {
      id
      label
    }
    owners {
      id
      user {
        ...ProjectOwnerUser
      }
    }
    rewards {
      ...ProjectRewardForCreateUpdate
    }
    ambassadors {
      id
      confirmed
      user {
        ...UserForAvatar
      }
    }
    sponsors {
      id
      url
      image
      user {
        ...UserForAvatar
      }
    }

    entries(input: $input) {
      ...EntryForProject
    }
    wallets {
      ...ProjectWallet
    }
    followers {
      id
      username
    }
    keys {
      nostrKeys {
        publicKey {
          npub
        }
      }
    }
    ...ProjectGrantApplications
  }
`

export const FRAGMENT_PROJECT_FOR_SUBSCRIPTION = gql`
  ${FRAGMENT_USER_ME}
  fragment ProjectForSubscription on Project {
    id
    title
    name
    thumbnailImage
    owners {
      id
      user {
        ...UserMe
      }
    }
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
