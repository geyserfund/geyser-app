import { gql } from '@apollo/client'

import {
  ContributionPaymentsInput,
  FundingContributionFragment,
  FundingContributionFragmentDoc,
  FundingContributionPaymentDetailsFragment,
  FundingContributionPaymentDetailsFragmentDoc,
  ProjectFundingStrategy,
} from '@/types/generated/graphql'

export const recurringIntervals = {
  monthly: 'MONTHLY',
  yearly: 'YEARLY',
} as const

export type RecurringInterval = (typeof recurringIntervals)[keyof typeof recurringIntervals]

export const recurringFundingModes = {
  oneTime: 'ONE_TIME',
  recurringDonation: 'RECURRING_DONATION',
  membership: 'MEMBERSHIP',
} as const

export type RecurringFundingMode = (typeof recurringFundingModes)[keyof typeof recurringFundingModes]

export const recurringPaymentMethods = {
  stripe: 'STRIPE',
  banxa: 'BANXA',
  bitcoin: 'BITCOIN',
} as const

export type RecurringPaymentMethod = (typeof recurringPaymentMethods)[keyof typeof recurringPaymentMethods]

export type RecurringContributionKind = 'DONATION' | 'SUBSCRIPTION'
export type RecurringContributionStatus = 'PENDING' | 'ACTIVE' | 'PAUSED' | 'CANCELED'
export type RecurringContributionCurrency = 'USDCENT' | 'BTCSAT'

export type ProjectSubscriptionPlan = {
  __typename?: 'ProjectSubscriptionPlan'
  id: string
  projectId: string
  name: string
  description?: string | null
  image?: string | null
  interval: RecurringInterval
  amountUsdCent: number
  amountBtcSat: number
  isHidden?: boolean | null
}

export type RecurringContributionSupport = {
  __typename?: 'RecurringContributionSupport'
  enabled: boolean
  stripe: boolean
  bitcoin: boolean
  reason?: string | null
}

export type RecurringContribution = {
  __typename?: 'RecurringContribution'
  id: string
  projectId: string
  userId?: string | null
  managementNonce?: string | null
  uuid: string
  kind: RecurringContributionKind
  status: RecurringContributionStatus
  paymentMethod: RecurringPaymentMethod
  amount: number
  currency: RecurringContributionCurrency
  interval: RecurringInterval
  nextBillingAt?: string | null
  currentPeriodEndAt?: string | null
  pausedAt?: string | null
  canceledAt?: string | null
  lastChargeFailureMessage?: string | null
  project?: {
    __typename?: 'Project'
    id: string
    name: string
    title: string
    thumbnailImage?: string | null
  } | null
  projectSubscriptionPlan?: ProjectSubscriptionPlan | null
}

export type RecurringContributionCheckoutPayload = {
  recurringContribution: RecurringContribution
  contribution: FundingContributionFragment
  payments: FundingContributionPaymentDetailsFragment
}

export type ProjectRecurringContextQuery = {
  projectGet?: {
    __typename?: 'Project'
    id: string
    fundingStrategy: ProjectFundingStrategy
    paymentMethods: {
      __typename?: 'PaymentMethods'
      fiat: {
        __typename?: 'FiatPaymentMethods'
        enabled: boolean
        stripe: boolean
      }
    }
    subscriptionPlans: ProjectSubscriptionPlan[]
    recurringContributionSupport?: RecurringContributionSupport | null
  } | null
}

export type ProjectRecurringContextQueryVariables = {
  where: {
    id?: string | number
    name?: string
  }
}

export type RecurringContributionsQuery = {
  me?: {
    __typename?: 'User'
    recurringContributions: RecurringContribution[]
  } | null
}

export type RecurringContributionRenewalContextQuery = {
  recurringContributionRenewalContext: RecurringContribution
}

export type RecurringContributionRenewalContextQueryVariables = {
  managementNonce: string
}

export type RecurringDonationCreateMutationVariables = {
  input: {
    projectId: number
    paymentMethod: RecurringPaymentMethod
    interval: RecurringInterval
    amount: number
    geyserTipPercentage?: number
    anonymous: boolean
    paymentsInput: ContributionPaymentsInput
    metadataInput?: {
      email?: string
      media?: string
      comment?: string
      privateComment?: string
      followProject?: boolean
      subscribeToGeyserEmails?: boolean
    }
  }
}

