import { atom } from 'jotai'

import { SATOSHIS_IN_BTC } from '@/shared/constants'
import { usdRateAtom } from '@/shared/state/btcRateAtom'
import {
  ProjectPageWalletFragment,
  ProjectRewardFragment,
  ProjectSubscriptionPlansFragment,
  RewardCurrency,
  ShippingDestination,
  SubscriptionCurrencyType,
  UserSubscriptionInterval,
} from '@/types'
import { centsToDollars, commaFormatted, dollarsToCents, isProjectAnException, toInt, validateEmail } from '@/utils'

import { projectAtom, ProjectState } from '../../state/projectAtom'
import { rewardsAtom } from '../../state/rewardsAtom'
import { subscriptionsAtom } from '../../state/subscriptionAtom'
import { walletAtom } from '../../state/walletAtom'
import { fundingInputAfterRequestAtom } from './fundingContributionCreateInputAtom.ts'
import { fundingPaymentDetailsAtom } from './fundingPaymentAtom.ts'

export type FundingProject = Pick<
  ProjectState,
  'id' | 'name' | 'rewardCurrency' | 'title' | 'owners' | 'paymentMethods'
>

export enum FundingUserInfoError {
  EMAIL = 'email',
  PRIVATE_COMMENT = 'privateComment',
}

export type FundingProjectState = FundingProject & {
  wallet?: ProjectPageWalletFragment
  rewards: ProjectRewardFragment[]
  subscriptions?: ProjectSubscriptionPlansFragment[]
}

export type FundFormType = {
  donationAmount: number
  donationAmountUsdCent: number
  rewardsCost: number
  rewardsCostInSatoshi: number
  rewardsCostInUsdCent: number
  shippingCost: number
  totalAmount: number
  totalAmountUsdCent: number
  email: string
  media: string
  comment: string
  privateComment?: string
  rewardsByIDAndCount?: { [key: string]: number } | undefined
  rewardCurrency: RewardCurrency
  needsShipping: boolean
  shippingDestination: ShippingDestination
  followProject: boolean
  subscribeToGeyserEmails: boolean
  subscription: {
    cost: number
    subscriptionId?: number
    currency?: SubscriptionCurrencyType
    interval: UserSubscriptionInterval
    name?: string
  }
}

const initialState: FundFormType = {
  donationAmount: 0,
  donationAmountUsdCent: 0,
  rewardsCost: 0,
  rewardsCostInSatoshi: 0,
  rewardsCostInUsdCent: 0,
  shippingCost: 0,
  totalAmount: 0,
  totalAmountUsdCent: 0,
  comment: '',
  privateComment: '',
  email: '',
  media: '',
  followProject: true,
  subscribeToGeyserEmails: false,
  rewardsByIDAndCount: undefined,
  subscription: {
    cost: 0,
    subscriptionId: undefined,
    currency: SubscriptionCurrencyType.Usdcent,
    interval: UserSubscriptionInterval.Monthly,
    name: '',
  },
  rewardCurrency: RewardCurrency.Usdcent,
  needsShipping: false,
  shippingDestination: ShippingDestination.National,
}

/** Main Funding Form state atom */
export const fundingFormStateAtom = atom<FundFormType>(initialState)

/** Funding Form Error */
export const fundingFormErrorAtom = atom<{ [key in keyof FundFormType]: string }>(
  {} as { [key in keyof FundFormType]: string },
)

/** Funding Form Warning */
export const fundingFormWarningAtom = atom<{ [key in keyof FundFormType]: string }>(
  {} as { [key in keyof FundFormType]: string },
)

/** Set the error state for the funding form */
export const setErrorStateAtom = atom(null, (_, set, { key, value }: { key: keyof FundFormType; value: string }) => {
  set(fundingFormErrorAtom, (current) => ({ ...current, [key]: value }))
})

/** Set the warning state for the funding form */
export const setWarningStateAtom = atom(
  null,
  (get, set, { key, value }: { key: keyof FundFormType; value: string }) => {
    set(fundingFormWarningAtom, (current) => ({ ...current, [key]: value }))
  },
)

