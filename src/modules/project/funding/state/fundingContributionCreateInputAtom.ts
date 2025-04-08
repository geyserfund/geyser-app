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

import { fundingProjectAtom } from './fundingFormAtom'
import { fundingFormHasRewardsAtom, fundingFormStateAtom } from './fundingFormAtom'
import { selectedGoalIdAtom } from './selectedGoalAtom'

/** Formatted Funding Input data, for Fund Mutation */
export const formattedFundingInputAtom = atom((get) => {
  const formState = get(fundingFormStateAtom)
  const fundingProject = get(fundingProjectAtom)
  const hasSelectedRewards = get(fundingFormHasRewardsAtom)
  const user = get(authUserAtom)
  const usdRate = get(usdRateAtom)
  const projectGoalId = get(selectedGoalIdAtom)

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
    projectId: toInt(fundingProject?.id),
    projectGoalId,
    anonymous,
    donationAmount: toInt(donationAmount),
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
      items: orderItemInputs,
    },
    sourceResourceInput: {
      resourceId: formState.resourceId ? `${formState.resourceId}` : `${fundingProject?.id}`,
      resourceType: formState.resourceType || FundingResourceType.Project,
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
