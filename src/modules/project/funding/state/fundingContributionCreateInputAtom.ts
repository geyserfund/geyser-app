import { atom } from 'jotai'

import { authUserAtom } from '@/modules/auth/state/authAtom.ts'
import { usdRateAtom } from '@/shared/state/btcRateAtom'
import { referrerHeroIdAtom } from '@/shared/state/referralAtom.ts'
import {
  ContributionCreateInput,
  ContributionPaymentsInput,
  FundingResourceType,
  OrderItemInput,
  OrderItemType,
  ProjectRewardFragment,
  QuoteCurrency,
  UserMeFragment,
} from '@/types/generated/graphql'
import { toInt } from '@/utils'

import { sourceResourceAtom } from '../../pages1/projectView/state/sourceActivityAtom.ts'
import { fundingProjectAtom } from './fundingFormAtom'
import { fundingFormHasRewardsAtom, fundingFormStateAtom } from './fundingFormAtom'
import { selectedGoalIdAtom } from './selectedGoalAtom'
import { shippingAddressAtom } from './shippingAddressAtom.ts'

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

  const paymentsInput: ContributionPaymentsInput = {
    fiat: {
      create: true,
      stripe: {
        returnUrl: `${window.location.origin}/project/${fundingProject?.name}/funding/success`,
      },
    },
    lightning: {
      create: true,
      zapRequest: null,
    },
    onChainSwap: {
      create: true,
      boltz: {
        swapPublicKey: '',
      },
    },
  }

  const input: ContributionCreateInput = {
    refundable: true,
    projectId: toInt(fundingProject?.id),
    projectGoalId,
    anonymous,
    donationAmount: toInt(donationAmount),
    geyserTipPercentage: geyserTipPercent > 0 ? geyserTipPercent : undefined,
    referrerHeroId,
    metadataInput: {
      ...(email && { email }),
      ...(media && { media }),
      ...(comment && { comment }),
      ...(privateComment && { privateComment }),
      ...(followProject && { followProject }),
      ...(subscribeToGeyserEmails && { subscribeToGeyserEmails }),
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
})

/** Funding Input after request */
export const fundingInputAfterRequestAtom = atom<(ContributionCreateInput & { user: UserMeFragment }) | null>(null)

export const setFundingInputAfterRequestAtom = atom(null, (get, set, input: ContributionCreateInput) => {
  const user = get(authUserAtom)
  set(fundingInputAfterRequestAtom, { ...input, user })
})

/** Reset funding input after request */
export const resetFundingInputAfterRequestAtom = atom(null, (_, set) => {
  set(fundingInputAfterRequestAtom, null)
})
