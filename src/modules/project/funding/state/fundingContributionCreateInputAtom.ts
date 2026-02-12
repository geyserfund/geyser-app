/* eslint-disable complexity */
import { atom } from 'jotai'

import { authUserAtom } from '@/modules/auth/state/authAtom.ts'
import { usdRateAtom } from '@/shared/state/btcRateAtom'
import { referrerHeroIdAtom } from '@/shared/state/referralAtom.ts'
import { isPrismEnabled } from '@/shared/utils/project/isPrismEnabled.ts'
import {
  ContributionCreateInput,
  ContributionPaymentsInput,
  FundingResourceType,
  OrderItemInput,
  OrderItemType,
  ProjectFundingStrategy,
  ProjectRewardFragment,
  QuoteCurrency,
  ShippingAddress,
  StripeEmbeddedTheme,
  UserMeFragment,
} from '@/types/generated/graphql'
import { toInt } from '@/utils'

import { userAccountKeysAtom } from '../../../auth/state/userAccountKeysAtom.ts'
import {
  intendedPaymentMethodAtom,
  PaymentMethods,
} from '../../pages/projectFunding/views/fundingPayment/state/paymentMethodAtom.ts'
import { sourceResourceAtom } from '../../pages/projectView/state/sourceActivityAtom.ts'
import {
  fundingProjectAtom,
  guardianBadgesCostAtoms,
  rewardsCostAtoms,
  shippingCostAtom,
  tipAtoms,
} from './fundingFormAtom'
import { fundingFormHasRewardsAtom, fundingFormStateAtom } from './fundingFormAtom'
import type { FundFormType, FundingProjectState } from './fundingFormAtom.ts'
import { selectedGoalIdAtom } from './selectedGoalAtom'
import { shippingAddressAtom } from './shippingAddressAtom.ts'

type BuildContributionCreateInputArgs = {
  formState: FundFormType
  fundingProject: FundingProjectState
  shippingAddress?: Omit<ShippingAddress, 'id'> & { id?: ShippingAddress['id'] }
  hasSelectedRewards: boolean
  user?: UserMeFragment | null
  usdRate: number
  projectGoalId?: string | null
  sourceResource: { resourceId?: string | number; resourceType?: FundingResourceType }
  referrerHeroId?: string | null
  rewardsCosts: { sats: number; usdCents: number; base: number }
  geyserTip: { sats: number }
  guardianBadgesCosts: { sats: number }
  shippingCosts: { sats: number; usdCents: number }
  paymentsInput: ContributionPaymentsInput
}

const getStripeEmbeddedTheme = (): StripeEmbeddedTheme => {
  if (typeof window === 'undefined') {
    return StripeEmbeddedTheme.Light
  }

  return window.localStorage.getItem('chakra-ui-color-mode') === 'dark'
    ? StripeEmbeddedTheme.Dark
    : StripeEmbeddedTheme.Light
}

const buildContributionCreateInput = ({
  formState,
  fundingProject,
  shippingAddress,
  hasSelectedRewards,
  user,
  usdRate,
  projectGoalId,
  sourceResource,
  referrerHeroId,
  rewardsCosts,
  geyserTip,
  guardianBadgesCosts,
  shippingCosts,
  paymentsInput,
}: BuildContributionCreateInputArgs): ContributionCreateInput => {
  const {
    donationAmount,
    rewardsByIDAndCount,
    email,
    comment,
    media,
    privateComment,
    followProject,
    subscribeToGeyserEmails,
    subscription,
    geyserTipPercent,
    guardianBadges,
  } = formState

  const anonymous = !user || !user.id

  const orderItemInputs: OrderItemInput[] = []
  if (hasSelectedRewards && rewardsByIDAndCount) {
    Object.keys(rewardsByIDAndCount).map((key) => {
      const rewardQuantity = rewardsByIDAndCount[key as keyof ProjectRewardFragment]
      if (rewardQuantity && rewardQuantity > 0) {
        orderItemInputs.push({
          itemId: toInt(key),
          itemType: OrderItemType.ProjectReward,
          quantity: rewardQuantity,
        })
      }
    })
  }

  if (subscription && subscription.cost) {
    orderItemInputs.push({
      itemId: toInt(subscription.subscriptionId),
      itemType: OrderItemType.ProjectSubscriptionPlan,
      quantity: 1,
    })
  }

  const geyserTotalTipAmount = guardianBadgesCosts.sats ? geyserTip.sats + guardianBadgesCosts.sats : geyserTip.sats
  const geyserTipPercentage = guardianBadgesCosts.sats
    ? (geyserTotalTipAmount * 100) / (donationAmount + rewardsCosts.sats + shippingCosts.sats)
    : geyserTipPercent > 0
    ? geyserTipPercent
    : undefined

  const input: ContributionCreateInput = {
    refundable: false,
    projectId: toInt(fundingProject?.id),
    projectGoalId,
    anonymous,
    donationAmount: toInt(donationAmount),
    geyserTipPercentage,
    referrerHeroId,
    metadataInput: {
      ...(email && { email }),
      ...(media && { media }),
      ...(comment && { comment }),
      ...(privateComment && { privateComment }),
      ...(followProject && { followProject }),
      ...(subscribeToGeyserEmails && { subscribeToGeyserEmails }),
      ...(guardianBadges.length > 0 && { guardianBadges }),
    },
    orderInput: {
      bitcoinQuote: {
        quote: usdRate,
        quoteCurrency: QuoteCurrency.Usd,
      },
      shippingAddressId: shippingAddress?.id,
      items: orderItemInputs,
    },
    sourceResourceInput: {
      resourceId: sourceResource.resourceId ? `${sourceResource.resourceId}` : `${fundingProject?.id}`,
      resourceType: sourceResource.resourceType || FundingResourceType.Project,
    },
    paymentsInput,
  }

  return input
}

