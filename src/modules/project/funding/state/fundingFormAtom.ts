import { atom } from 'jotai'

import { guardianRewardsAtom } from '@/modules/guardians/state/guardianRewards.ts'
import { guardianRewardsMap, GuardianRewardType } from '@/modules/guardians/utils/constants.ts'
import { bitcoinQuoteAtom } from '@/shared/state/btcRateAtom'
import {
  ContributionFeesFragment,
  GuardianType,
  PaymentFeePayer,
  PaymentFeeType,
  ProjectPageWalletFragment,
  ProjectRewardFragment,
  ProjectShippingConfigType,
  ProjectSubscriptionPlansFragment,
  RewardCurrency,
  ShippingDestination,
  SubscriptionCurrencyType,
  UserSubscriptionInterval,
} from '@/types'
import { commaFormatted, convertAmount, isProjectAnException, toInt, validateEmail } from '@/utils'

import {
  paymentMethodAtom,
  PaymentMethods,
} from '../../pages/projectFunding/views/fundingPayment/state/paymentMethodAtom.ts'
import { projectAtom, ProjectState } from '../../state/projectAtom'
import { rewardsAtom } from '../../state/rewardsAtom'
import { subscriptionsAtom } from '../../state/subscriptionAtom'
import { walletAtom } from '../../state/walletAtom'
import { fundingInputAfterRequestAtom } from './fundingContributionCreateInputAtom.ts'
import { fundingPaymentDetailsAtom } from './fundingPaymentAtom.ts'
import { shippingAddressAtom, shippingCountryAtom } from './shippingAddressAtom.ts'

export type FundingProject = Pick<
  ProjectState,
  | 'id'
  | 'name'
  | 'status'
  | 'rewardCurrency'
  | 'title'
  | 'owners'
  | 'paymentMethods'
  | 'subCategory'
  | 'fundingStrategy'
>

export enum FundingUserInfoError {
  EMAIL = 'email',
  PRIVATE_COMMENT = 'privateComment',
  SHIPPING_ADDRESS = 'shippingAddress',
}

export const DEFAULT_COUNTRY_CODE = 'DEFAULT'

export const DEFAULT_GEYSER_TIP_PERCENT = 5

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
  guardianBadges: GuardianType[]
}

const initialState: FundFormType = {
  donationAmount: 0,
  donationAmountUsdCent: 0,
  shippingCost: 0,
  comment: '',
  privateComment: '',
  email: '',
  media: '',
  followProject: false,
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
  geyserTipPercent: DEFAULT_GEYSER_TIP_PERCENT,
  guardianBadges: [],
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
  const bitcoinQuote = get(bitcoinQuoteAtom)

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
          totalCostInUsdCent += convertAmount.satsToUsdCents({ sats: currentRewardTotalCost, bitcoinQuote })
        } else {
          // Usdcent
          totalCostInUsdCent += currentRewardTotalCost
          totalCostInSatoshi += convertAmount.usdCentsToSats({ usdCents: currentRewardTotalCost, bitcoinQuote })
        }
      }
    })
  }

  return { sats: totalCostInSatoshi, usdCents: totalCostInUsdCent, base: baseCostTotal }
})

export const shippingCostAtom = atom((get) => {
  const { rewardsByIDAndCount } = get(fundingFormStateAtom)
  const { rewards } = get(fundingProjectAtom)
  const shippingAddress = get(shippingAddressAtom)
  const shippingCountry = get(shippingCountryAtom)
  const bitcoinQuote = get(bitcoinQuoteAtom)

  const response = { sats: 0, usdCents: 0 }

  if (rewards && rewardsByIDAndCount) {
    Object.keys(rewardsByIDAndCount).forEach((rewardID: string) => {
      // Find reward by comparing string representations of IDs
      const reward = rewards.find((r) => r.id.toString() === rewardID)
      const count = rewardsByIDAndCount[rewardID]
      const country = shippingCountry || shippingAddress?.country || DEFAULT_COUNTRY_CODE

      if (!reward || !count || !(count > 0) || !reward.hasShipping) return

      const { shippingConfig } = reward
      if (!shippingConfig) return

      const { shippingRates } = shippingConfig
      if (!shippingRates) return

      const defaultRate = shippingRates.find((rate) => rate.country === DEFAULT_COUNTRY_CODE)
      if (!defaultRate) return

      const countryRate = shippingRates.find((rate) => rate.country === country) || defaultRate
      console.log('country', countryRate)

      const { baseRate, incrementRate } = countryRate.sameAsDefault ? defaultRate : countryRate

      if (shippingConfig.type === ProjectShippingConfigType.Flat) {
        response.usdCents += baseRate
      } else if (shippingConfig.type === ProjectShippingConfigType.PerUnit) {
        response.usdCents += baseRate * count
      } else if (shippingConfig.type === ProjectShippingConfigType.Incremental) {
        response.usdCents += baseRate + incrementRate * (count - 1)
      }
    })
  }

  response.sats =
    response.usdCents > 0 ? convertAmount.usdCentsToSats({ usdCents: response.usdCents, bitcoinQuote }) : 0

  return response
})

