import { gql } from '@apollo/client'

import { FRAGMENT_ENTRY_FOR_PROJECT } from './entries'

export const FRAGMENT_PROJECT_FOR_LANDING_PAGE = gql`
  fragment ProjectForLandingPage on Project {
    id
    name
    balance
    createdAt
    fundersCount
    fundingTxsCount
    thumbnailImage
    shortDescription
    tags {
      id
      label
    }
    title
    status
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

export const FRAGMENT_PROJECT_REWARD_FOR_LANDING_PAGE = gql`
  fragment ProjectRewardForLandingPage on ProjectReward {
    cost
    description
    id
    image
    rewardName: name
    sold
    stock
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
  }
`

export const FRAGMENT_PROJECT = gql`
  ${FRAGMENT_PROJECT_REWARD_FOR_CREATE_UPDATE}
  ${FRAGMENT_ENTRY_FOR_PROJECT}
  fragment Project on Project {
    id
    title
    name
    type
    shortDescription
    description
    balance
    fundingGoal
    createdAt
    updatedAt
    expiresAt
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
        id
        username
        imageUrl
      }
    }
    rewards {
      ...ProjectRewardForCreateUpdate
    }
    ambassadors {
      id
      confirmed
      user {
        id
        username
        imageUrl
      }
    }
    sponsors {
      id
      url
      image
      user {
        id
        username
        imageUrl
      }
    }
    funders {
      id
      user {
        id
        username
        imageUrl
        email
      }
      amountFunded
      confirmed
      confirmedAt
      timesFunded
    }
    milestones {
      id
      name
      description
      amount
    }
    entries(input: $input) {
      ...EntryForProject
    }
    wallets {
      id
      name
      state {
        status
        statusCode
      }
      connectionDetails {
        ... on LightningAddressConnectionDetails {
          lightningAddress
        }
        ... on LndConnectionDetailsPrivate {
          macaroon
          tlsCertificate
          hostname
          grpcPort
          lndNodeType
          pubkey
        }
        ... on LndConnectionDetailsPublic {
          pubkey
        }
      }
    }
  }
`
