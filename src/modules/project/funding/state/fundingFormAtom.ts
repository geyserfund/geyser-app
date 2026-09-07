import { t } from 'i18next'
import { atom } from 'jotai'

import { guardianRewardsAtom } from '@/modules/guardians/state/guardianRewards.ts'
import { guardianRewardsMap, GuardianRewardType } from '@/modules/guardians/utils/constants.ts'
import {
  ProjectSubscriptionPlan,
  RecurringFundingMode,
  recurringFundingModes,
  RecurringInterval,
  recurringIntervals,
} from '@/modules/project/recurring/graphql.ts'
import { bitcoinQuoteAtom } from '@/shared/state/btcRateAtom'
import {
  ContributionFeesFragment,
  GuardianType,
  PaymentFeePayer,
  PaymentFeeType,
  ProjectFundingStrategy,
  ProjectPageWalletFragment,
  ProjectRewardFragment,
  RewardCurrency,
  ShippingDestination,
} from '@/types'
import { commaFormatted, convertAmount, isProjectAnException, toInt, validateEmail } from '@/utils'

import {
  fiatCheckoutMethods,
  fiatPaymentMethodAtom,
  intendedPaymentMethodAtom,
  paymentMethodAtom,
  PaymentMethods,
} from '../../pages/projectFunding/views/fundingPayment/state/paymentMethodAtom.ts'
import { projectAtom, ProjectState } from '../../state/projectAtom'
import { rewardsAtom } from '../../state/rewardsAtom'
import { subscriptionsAtom } from '../../state/subscriptionAtom'
import { walletAtom } from '../../state/walletAtom'
import { fundingInputAfterRequestAtom } from './fundingContributionCreateInputAtom.ts'
import { fundingPaymentDetailsAtom } from './fundingPaymentAtom.ts'
import { recurringContributionRenewalAtom } from './recurringContributionRenewalAtom.ts'

export type FundingProject = Pick<
  ProjectState,
  | 'id'
  | 'name'
  | 'status'
  | 'title'
  | 'owners'
  | 'paymentMethods'
  | 'subCategory'
  | 'fundingStrategy'
  | 'isCircularGrant'
  | 'rskEoa'
  | 'activeMatching'
  | 'rewardCurrency'
>

export enum FundingUserInfoError {
  EMAIL = 'email',
  PRIVATE_COMMENT = 'privateComment',
  SHIPPING_ADDRESS = 'shippingAddress',
}

export enum FundingUserInfoValidationState {
  RECURRING_EMAIL_REQUIRED = 'recurringEmailRequired',
  SUBSCRIPTION_EMAIL_REQUIRED = 'subscriptionEmailRequired',
  INVALID_EMAIL = 'invalidEmail',
  VALID = 'valid',
}

export const DEFAULT_GEYSER_TIP_PERCENT = 5

export type FundingProjectState = FundingProject & {
  wallet?: ProjectPageWalletFragment
  /** @deprecated Reward selection is no longer part of the funding flow. */
  rewards: ProjectRewardFragment[]
  subscriptions?: ProjectSubscriptionPlan[]
}

export type FundFormType = {
  fundingMode: RecurringFundingMode
  recurringInterval: RecurringInterval
  donationAmount: number
  donationAmountUsdCent: number
  /** @deprecated Kept only for compatibility with historical funding state. */
  shippingCost: number
  email: string
  media: string
  comment: string
  privateComment?: string
  /** @deprecated Reward purchases are disabled. */
  rewardsByIDAndCount?: { [key: string]: number } | undefined
  /** @deprecated Reward purchases are disabled. */
  rewardCurrency: RewardCurrency
  /** @deprecated Reward purchases are disabled. */
  needsShipping: boolean
  /** @deprecated Reward purchases are disabled. */
  shippingDestination: ShippingDestination
  followProject: boolean
  subscribeToGeyserEmails: boolean
  subscription: {
    subscriptionId?: number
    interval: RecurringInterval
    name?: string
    amountUsdCent: number
    amountBtcSat: number
  }
  geyserTipPercent: number
  guardianBadges: GuardianType[]
}