/**
 * Derived atom for the costs associated with selected subscriptions.
 * Returns costs in satoshi, usdCent, and the original base cost.
 */
export const subscriptionCostAtoms = atom((get): { sats: number; usdCents: number; base: number } => {
  const { subscription } = get(fundingFormStateAtom)
  const { subscriptions } = get(fundingProjectAtom)
  const bitcoinQuote = get(bitcoinQuoteAtom)

  const selectedSubscription = subscriptions?.find((sub) => sub.id === subscription.subscriptionId)

  if (!selectedSubscription) {
    return { sats: 0, usdCents: 0, base: 0 }
  }

  const base = selectedSubscription.cost
  let sats = 0
  let usdCents = 0

  // Compare against the value defined in the SubscriptionCurrencyType enum ('USDCENT')
  // Note: The enum definition provided only includes Usdcent.
  if (selectedSubscription.currency === 'USDCENT') {
    // Using the correct uppercase string
    usdCents = base // Base cost is already in USD cents
    sats = convertAmount.usdCentsToSats({ usdCents: base, bitcoinQuote })
  }

  return {
    sats,
    usdCents,
    base,
  }
})

/** Derived atom for calculating tip amounts in both units */
export const tipAtoms = atom((get) => {
  const { donationAmount, geyserTipPercent } = get(fundingFormStateAtom)
  const rewardsCosts = get(rewardsCostAtoms) // Use derived rewards cost
  const shippingCosts = get(shippingCostAtom)
  const bitcoinQuote = get(bitcoinQuoteAtom)

  // Calculate tip based on satoshi value of donation + rewards
  const tipBaseSats = donationAmount + rewardsCosts.sats + shippingCosts.sats
  const tipSats = geyserTipPercent > 0 ? Math.round((tipBaseSats * geyserTipPercent) / 100) : 0
  const tipUsdCent = tipSats > 0 ? convertAmount.satsToUsdCents({ sats: tipSats, bitcoinQuote }) : 0

  return { sats: tipSats, usdCents: tipUsdCent }
})

const FeesPaidByContributorThatIsNotNetworkFees = [PaymentFeeType.Tip, PaymentFeeType.Shipping]

export const reduceToNetworkFees = (acc: number, fee: ContributionFeesFragment) => {
  if (
    fee.feePayer === PaymentFeePayer.Contributor &&
    fee.feeType &&
    !FeesPaidByContributorThatIsNotNetworkFees.includes(fee.feeType)
  ) {
    return acc + fee.feeAmount
  }

  return acc
}

/** Derived atom for calculating network fees */
export const networkFeeAtom = atom((get) => {
  const paymentMethod = get(paymentMethodAtom)
  const fundingPaymentDetails = get(fundingPaymentDetailsAtom)
  const bitcoinQuote = get(bitcoinQuoteAtom)

  let feesSats = 0

  if (paymentMethod === PaymentMethods.onChain) {
    if (fundingPaymentDetails.onChainSwap?.fees?.length) {
      feesSats = fundingPaymentDetails.onChainSwap?.fees.reduce(reduceToNetworkFees, 0) || 0
    } else if (fundingPaymentDetails.onChainToRskSwap?.fees?.length) {
      feesSats = fundingPaymentDetails.onChainToRskSwap?.fees.reduce(reduceToNetworkFees, 0) || 0
    }
  } else if (paymentMethod === PaymentMethods.lightning && fundingPaymentDetails.lightningToRskSwap?.fees?.length) {
    feesSats = fundingPaymentDetails.lightningToRskSwap?.fees.reduce(reduceToNetworkFees, 0) || 0
  }

  const feesUsdCents = feesSats > 0 ? convertAmount.satsToUsdCents({ sats: feesSats, bitcoinQuote }) : 0
  return { sats: feesSats, usdCents: feesUsdCents }
})