/** Project that is to be funded via the current funding form */
export const fundingProjectAtom = atom<FundingProjectState>((get) => {
  const project = get(projectAtom)
  const wallet = get(walletAtom)
  const rewards = get(rewardsAtom)
  const subscriptions = get(subscriptionsAtom)
  return { ...project, wallet, rewards, subscriptions }
})

/**
 * Set funding form based on a HTML input event
 * @param {Object} event - The event object to set
 */
export const setFundFormTargetAtom = atom(null, (get, set, event: any) => {
  const { name, value } = event.target
  set(fundingFormStateAtom, (current) => ({ ...current, [name]: value }))
})

/**
 * Set funding form based on a name and value
 * @param {Object} [name, value] - The name and value to set
 * @param {string} name - The name of the field to set
 * @param {any} value - The value to set the field to
 */
export const setFundFormStateAtom = atom(null, (get, set, name: string, value: any) => {
  if (name === 'donationAmount') {
    set(fundingFormStateAtom, (current) => ({
      ...current,
      donationAmount: value,
      totalAmount: value + current.rewardsCostInSatoshi + current.shippingCost,
    }))
    return
  }

  if (name === 'donationAmountUsdCent') {
    set(fundingFormStateAtom, (current) => ({
      ...current,
      donationAmountUsdCent: value,
      totalAmountUsdCent: value + current.rewardsCostInUsdCent + current.shippingCost,
    }))
    return
  }

  set(fundingFormStateAtom, (current) => ({
    ...current,
    [name]: value,
  }))
})

/* Boolean to check if the funding form has rewards */
export const fundingFormHasRewardsAtom = atom((get) => {
  const fundingFormState = get(fundingFormStateAtom)
  return fundingFormState.rewardsByIDAndCount && Object.keys(fundingFormState.rewardsByIDAndCount).length > 0
})

/** Boolean to check if the funding form has a subscription */
export const fundingFormHasSubscriptionAtom = atom((get) => {
  const fundingFormState = get(fundingFormStateAtom)
  return fundingFormState.subscription && fundingFormState.subscription.cost > 0
})

/* Boolean to check if the funding form has rewards that require a private comment */
export const fundingFormHasRewardsThatRequirePrivateCommentAtom = atom((get) => {
  const fundingFormState = get(fundingFormStateAtom)
  const { rewards } = get(fundingProjectAtom)
  const selectedRewards =
    rewards?.filter(
      (reward) => fundingFormState.rewardsByIDAndCount && fundingFormState.rewardsByIDAndCount[reward.id],
    ) || []

  return selectedRewards.some((reward) => reward.privateCommentPrompts && reward.privateCommentPrompts.length > 0)
})

/** Reset funding form rewards to it's initial value */
export const resetFundingFormRewardsAtom = atom(null, (get, set) => {
  set(fundingFormStateAtom, (current) => ({
    ...current,
    rewardsByIDAndCount: {},
    rewardsCost: 0,
    subscriptionId: undefined,
    subscriptionCost: 0,
    totalAmount: current.donationAmount,
    needsShipping: false,
  }))
})