export type RecurringDonationCreateMutation = {
  recurringDonationCreate: RecurringContributionCheckoutPayload
}

export type ProjectSubscriptionStartMutationVariables = {
  input: {
    projectSubscriptionPlanId: number
    paymentMethod: RecurringPaymentMethod
    anonymous: boolean
    paymentsInput: ContributionPaymentsInput
    metadataInput?: {
      email?: string
      media?: string
      comment?: string
      privateComment?: string
      followProject?: boolean
      subscribeToGeyserEmails?: boolean
    }
  }
}

export type ProjectSubscriptionStartMutation = {
  projectSubscriptionStart: RecurringContributionCheckoutPayload
}

export type RecurringContributionRenewalCreateMutationVariables = {
  input: {
    id?: number
    managementNonce?: string
    anonymous: boolean
    paymentsInput: ContributionPaymentsInput
  }
}

export type RecurringContributionRenewalCreateMutation = {
  recurringContributionRenewalCreate: RecurringContributionCheckoutPayload
}

export type RecurringContributionCancelMutationVariables = {
  input: {
    id: string
  }
}

export type RecurringContributionCancelMutation = {
  recurringContributionCancel: RecurringContribution
}

export type RecurringContributionPortalSessionCreateMutationVariables = {
  input: {
    id: string
    returnUrl: string
  }
}

export type RecurringContributionPortalSessionCreateMutation = {
  recurringContributionPortalSessionCreate: {
    __typename?: 'RecurringContributionPortalSession'
    url: string
  }
}

export type CreateProjectSubscriptionPlanMutationVariables = {
  input: {
    projectId: number
    name: string
    description?: string
    image?: string
    interval: RecurringInterval
    amountUsdCent: number
    amountBtcSat: number
    isHidden?: boolean
  }
}

export type UpdateProjectSubscriptionPlanMutationVariables = {
  input: {
    id: number
    name?: string
    description?: string
    image?: string
    interval?: RecurringInterval
    amountUsdCent?: number
    amountBtcSat?: number
    isHidden?: boolean
  }
}

export type DeleteProjectSubscriptionPlanMutationVariables = {
  id: number
}

export type CreateProjectSubscriptionPlanMutation = {
  projectSubscriptionPlanCreate: ProjectSubscriptionPlan
}

export type UpdateProjectSubscriptionPlanMutation = {
  projectSubscriptionPlanUpdate: ProjectSubscriptionPlan
}

export type DeleteProjectSubscriptionPlanMutation = {
  projectSubscriptionPlanDelete: boolean
}

export const QUERY_PROJECT_RECURRING_CONTEXT = gql`
  query ProjectRecurringContext($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      id
      fundingStrategy
      paymentMethods {
        fiat {
          enabled
          stripe
        }
      }
      recurringContributionSupport {
        enabled
        stripe
        bitcoin
        reason
      }
      subscriptionPlans {
        id
        projectId
        name
        description
        image
        interval
        amountUsdCent
        amountBtcSat
        isHidden
      }
    }
  }
`

export const QUERY_RECURRING_CONTRIBUTIONS = gql`
  query RecurringContributions {
    me {
      recurringContributions {
        id
        uuid
        managementNonce
        kind
        status
        paymentMethod
        amount
        currency
        interval
        nextBillingAt
        currentPeriodEndAt
        pausedAt
        canceledAt
        lastChargeFailureMessage
        project {
          id
          name
          title
          thumbnailImage
        }
        projectSubscriptionPlan {
          id
          projectId
          name
          description
          image
          interval
          amountUsdCent
          amountBtcSat
          isHidden
        }
      }
    }
  }
`

