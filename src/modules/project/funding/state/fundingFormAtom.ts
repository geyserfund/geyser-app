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
  'id' | 'name' | 'status' | 'rewardCurrency' | 'title' | 'owners' | 'paymentMethods'
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
  shippingCost: number
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
  geyserTipPercent: number
}

const initialState: FundFormType = {
  donationAmount: 0,
  donationAmountUsdCent: 0,
  shippingCost: 0,
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
  geyserTipPercent: 5,
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

/** Derived atom for calculating rewards costs in both units */
export const rewardsCostAtoms = atom((get) => {
  const { rewardsByIDAndCount } = get(fundingFormStateAtom)
  const { rewards, rewardCurrency } = get(fundingProjectAtom)
  const usdRate = get(usdRateAtom)

  let totalCostInSatoshi = 0
  let totalCostInUsdCent = 0
  let baseCostTotal = 0 // Accumulates cost in the project's reward currency

  if (rewards && rewardsByIDAndCount) {
    Object.keys(rewardsByIDAndCount).forEach((rewardID: string) => {
      // Find reward by comparing string representations of IDs
      const reward = rewards.find((r) => r.id.toString() === rewardID)
      const count = rewardsByIDAndCount[rewardID]

      if (reward && count && count > 0) {
        const currentRewardTotalCost = reward.cost * count
        baseCostTotal += currentRewardTotalCost // Accumulate base cost

        if (rewardCurrency === RewardCurrency.Btcsat) {
          totalCostInSatoshi += currentRewardTotalCost
          totalCostInUsdCent += Math.round(dollarsToCents((currentRewardTotalCost / SATOSHIS_IN_BTC) * usdRate))
        } else {
          // Usdcent
          totalCostInUsdCent += currentRewardTotalCost
          totalCostInSatoshi += Math.round((centsToDollars(currentRewardTotalCost) / usdRate) * SATOSHIS_IN_BTC)
        }
      }
    })
  }

  return { satoshi: totalCostInSatoshi, usdCent: totalCostInUsdCent, base: baseCostTotal }
})

/**
 * Derived atom for the costs associated with selected subscriptions.
 * Returns costs in satoshi, usdCent, and the original base cost.
 */
export const subscriptionCostAtoms = atom((get): { satoshi: number; usdCent: number; base: number } => {
  const { subscription } = get(fundingFormStateAtom)
  const { subscriptions } = get(fundingProjectAtom)
  const usdRate = get(usdRateAtom)

  const selectedSubscription = subscriptions?.find((sub) => sub.id === subscription.subscriptionId)

  if (!selectedSubscription) {
    return { satoshi: 0, usdCent: 0, base: 0 }
  }

  const base = selectedSubscription.cost
  let satoshi = 0
  let usdCent = 0

  // Compare against the value defined in the SubscriptionCurrencyType enum ('USDCENT')
  // Note: The enum definition provided only includes Usdcent.
  if (selectedSubscription.currency === 'USDCENT') {
    // Using the correct uppercase string
    usdCent = base // Base cost is already in USD cents
    satoshi = usdRate > 0 ? Math.round((centsToDollars(base) / usdRate) * SATOSHIS_IN_BTC) : 0
  }

  return {
    satoshi,
    usdCent,
    base,
  }
})

/** Derived atom for calculating tip amounts in both units */
export const tipAtoms = atom((get) => {
  const { donationAmount, geyserTipPercent } = get(fundingFormStateAtom)
  const rewardsCosts = get(rewardsCostAtoms) // Use derived rewards cost
  const usdRate = get(usdRateAtom)

  // Calculate tip based on satoshi value of donation + rewards
  const tipBaseSats = donationAmount + rewardsCosts.satoshi
  const tipSats = geyserTipPercent > 0 ? Math.round((tipBaseSats * geyserTipPercent) / 100) : 0
  const tipUsdCent = tipSats > 0 && usdRate > 0 ? Math.round(dollarsToCents((tipSats / SATOSHIS_IN_BTC) * usdRate)) : 0

  return { satoshi: tipSats, usdCent: tipUsdCent }
})

/**
 * Derived atom for the total amount in Satoshis.
 * Sums donation, rewards, subscription, shipping, and tip.
 * Assumes shippingCost in base state is USD cents.
 */
export const totalAmountSatsAtom = atom((get) => {
  const { donationAmount, shippingCost } = get(fundingFormStateAtom)
  const rewardsCosts = get(rewardsCostAtoms)
  const subscriptionCosts = get(subscriptionCostAtoms)
  const tip = get(tipAtoms)
  const usdRate = get(usdRateAtom)

  // Convert shippingCost (assumed USD cents) to sats
  const shippingCostSats =
    shippingCost > 0 && usdRate > 0 ? Math.round((centsToDollars(shippingCost) / usdRate) * SATOSHIS_IN_BTC) : 0

  // Sum all components
  const total = donationAmount + rewardsCosts.satoshi + subscriptionCosts.satoshi + shippingCostSats + tip.satoshi
  return total
})

/**
 * Derived atom for the total amount in USD Cents.
 * Converts the final total satoshi amount to USD cents for consistency.
 */
export const totalAmountUsdCentAtom = atom((get) => {
  const totalSats = get(totalAmountSatsAtom) // Get the final satoshi total
  const usdRate = get(usdRateAtom)

  if (totalSats > 0 && usdRate > 0) {
    // Convert the single total satoshi value to USD cents
    return Math.round(dollarsToCents((totalSats / SATOSHIS_IN_BTC) * usdRate))
  }

  return 0 // Return 0 if sats or rate is zero
})

/** Set the error state for the funding form */
export const setErrorStateAtom = atom(null, (_, set, { key, value }: { key: keyof FundFormType; value: string }) => {
  set(fundingFormErrorAtom, (current: { [key in keyof FundFormType]: string }) => ({ ...current, [key]: value }))
})

/** Set the warning state for the funding form */
export const setWarningStateAtom = atom(
  null,
  (get, set, { key, value }: { key: keyof FundFormType; value: string }) => {
    set(fundingFormWarningAtom, (current: { [key in keyof FundFormType]: string }) => ({ ...current, [key]: value }))
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
 * Set funding form based on a name and value.
 * Now only updates the specific field and syncs donation amounts.
 * Totals are handled by derived atoms.
 */
export const setFundFormStateAtom = atom(null, (get, set, name: keyof FundFormType, value: any) => {
  const currentState = get(fundingFormStateAtom)
  const usdRate = get(usdRateAtom)
  let newState = { ...currentState, [name]: value }

  // Synchronize donation amounts
  if (name === 'donationAmount') {
    const sats = Number(value) || 0
    if (usdRate > 0) {
      const usdCent = Math.round(dollarsToCents((sats / SATOSHIS_IN_BTC) * usdRate))
      newState = { ...newState, donationAmountUsdCent: usdCent }
    }
  } else if (name === 'donationAmountUsdCent') {
    const usdCent = Number(value) || 0
    if (usdRate > 0) {
      const sats = Math.round((centsToDollars(usdCent) / usdRate) * SATOSHIS_IN_BTC)
      newState = { ...newState, donationAmount: sats }
    }
  }
  // No longer calculates totals here

  set(fundingFormStateAtom, newState)
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

/** Reset funding form rewards to its initial value (simplified) */
export const resetFundingFormRewardsAtom = atom(null, (get, set) => {
  set(fundingFormStateAtom, (current) => ({
    ...current,
    rewardsByIDAndCount: {}, // Reset selections
    needsShipping: false, // Reset shipping flag
    // Remove fields that are now calculated by derived atoms or will be
    // rewardsCost: 0,
    // rewardsCostInSatoshi: 0,
    // rewardsCostInUsdCent: 0,
    // subscriptionId: undefined,
    // subscriptionCost: 0,
    // totalAmount: current.donationAmount, // Totals are now derived
  }))
})

/**
 * Update rewards in the funding flow.
 * Now only updates rewardsByIDAndCount and needsShipping.
 * Costs and totals are handled by derived atoms.
 */
export const updateFundingFormRewardAtom = atom(null, (get, set, { id, count }: { id: number; count: number }) => {
  const { rewards } = get(fundingProjectAtom)
  // const project = get(fundingProjectAtom) // No longer needed for currency check here
  // const usdRate = get(usdRateAtom) // No longer needed for conversion here

  set(fundingFormStateAtom, (current) => {
    const newRewardsCountInfo = { ...current.rewardsByIDAndCount }

    if (count !== 0) {
      newRewardsCountInfo[id.toString()] = count
    } else if (count === 0) {
      delete newRewardsCountInfo[id.toString()]
    }

    // Only calculate needsShipping based on selected rewards
    let needsShipping = false
    if (rewards) {
      Object.keys(newRewardsCountInfo).forEach((rewardID: string) => {
        // Find reward by comparing string representations of IDs
        const reward = rewards.find((r) => r.id.toString() === rewardID)
        if (reward?.hasShipping) {
          needsShipping = true
        }
      })
    }

    return {
      ...current,
      rewardsByIDAndCount: newRewardsCountInfo,
      needsShipping, // Update shipping status
    }
  })
})

/**
 * Update subscription in the funding flow.
 * Now only updates the subscription object.
 * Costs and totals are handled by derived atoms.
 */
export const updateFundingFormSubscriptionAtom = atom(null, (get, set, { id }: { id: number }) => {
  const { subscriptions } = get(fundingProjectAtom)

  set(fundingFormStateAtom, (current) => {
    let selectedSubscription = null

    if (subscriptions) {
      selectedSubscription = subscriptions.find((s) => toInt(s.id) === id)
    }

    return {
      ...current,
      // Update only the subscription details in the main state
      subscription: {
        cost: selectedSubscription?.cost ?? 0, // Put base cost back
        subscriptionId: selectedSubscription?.id,
        interval: selectedSubscription?.interval || UserSubscriptionInterval.Monthly,
        name: selectedSubscription?.name,
        currency: selectedSubscription?.currency,
      },
    }
  })
})

/** Check if the  funding Amount is enough for onChain payments */
export const fundingOnchainAmountWarningAtom = atom((get) => {
  const fundingProjectState = get(fundingProjectAtom)
  const fundingPaymentDetails = get(fundingPaymentDetailsAtom)
  const totalAmount = get(totalAmountSatsAtom)
  const walletLimits = fundingProjectState.wallet?.limits?.contribution

  if (totalAmount && walletLimits) {
    const { onChain } = walletLimits

    if (!totalAmount) {
      return ''
    }

    if (onChain?.max && typeof onChain.max === 'number' && totalAmount > onChain.max) {
      return `The amount you are trying to send is too high for on-chain payments. Only payments below ${commaFormatted(
        onChain.max,
      )} sats can be sent on-chain.`
    }

    if (onChain?.min && typeof onChain.min === 'number' && totalAmount < onChain.min) {
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
  // const formState = get(fundingFormStateAtom) // No longer needed for totalAmountUsdCent

  // Read totalAmountUsdCent from derived atom
  const totalAmountUsdCent = get(totalAmountUsdCentAtom)

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
  const fundingProjectState = get(fundingProjectAtom)
  const totalAmount: number = get(totalAmountSatsAtom)
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
      title: 'Email is required when purchasing a product.',
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

/** Atom to store the launch project id */
export const launchContributionProjectIdAtom = atom<string>('')

/** Reset Funding Form */
export const resetFundingFormAtom = atom(null, (_, set) => {
  set(fundingFormStateAtom, initialState)
  set(fundingInputAfterRequestAtom, null)
  set(fundingFormErrorAtom, {} as { [key in keyof FundFormType]: string })
  set(fundingFormWarningAtom, {} as { [key in keyof FundFormType]: string })
  set(launchContributionProjectIdAtom, '')
})