const initialState: FundFormType = {
  fundingMode: recurringFundingModes.oneTime,
  recurringInterval: recurringIntervals.monthly,
  donationAmount: 0,
  donationAmountUsdCent: 0,
  shippingCost: 0,
  comment: '',
  privateComment: '',
  rewardsByIDAndCount: undefined,
  rewardCurrency: RewardCurrency.Usdcent,
  needsShipping: false,
  shippingDestination: ShippingDestination.National,
  email: '',
  media: '',
  followProject: false,
  subscribeToGeyserEmails: false,
  subscription: {
    subscriptionId: undefined,
    interval: recurringIntervals.monthly,
    name: '',
    amountUsdCent: 0,
    amountBtcSat: 0,
  },
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

/**
 * Derived atom for the costs associated with selected subscriptions.
 * Returns costs in satoshi, usdCent, and the original base cost.
 */
export const subscriptionCostAtoms = atom((get): { sats: number; usdCents: number; base: number } => {
  const { subscription } = get(fundingFormStateAtom)
  const { subscriptions } = get(fundingProjectAtom)
  const intendedPaymentMethod = get(intendedPaymentMethodAtom)
  const paymentMethod = get(paymentMethodAtom)

  const selectedSubscription = subscriptions?.find((sub) => toInt(sub.id) === subscription.subscriptionId)

  if (!selectedSubscription) {
    return { sats: 0, usdCents: 0, base: 0 }
  }

  const shouldUseUsd =
    paymentMethod === PaymentMethods.fiatSwap ||
    (!paymentMethod && intendedPaymentMethod === PaymentMethods.fiatSwap) ||
    (!paymentMethod && !intendedPaymentMethod)
  const usdCents = selectedSubscription.amountUsdCent
  const sats = selectedSubscription.amountBtcSat
  const base = shouldUseUsd ? usdCents : sats

  return {
    sats,
    usdCents,
    base,
  }
})

/** Derived atom for calculating tip amounts in both units */
export const tipAtoms = atom((get) => {
  const renewalContext = get(recurringContributionRenewalAtom)
  const { donationAmount, geyserTipPercent, fundingMode } = get(fundingFormStateAtom)
  const bitcoinQuote = get(bitcoinQuoteAtom)

  if (renewalContext || fundingMode === recurringFundingModes.membership) {
    return { sats: 0, usdCents: 0 }
  }

  const tipSats = geyserTipPercent > 0 ? Math.round((donationAmount * geyserTipPercent) / 100) : 0
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

  if (paymentMethod === PaymentMethods.onChain && fundingPaymentDetails.onChainToRskSwap?.fees?.length) {
    feesSats = fundingPaymentDetails.onChainToRskSwap?.fees.reduce(reduceToNetworkFees, 0) || 0
  } else if (paymentMethod === PaymentMethods.lightning && fundingPaymentDetails.lightningToRskSwap?.fees?.length) {
    feesSats = fundingPaymentDetails.lightningToRskSwap?.fees.reduce(reduceToNetworkFees, 0) || 0
  }

  const feesUsdCents = feesSats > 0 ? convertAmount.satsToUsdCents({ sats: feesSats, bitcoinQuote }) : 0
  return { sats: feesSats, usdCents: feesUsdCents }
})

export const guardianBadgesCostAtoms = atom((get) => {
  const { guardianBadges, fundingMode } = get(fundingFormStateAtom)
  const guardianRewards = get(guardianRewardsAtom)
  const bitcoinQuote = get(bitcoinQuoteAtom)

  if (fundingMode !== recurringFundingModes.oneTime) {
    return { sats: 0, usdCents: 0 }
  }

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
 * Sums donation, subscription, tip, network fees, and guardian badges.
 */
export const totalAmountSatsAtom = atom((get) => {
  const { donationAmount } = get(fundingFormStateAtom)
  const subscriptionCosts = get(subscriptionCostAtoms)
  const tip = get(tipAtoms)
  const networkFee = get(networkFeeAtom)
  const guardianBadgesCosts = get(guardianBadgesCostAtoms)

  const total = donationAmount + subscriptionCosts.sats + tip.sats + networkFee.sats + guardianBadgesCosts.sats
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

/** @deprecated Reward purchases are disabled; retained for historical state consumers. */
export const rewardsCostAtoms = atom(() => ({ sats: 0, usdCents: 0, base: 0 }))

/** @deprecated Reward purchases are disabled; retained for historical state consumers. */
export const shippingCostAtom = atom(() => ({ sats: 0, usdCents: 0 }))

/** @deprecated Reward purchases are disabled; retained for historical state consumers. */
export const fundingFormHasRewardsAtom = atom(false)

/** @deprecated Reward purchases are disabled; retained for historical state consumers. */
export const fundingFormShippingAvailabilityAtom = atom<string[] | undefined>(undefined)

/** @deprecated Reward purchases are disabled; retained for historical state consumers. */
export const cannotCompleteShippingForThisOrderAtom = atom(false)

/** @deprecated Reward purchases are disabled; retained for historical state consumers. */
export const fundingFormHasRewardsThatRequirePrivateCommentAtom = atom(false)

/** @deprecated Reward purchases are disabled; retained for historical state consumers. */
export const resetFundingFormRewardsAtom = atom(null, (_, set) => {
  set(fundingFormStateAtom, (current) => ({
    ...current,
    rewardsByIDAndCount: {},
    needsShipping: false,
    shippingCost: 0,
  }))
})

/** @deprecated Reward purchases are disabled; retained for historical state consumers. */
export const updateFundingFormRewardAtom = atom(null, (_, set, { id, count }: { id: number; count: number }) => {
  set(fundingFormStateAtom, (current) => ({
    ...current,
    rewardsByIDAndCount: count > 0 ? { [id]: count } : {},
    needsShipping: false,
    shippingCost: 0,
  }))
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
 * Updates the specific field and synchronizes the two donation amount units.
 */
export const setFundFormStateAtom = atom(null, (get, set, name: keyof FundFormType, value: any) => {
  const currentState = get(fundingFormStateAtom)
  const bitcoinQuote = get(bitcoinQuoteAtom)
  let newState = { ...currentState, [name]: value }

  if (name === 'fundingMode') {
    const nextMode = value as RecurringFundingMode

    if (nextMode === recurringFundingModes.membership) {
      newState = {
        ...newState,
        guardianBadges: [],
        donationAmount: 0,
        donationAmountUsdCent: 0,
      }
    }

    if (nextMode !== recurringFundingModes.membership) {
      newState = {
        ...newState,
        subscription: {
          subscriptionId: undefined,
          interval: recurringIntervals.monthly,
          name: '',
          amountUsdCent: 0,
          amountBtcSat: 0,
        },
      }
    }
  }

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

  set(fundingFormStateAtom, newState)
})

/** Boolean to check if the funding form has a subscription */
export const fundingFormHasSubscriptionAtom = atom((get) => {
  const fundingFormState = get(fundingFormStateAtom)
  return (
    fundingFormState.fundingMode === recurringFundingModes.membership &&
    Boolean(fundingFormState.subscription?.subscriptionId)
  )
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
      fundingMode: recurringFundingModes.membership,
      donationAmount: 0,
      donationAmountUsdCent: 0,
      guardianBadges: [],
      subscription: {
        subscriptionId: selectedSubscription ? toInt(selectedSubscription.id) : undefined,
        interval: (selectedSubscription?.interval as RecurringInterval | undefined) || recurringIntervals.monthly,
        name: selectedSubscription?.name,
        amountUsdCent: selectedSubscription?.amountUsdCent ?? 0,
        amountBtcSat: selectedSubscription?.amountBtcSat ?? 0,
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

  if (
    !(
      fundingPaymentDetails.strikeOnChain?.address ||
      fundingPaymentDetails.strike?.address ||
      fundingPaymentDetails.onChainToRskSwap?.address
    )
  ) {
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

const MIN_AMOUNT_FOR_ALL_OR_NOTHING_PROJECT = 1000 // 10 USD in cents
const MIN_PAYMENT_AMOUNT_SATS = 1000
const MIN_PAYMENT_AMOUNT_SATS_FOR_TAKE_IT_ALL_PROJECT = 2500

/** Check if the input amount is valid for the funidng flow */
export const isFundingInputAmountValidAtom = atom((get) => {
  const fundingProjectState = get(fundingProjectAtom)
  const totalAmount: number = get(totalAmountSatsAtom)
  const { donationAmountUsdCent, fundingMode, subscription } = get(fundingFormStateAtom)
  const walletLimits = fundingProjectState.wallet?.limits?.contribution

  const isException = isProjectAnException(fundingProjectState.name)

  if (fundingMode === recurringFundingModes.membership && !subscription.subscriptionId) {
    return {
      title: t('Select a membership plan.'),
      description: t('Choose a plan before continuing.'),
      valid: false,
    }
  }

  if (
    fundingMode !== recurringFundingModes.oneTime &&
    fundingProjectState.fundingStrategy !== ProjectFundingStrategy.TakeItAll
  ) {
    return {
      title: t('Recurring contributions are only available on Take-it-all projects.'),
      description: t('Choose a one-time contribution instead.'),
      valid: false,
    }
  }

  if (
    fundingMode === recurringFundingModes.oneTime &&
    fundingProjectState.fundingStrategy === ProjectFundingStrategy.AllOrNothing &&
    donationAmountUsdCent < MIN_AMOUNT_FOR_ALL_OR_NOTHING_PROJECT
  ) {
    return {
      title: t('Amount less than $10.'),
      description: t('The minimum amount for an All-or-Nothing project is $10.'),
      valid: false,
    }
  }

  const minPaymentAmountSats =
    fundingProjectState.fundingStrategy === ProjectFundingStrategy.TakeItAll
      ? MIN_PAYMENT_AMOUNT_SATS_FOR_TAKE_IT_ALL_PROJECT
      : MIN_PAYMENT_AMOUNT_SATS

  if (totalAmount < minPaymentAmountSats) {
    return {
      title: t('The payment minimum is {{amount}} satoshi.', { amount: minPaymentAmountSats }),
      description: t('Please update the amount.'),
      valid: false,
    }
  }

  if (!isException && walletLimits?.max && totalAmount >= walletLimits.max) {
    return {
      title: t('Amount above the project wallet limit: {{amount}} sats.', {
        amount: commaFormatted(walletLimits.max),
      }),
      description: t('Please update the amount, or contact us for donating a higher amount.'),
      valid: false,
    }
  }

  if (walletLimits?.min && totalAmount < walletLimits.min) {
    return {
      title: t('The payment minimum is {{amount}} satoshi.', { amount: walletLimits.min }),
      description: t('Please update the amount.'),
      valid: false,
    }
  }

  return { title: '', description: '', valid: true }
})

/** Check if the funding user info is valid without allocating a new result object on every form update. */
export const fundingUserInfoValidationStateAtom = atom((get): FundingUserInfoValidationState => {
  const formState = get(fundingFormStateAtom)
  const renewalContext = get(recurringContributionRenewalAtom)

  const hasSubscription = get(fundingFormHasSubscriptionAtom)

  if (
    !renewalContext &&
    (hasSubscription || formState.fundingMode === recurringFundingModes.recurringDonation) &&
    !formState.email
  ) {
    return FundingUserInfoValidationState.RECURRING_EMAIL_REQUIRED
  }

  if ((formState.followProject || formState.subscribeToGeyserEmails) && !formState.email) {
    return FundingUserInfoValidationState.SUBSCRIPTION_EMAIL_REQUIRED
  }

  const requiresEmailValidation =
    hasSubscription ||
    formState.fundingMode === recurringFundingModes.recurringDonation ||
    formState.followProject ||
    formState.subscribeToGeyserEmails

  if (!renewalContext && requiresEmailValidation && !validateEmail(formState.email)) {
    return FundingUserInfoValidationState.INVALID_EMAIL
  }

  return FundingUserInfoValidationState.VALID
})

export const fundingModeAtom = atom((get) => get(fundingFormStateAtom).fundingMode)
export const isOneTimeFundingModeAtom = atom((get) => get(fundingModeAtom) === recurringFundingModes.oneTime)
export const isRecurringDonationModeAtom = atom(
  (get) => get(fundingModeAtom) === recurringFundingModes.recurringDonation,
)
export const isMembershipFundingModeAtom = atom((get) => get(fundingModeAtom) === recurringFundingModes.membership)
export const canUseRecurringFundingAtom = atom((get) => {
  const project = get(fundingProjectAtom)
  return project.fundingStrategy === ProjectFundingStrategy.TakeItAll
})

/** Reset Funding Form */
export const resetFundingFormAtom = atom(null, (_, set) => {
  set(fundingFormStateAtom, initialState)
  set(fundingInputAfterRequestAtom, null)
  set(recurringContributionRenewalAtom, null)
  set(intendedPaymentMethodAtom, undefined)
  set(fiatPaymentMethodAtom, fiatCheckoutMethods.creditCard)
  set(fundingFormErrorAtom, {} as { [key in keyof FundFormType]: string })
  set(fundingFormWarningAtom, {} as { [key in keyof FundFormType]: string })
})
