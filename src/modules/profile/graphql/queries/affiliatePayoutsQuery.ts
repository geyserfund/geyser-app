import { gql } from '@apollo/client'

export type AffiliatePayoutStatusValue = 'PENDING' | 'PAID'
export type AffiliatePartnerPayoutSourceValue = 'CONTRIBUTION_REFERRAL' | 'PROJECT_REFERRAL'

export type UserAffiliatePayoutsQueryVariables = {
  where: {
    id: number
  }
}

export type UserAffiliatePayoutsQueryResult = {
  user: {
    id: string
    heroId: string
    accountKeys?: {
      id: string
      encryptedMnemonic?: string | null
      rskKeyPair: {
        address: string
        publicKey: string
        derivationPath: string
      }
    } | null
    affiliatePartnerTerms: {
      contributionReferralPayoutRate: number
      projectReferralPayoutRate: number
      projectReferralPayoutCapSats: number
    }
    affiliatePartnerPayoutSummary: {
      totalEarned: number
      totalPending: number
    }
    affiliatePartnerPayouts: Array<{
      id: string
      uuid: string
      amount: number
      status: AffiliatePayoutStatusValue
      source: AffiliatePartnerPayoutSourceValue
      createdAt: string
      paidAt?: string | null
      project?: {
        id: string
        name: string
        title: string
      } | null
    }>
  } | null
}

export const QUERY_USER_AFFILIATE_PAYOUTS = gql`
  query UserAffiliatePayouts($where: UserGetInput!) {
    user(where: $where) {
      id
      heroId
      accountKeys {
        id
        encryptedMnemonic
        rskKeyPair {
          address
          publicKey
          derivationPath
        }
      }
      affiliatePartnerTerms {
        contributionReferralPayoutRate
        projectReferralPayoutRate
        projectReferralPayoutCapSats
      }
      affiliatePartnerPayoutSummary {
        totalEarned
        totalPending
      }
      affiliatePartnerPayouts {
        id
        uuid
        amount
        status
        source
        createdAt
        paidAt
        project {
          id
          name
          title
        }
      }
    }
  }
`