/** Formatted Funding Input data, for Fund Mutation */
export const formattedFundingInputAtom = atom((get) => {
  const formState = get(fundingFormStateAtom)
  const fundingProject = get(fundingProjectAtom)
  const shippingAddress = get(shippingAddressAtom)
  const hasSelectedRewards = get(fundingFormHasRewardsAtom)
  const user = get(authUserAtom)
  const usdRate = get(usdRateAtom)
  const projectGoalId = get(selectedGoalIdAtom)
  const sourceResource = get(sourceResourceAtom)
  const referrerHeroId = get(referrerHeroIdAtom)
  const rewardsCosts = get(rewardsCostAtoms)
  const geyserTip = get(tipAtoms)
  const guardianBadgesCosts = get(guardianBadgesCostAtoms)
  const shippingCosts = get(shippingCostAtom)

  const paymentsInput = get(paymentsInputAtom)

  return buildContributionCreateInput({
    formState,
    fundingProject,
    shippingAddress,
    hasSelectedRewards: hasSelectedRewards || false,
    user,
    usdRate,
    projectGoalId,
    sourceResource,
    referrerHeroId,
    rewardsCosts,
    geyserTip,
    guardianBadgesCosts,
    shippingCosts,
    paymentsInput,
  })
})

/** Funding Input after request */
export const fundingInputAfterRequestAtom = atom<
  | (ContributionCreateInput & { user: UserMeFragment; lightningPreImageHex?: string; onChainPreImageHex?: string })
  | null
>(null)

export const setFundingInputAfterRequestAtom = atom(
  null,
  (get, set, input: ContributionCreateInput & { lightningPreImageHex?: string; onChainPreImageHex?: string }) => {
    const user = get(authUserAtom)
    set(fundingInputAfterRequestAtom, { ...input, user })
  },
)

export const contributionCreatePreImagesAtom = atom<{
  lightning?: { preimageHex: string; preimageHash: string }
  onChain?: { preimageHex: string; preimageHash: string }
}>({})

export const contributionAddPaymentPreImagesAtom = atom<{
  lightning?: { preimageHex: string; preimageHash: string }
}>({})

/** Reset funding input after request */
export const resetFundingInputAfterRequestAtom = atom(null, (_, set) => {
  set(fundingInputAfterRequestAtom, null)
  set(contributionCreatePreImagesAtom, {
    lightning: { preimageHex: '', preimageHash: '' },
    onChain: { preimageHex: '', preimageHash: '' },
  })
  set(contributionAddPaymentPreImagesAtom, {
    lightning: { preimageHex: '', preimageHash: '' },
  })
})

/** Payments input for fiat-only contribution creation */
export const fiatOnlyPaymentsInputAtom = atom<ContributionPaymentsInput>((get) => {
  const fundingProject = get(fundingProjectAtom)

  if (fundingProject.fundingStrategy !== ProjectFundingStrategy.TakeItAll) {
    return {}
  }

  return {
    fiat: {
      create: true,
      stripe: {
        returnUrl: `${window.location.origin}/project/${fundingProject?.name}/funding/success`,
        theme: getStripeEmbeddedTheme(),
      },
    },
  }
})

const paymentsInputAtom = atom<ContributionPaymentsInput>((get) => {
  const fundingProject = get(fundingProjectAtom)
  const userAccountKeys = get(userAccountKeysAtom)
  const intendedPaymentMethod = get(intendedPaymentMethodAtom)

  const paymentsInput: ContributionPaymentsInput = {}

  const claimPublicKey = userAccountKeys?.rskKeyPair?.publicKey || ''
  const claimAddress = userAccountKeys?.rskKeyPair?.address || ''
  const usePrism = isPrismEnabled(fundingProject)
  const shouldIncludeFiat = intendedPaymentMethod === PaymentMethods.fiatSwap

  if (fundingProject.fundingStrategy === ProjectFundingStrategy.TakeItAll) {
    if (shouldIncludeFiat) {
      paymentsInput.fiat = {
        create: true,
        stripe: {
          returnUrl: `${window.location.origin}/project/${fundingProject?.name}/funding/success`,
          theme: getStripeEmbeddedTheme(),
        },
      }
    }

    if (usePrism) {
      paymentsInput.lightningToRskSwap = {
        create: true,
        boltz: {
          claimPublicKey,
          claimAddress,
          preimageHash: '',
        },
      }

      paymentsInput.onChainToRskSwap = {
        create: true,
        boltz: {
          claimPublicKey,
          claimAddress,
          preimageHash: '',
        },
      }
    } else {
      paymentsInput.lightning = {
        create: true,
        zapRequest: null,
      }
      paymentsInput.onChainSwap = {
        create: true,
        boltz: {
          swapPublicKey: claimPublicKey,
        },
      }
    }
  }

  if (fundingProject.fundingStrategy === ProjectFundingStrategy.AllOrNothing) {
    paymentsInput.lightningToRskSwap = {
      create: true,
      boltz: {
        claimPublicKey,
        claimAddress,
        preimageHash: '',
      },
    }

    paymentsInput.onChainToRskSwap = {
      create: true,
      boltz: {
        claimPublicKey,
        claimAddress,
        preimageHash: '',
      },
    }
  }

  return paymentsInput
})