/** Update rewards in the funding flow */
export const updateFundingFormRewardAtom = atom(null, (get, set, { id, count }: { id: number; count: number }) => {
  const { rewards } = get(fundingProjectAtom)
  const project = get(fundingProjectAtom)
  const usdRate = get(usdRateAtom)

  set(fundingFormStateAtom, (current) => {
    const newRewardsCountInfo = { ...current.rewardsByIDAndCount }

    if (count !== 0) {
      newRewardsCountInfo[id.toString()] = count
    } else if (count === 0) {
      delete newRewardsCountInfo[id.toString()]
    }

    let rewardsCost = 0
    let rewardsCostInSatoshi = 0
    let needsShipping = false
    let rewardsCostInUsdCent = 0

    if (rewards) {
      Object.keys(newRewardsCountInfo).forEach((rewardID: string) => {
        const id = parseInt(rewardID, 10)

        const reward = rewards.find((reward) => reward.id === id || `${reward.id}` === rewardID)

        if (reward && reward.id) {
          if (reward.hasShipping) {
            needsShipping = true
          }

          const rewardMultiplier = newRewardsCountInfo[rewardID.toString()]
          if (!rewardMultiplier) {
            return 0
          }

          const { cost } = reward

          rewardsCost += cost * rewardMultiplier

          if (project.rewardCurrency === RewardCurrency.Btcsat) {
            rewardsCostInSatoshi += rewardsCost
            rewardsCostInUsdCent += Math.round(dollarsToCents((rewardsCost / SATOSHIS_IN_BTC) * usdRate))
          } else {
            rewardsCostInUsdCent = rewardsCost
            rewardsCostInSatoshi += Math.round((centsToDollars(rewardsCost) / usdRate) * SATOSHIS_IN_BTC)
          }
        }
      })
    }

    return {
      ...current,
      rewardsByIDAndCount: newRewardsCountInfo,
      rewardsCost,
      needsShipping,
      rewardsCostInSatoshi,
      rewardsCostInUsdCent,
      totalAmount: rewardsCostInSatoshi + current.donationAmount + current.shippingCost,
      totalAmountUsdCent: rewardsCostInUsdCent + current.donationAmountUsdCent + current.shippingCost,
    }
  })
})

/** Update subscription in the funding flow */
export const updateFundingFormSubscriptionAtom = atom(null, (get, set, { id }: { id: number }) => {
  const { subscriptions } = get(fundingProjectAtom)
  const usdRate = get(usdRateAtom)

  set(fundingFormStateAtom, (current) => {
    let subscriptionCost = 0
    let subscriptionCostInSatoshi = 0
    let subscriptionCostInUsdCent = 0

    if (subscriptions) {
      const subscription = subscriptions.find((subscription) => toInt(subscription.id) === id)

      if (subscription && subscription.id) {
        const { cost } = subscription

        subscriptionCost = cost

        if (subscription.currency === SubscriptionCurrencyType.Usdcent) {
          subscriptionCostInSatoshi = Math.round((centsToDollars(cost) / usdRate) * SATOSHIS_IN_BTC)
          subscriptionCostInUsdCent = cost
        } else {
          subscriptionCostInSatoshi = cost
          subscriptionCostInUsdCent = Math.round(dollarsToCents((cost / SATOSHIS_IN_BTC) * usdRate))
        }
      }

      return {
        ...current,
        subscription: {
          cost: subscriptionCost,
          subscriptionId: id,
          interval: subscription?.interval || UserSubscriptionInterval.Monthly,
          name: subscription?.name,
          currency: subscription?.currency,
        },
        totalAmount: subscriptionCostInSatoshi + current.donationAmount,
        totalAmountUsdCent: subscriptionCostInUsdCent + current.donationAmountUsdCent,
      }
    }

    return current
  })
})

/** Check if the  funding Amount is enough for onChain payments */
export const fundingOnchainAmountWarningAtom = atom((get) => {
  const formState = get(fundingFormStateAtom)
  const fundingProjectState = get(fundingProjectAtom)
  const fundingPaymentDetails = get(fundingPaymentDetailsAtom)

  const { totalAmount } = formState
  const walletLimits = fundingProjectState.wallet?.limits?.contribution

  if (totalAmount && walletLimits) {
    const { onChain } = walletLimits

    if (!totalAmount) {
      return ''
    }

    if (onChain?.max && totalAmount > onChain.max) {
      return `The amount you are trying to send is too high for on-chain payments. Only payments below ${commaFormatted(
        onChain.max,
      )} sats can be sent on-chain.`
    }

    if (onChain?.min && totalAmount < onChain.min) {
      return `The amount you are trying to send is too low for on-chain payments. Only payments over ${commaFormatted(
        onChain.min,
      )} sats can be sent on-chain.`
    }
  }

  if (!fundingPaymentDetails.onChainSwap?.address) {
    return `Something went wrong with the onChain payment, please try using Lightning or try again`
  }

  return ''
})

const BANXA_MAX_AMOUNT_CENT = 1500000 // 15,000 USD in cents
const BANXA_MIN_AMOUNT_CENT = 2100 //   20 USD in cents