export const QUERY_RECURRING_CONTRIBUTION_RENEWAL_CONTEXT = gql`
  query RecurringContributionRenewalContext($managementNonce: String!) {
    recurringContributionRenewalContext(managementNonce: $managementNonce) {
      id
      projectId
      userId
      uuid
      kind
      status
      paymentMethod
      amount
      currency
      interval
      nextBillingAt
      currentPeriodEndAt
      pausedAt
      canceledAt
      lastChargeFailureMessage
      project {
        id
        name
        title
        thumbnailImage
      }
      projectSubscriptionPlan {
        id
        projectId
        name
        description
        image
        interval
        amountUsdCent
        amountBtcSat
        isHidden
      }
    }
  }
`

export const MUTATION_RECURRING_DONATION_CREATE = gql`
  ${FundingContributionFragmentDoc}
  ${FundingContributionPaymentDetailsFragmentDoc}
  mutation RecurringDonationCreate($input: RecurringDonationCreateInput!) {
    recurringDonationCreate(input: $input) {
      recurringContribution {
        id
        uuid
        kind
        status
        paymentMethod
        amount
        currency
        interval
        nextBillingAt
        currentPeriodEndAt
        pausedAt
        canceledAt
        lastChargeFailureMessage
      }
      contribution {
        ...FundingContribution
      }
      payments {
        ...FundingContributionPaymentDetails
      }
    }
  }
`

export const MUTATION_PROJECT_SUBSCRIPTION_START = gql`
  ${FundingContributionFragmentDoc}
  ${FundingContributionPaymentDetailsFragmentDoc}
  mutation ProjectSubscriptionStart($input: ProjectSubscriptionStartInput!) {
    projectSubscriptionStart(input: $input) {
      recurringContribution {
        id
        uuid
        kind
        status
        paymentMethod
        amount
        currency
        interval
        nextBillingAt
        currentPeriodEndAt
        pausedAt
        canceledAt
        lastChargeFailureMessage
      }
      contribution {
        ...FundingContribution
      }
      payments {
        ...FundingContributionPaymentDetails
      }
    }
  }
`

export const MUTATION_RECURRING_CONTRIBUTION_RENEWAL_CREATE = gql`
  ${FundingContributionFragmentDoc}
  ${FundingContributionPaymentDetailsFragmentDoc}
  mutation RecurringContributionRenewalCreate($input: RecurringContributionRenewalCreateInput!) {
    recurringContributionRenewalCreate(input: $input) {
      recurringContribution {
        id
        projectId
        userId
        uuid
        kind
        status
        paymentMethod
        amount
        currency
        interval
        nextBillingAt
        currentPeriodEndAt
        pausedAt
        canceledAt
        lastChargeFailureMessage
      }
      contribution {
        ...FundingContribution
      }
      payments {
        ...FundingContributionPaymentDetails
      }
    }
  }
`

export const MUTATION_RECURRING_CONTRIBUTION_CANCEL = gql`
  mutation RecurringContributionCancel($input: RecurringContributionCancelInput!) {
    recurringContributionCancel(input: $input) {
      id
      uuid
      status
      canceledAt
    }
  }
`

export const MUTATION_RECURRING_CONTRIBUTION_PORTAL_SESSION_CREATE = gql`
  mutation RecurringContributionPortalSessionCreate($input: RecurringContributionPortalSessionCreateInput!) {
    recurringContributionPortalSessionCreate(input: $input) {
      url
    }
  }
`

export const MUTATION_PROJECT_SUBSCRIPTION_PLAN_CREATE = gql`
  mutation ProjectSubscriptionPlanCreate($input: CreateProjectSubscriptionPlanInput!) {
    projectSubscriptionPlanCreate(input: $input) {
      id
      projectId
      name
      description
      image
      interval
      amountUsdCent
      amountBtcSat
      isHidden
    }
  }
`

export const MUTATION_PROJECT_SUBSCRIPTION_PLAN_UPDATE = gql`
  mutation ProjectSubscriptionPlanUpdate($input: UpdateProjectSubscriptionPlanInput!) {
    projectSubscriptionPlanUpdate(input: $input) {
      id
      projectId
      name
      description
      image
      interval
      amountUsdCent
      amountBtcSat
      isHidden
    }
  }
`

export const MUTATION_PROJECT_SUBSCRIPTION_PLAN_DELETE = gql`
  mutation ProjectSubscriptionPlanDelete($id: BigInt!) {
    projectSubscriptionPlanDelete(id: $id)
  }
`