export const guardianBadgesCostAtoms = atom((get) => {
  const { guardianBadges } = get(fundingFormStateAtom)
  const guardianRewards = get(guardianRewardsAtom)
  const bitcoinQuote = get(bitcoinQuoteAtom)

  const guardianBadgesCost = guardianRewards
    .filter((reward) =>
      guardianRewardsMap.some(
        (map) =>
          map.rewardUUID === reward.uuid &&
          map.type === GuardianRewardType.Badge &&
          guardianBadges.includes(map.guardian as GuardianType),
      ),
    )
    .reduce((acc, reward) => acc + reward.cost, 0)

  const guardianBadgesCostSats = convertAmount.usdCentsToSats({ usdCents: guardianBadgesCost, bitcoinQuote })

  return { sats: guardianBadgesCostSats, usdCents: guardianBadgesCost }
})

/**
 * Derived atom for the total amount in Satoshis.
 * Sums donation, rewards, subscription, shipping, and tip.
 * Assumes shippingCost in base state is USD cents.
 */
export const totalAmountSatsAtom = atom((get) => {
  const { donationAmount } = get(fundingFormStateAtom)
  const rewardsCosts = get(rewardsCostAtoms)
  const shippingCosts = get(shippingCostAtom)
  const subscriptionCosts = get(subscriptionCostAtoms)
  const tip = get(tipAtoms)
  const networkFee = get(networkFeeAtom)
  const guardianBadgesCosts = get(guardianBadgesCostAtoms)

  // Sum all components
  const total =
    donationAmount +
    rewardsCosts.sats +
    subscriptionCosts.sats +
    shippingCosts.sats +
    tip.sats +
    networkFee.sats +
    guardianBadgesCosts.sats
  return total
})

/**
 * Derived atom for the total amount in USD Cents.
 * Converts the final total satoshi amount to USD cents for consistency.
 */
export const totalAmountUsdCentAtom = atom((get) => {
  const totalSats = get(totalAmountSatsAtom) // Get the final satoshi total
  const bitcoinQuote = get(bitcoinQuoteAtom)

  if (totalSats > 0) {
    // Convert the single total satoshi value to USD cents
    return convertAmount.satsToUsdCents({ sats: totalSats, bitcoinQuote })
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
  const bitcoinQuote = get(bitcoinQuoteAtom)
  let newState = { ...currentState, [name]: value }

  // Synchronize donation amounts
  if (name === 'donationAmount') {
    const sats = Number(value) || 0

    const usdCent = convertAmount.satsToUsdCents({ sats, bitcoinQuote })
    newState = { ...newState, donationAmountUsdCent: usdCent }
  } else if (name === 'donationAmountUsdCent') {
    const usdCent = Number(value) || 0
    const sats = convertAmount.usdCentsToSats({ usdCents: usdCent, bitcoinQuote })
    newState = { ...newState, donationAmount: sats }
  }
  // No longer calculates totals here

  set(fundingFormStateAtom, newState)
})

/* Boolean to check if the funding form has rewards */
export const fundingFormHasRewardsAtom = atom((get) => {
  const fundingFormState = get(fundingFormStateAtom)
  return fundingFormState.rewardsByIDAndCount && Object.keys(fundingFormState.rewardsByIDAndCount).length > 0
})

export const fundingFormShippingAvailabilityAtom = atom((get) => {
  const { rewardsByIDAndCount } = get(fundingFormStateAtom)
  const { rewards } = get(fundingProjectAtom)

  let shippingAvailability: string[] | undefined

  if (!rewardsByIDAndCount) return shippingAvailability

  Object.keys(rewardsByIDAndCount).forEach((rewardID: string) => {
    const reward = rewards.find((r) => r.id.toString() === rewardID)
    if (reward?.hasShipping && !reward.shippingConfig?.globalShipping) {
      const shippingCountries = reward.shippingConfig?.shippingRates
        ?.filter((rate) => rate.country !== DEFAULT_COUNTRY_CODE)
        .map((rate) => rate.country)

      if (!shippingAvailability) {
        shippingAvailability = shippingCountries
      } else {
        shippingAvailability = shippingAvailability.filter((country) => shippingCountries?.includes(country))
      }
    }
  })

  return shippingAvailability
})

export const cannotCompleteShippingForThisOrderAtom = atom((get) => {
  const shippingAvailability = get(fundingFormShippingAvailabilityAtom)

  if (shippingAvailability && shippingAvailability.length === 0) return true

  return false
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

  if (!fundingPaymentDetails.onChainSwap?.address && !fundingPaymentDetails.onChainToRskSwap?.address) {
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

  if (totalAmount < 1000) {
    return {
      title: `The payment minimum is 1000 satoshi.`,
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