/** Check if the  funding Amount is enough for fiat swap payments */
export const fundingFiatSwapAmountWarningAtom = atom((get) => {
  const formState = get(fundingFormStateAtom)

  const { totalAmountUsdCent } = formState

  if (totalAmountUsdCent) {
    if (!totalAmountUsdCent) {
      return ''
    }

    if (totalAmountUsdCent > BANXA_MAX_AMOUNT_CENT) {
      return `The amount you are trying to send is too high for fiat payments. Only payments below $${commaFormatted(
        15000,
      )} can be sent via fiat.`
    }

    if (totalAmountUsdCent < BANXA_MIN_AMOUNT_CENT) {
      return `The amount you are trying to send is too low for fiat payments. Only payments over $${commaFormatted(
        21,
      )} can be sent via fiat.`
    }
  }

  return ''
})

/** Check if the input amount is valid for the funidng flow */
export const isFundingInputAmountValidAtom = atom((get) => {
  const formState = get(fundingFormStateAtom)
  const fundingProjectState = get(fundingProjectAtom)

  const { totalAmount } = formState
  const walletLimits = fundingProjectState.wallet?.limits?.contribution

  const isException = isProjectAnException(fundingProjectState.name)

  if (totalAmount === 0) {
    return {
      title: `The payment minimum is 1 satoshi.`,
      description: 'Please update the amount.',
      valid: false,
    }
  }

  if (!isException && walletLimits?.max && totalAmount >= walletLimits.max) {
    return {
      title: `Amount above the project wallet limit: ${commaFormatted(walletLimits.max)} sats.`,
      description: 'Please update the amount, or contact us for donating a higher amount.',
      valid: false,
    }
  }

  if (walletLimits?.min && totalAmount < walletLimits.min) {
    return {
      title: `The payment minimum is ${walletLimits.min} satoshi.`,
      description: 'Please update the amount.',
      valid: false,
    }
  }

  return { title: '', description: '', valid: true }
})

/** Check if the funding user info is valid */
export const isFundingUserInfoValidAtom = atom((get) => {
  const formState = get(fundingFormStateAtom)

  const hasSelectedRewards = get(fundingFormHasRewardsAtom)

  const hasSubscription = get(fundingFormHasSubscriptionAtom)

  const hasRewardsThatRequirePrivateComment = get(fundingFormHasRewardsThatRequirePrivateCommentAtom)

  if (hasSelectedRewards && !formState.email) {
    return {
      title: 'Email is required when purchasing a reward.',
      description: 'Please enter an email.',
      error: FundingUserInfoError.EMAIL,
      valid: false,
    }
  }

  if (hasSubscription && !formState.email) {
    return {
      title: 'Email is required when subscribing to a project.',
      description: 'Please enter an email.',
      error: FundingUserInfoError.EMAIL,
      valid: false,
    }
  }

  if ((formState.followProject || formState.subscribeToGeyserEmails) && !formState.email) {
    return {
      title: 'Email is required when subscribing to updates.',
      description: 'Please enter an email.',
      error: FundingUserInfoError.EMAIL,
      valid: false,
    }
  }

  if (hasSelectedRewards && !validateEmail(formState.email)) {
    return {
      title: 'A valid email is required.',
      description: 'Please enter a valid email.',
      error: FundingUserInfoError.EMAIL,
      valid: false,
    }
  }

  if (hasRewardsThatRequirePrivateComment && !formState.privateComment) {
    return {
      title: 'Private message is required.',
      description: 'Please enter a private message.',
      error: FundingUserInfoError.PRIVATE_COMMENT,
      valid: false,
    }
  }

  return { title: '', description: '', error: '', valid: true }
})

/** Reset Funding Form */
export const resetFundingFormAtom = atom(null, (_, set) => {
  set(fundingFormStateAtom, initialState)
  set(fundingInputAfterRequestAtom, null)
  set(fundingFormErrorAtom, {} as { [key in keyof FundFormType]: string })
  set(fundingFormWarningAtom, {} as { [key in keyof FundFormType]: string })
})
