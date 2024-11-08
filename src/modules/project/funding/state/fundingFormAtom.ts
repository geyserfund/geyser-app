import { atom } from 'jotai'

import { authUserAtom } from '@/pages/auth/state'
import { SATOSHIS_IN_BTC } from '@/shared/constants'
import { usdRateAtom } from '@/shared/state/btcRateAtom'
import {
  FundingInput,
  FundingResourceType,
  OrderItemInput,
  OrderItemType,
  ProjectPageWalletFragment,
  ProjectRewardFragment,
  QuoteCurrency,
  RewardCurrency,
  ShippingDestination,
  UserMeFragment,
} from '@/types'
import { centsToDollars, commaFormatted, isProjectAnException, toInt, validateEmail } from '@/utils'

import { projectAffiliateAtom } from '../../pages1/projectView/state/affiliateAtom'
import { ProjectState } from '../../state/projectAtom'
import { getRefIdFromProjectAffiliates } from '../hooks/useProjectAffiliateWithProjectName'
import { fundingTxAtom, selectedGoalIdAtom } from './fundingTxAtom'

export type FundingProject = Pick<ProjectState, 'id' | 'name' | 'rewardCurrency' | 'title' | 'owners'>

export enum FundingUserInfoError {
  EMAIL = 'email',
  PRIVATE_COMMENT = 'privateComment',
}

export type FundingProjectState = FundingProject & {
  wallet?: ProjectPageWalletFragment
  rewards: ProjectRewardFragment[]
}

export type FundFormType = {
  donationAmount: number
  rewardsCost: number
  shippingCost: number
  totalAmount: number
  email: string
  media: string
  comment: string
  privateComment?: string
  rewardsByIDAndCount?: { [key: string]: number } | undefined
  rewardCurrency: RewardCurrency
  needsShipping: boolean
  shippingDestination: ShippingDestination
  resourceId?: number
  resourceType?: FundingResourceType
  followProject: boolean
  subscribeToGeyserEmails: boolean
}

const initialState: FundFormType = {
  donationAmount: 0,
  rewardsCost: 0,
  shippingCost: 0,
  totalAmount: 0,
  comment: '',
  privateComment: '',
  email: '',
  media: '',
  followProject: true,
  subscribeToGeyserEmails: false,
  rewardsByIDAndCount: undefined,
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

/** Set the error state for the funding form */
export const setErrorStateAtom = atom(null, (get, set, { key, value }: { key: keyof FundFormType; value: string }) => {
  set(fundingFormErrorAtom, (current) => ({ ...current, [key]: value }))
})

/** Project that is to be funded via the current funding form */
export const fundingProjectAtom = atom<FundingProjectState>({} as FundingProjectState)

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
      totalAmount: value + current.rewardsCost + current.shippingCost,
    }))
    return
  }

  set(fundingFormStateAtom, (current) => ({
    ...current,
    [name]: value,
  }))
})

/** Set the resource for the funding form */
export const setResourceAtom = atom(
  null,
  (_, set, { resourceId, resourceType }: { resourceId: number; resourceType: FundingResourceType }) => {
    set(fundingFormStateAtom, (current) => ({
      ...current,
      resourceId,
      resourceType,
    }))
  },
)

/* Boolean to check if the funding form has rewards */
export const fundingFormHasRewardsAtom = atom((get) => {
  const fundingFormState = get(fundingFormStateAtom)
  return fundingFormState.rewardsByIDAndCount && Object.keys(fundingFormState.rewardsByIDAndCount).length > 0
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

/** Reset funing form rewards to it's initial value */
export const resetFundingFormRewardsAtom = atom(null, (get, set) => {
  set(fundingFormStateAtom, (current) => ({
    ...current,
    rewardsByIDAndCount: {},
    rewardsCost: 0,
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
            rewardsCostInSatoshi += cost * rewardMultiplier
          } else {
            rewardsCostInSatoshi += Math.round((centsToDollars(cost) / usdRate) * rewardMultiplier * SATOSHIS_IN_BTC)
          }
        }
      })
    }

    return {
      ...current,
      rewardsByIDAndCount: newRewardsCountInfo,
      rewardsCost,
      needsShipping,
      totalAmount: rewardsCostInSatoshi + current.donationAmount + current.shippingCost,
    }
  })

  if (project.rewardCurrency) {
    set(fundingFormStateAtom, (current) => ({
      ...current,
      rewardCurrency: project.rewardCurrency ? project.rewardCurrency : current.rewardCurrency,
    }))
  }
})

/** Check if the  funding Amount is enough for onChain payments */
export const fundingOnchainAmountWarningAtom = atom((get) => {
  const formState = get(fundingFormStateAtom)
  const fundingProjectState = get(fundingProjectAtom)
  const fundingTx = get(fundingTxAtom)

  const { totalAmount } = formState
  const walletLimits = fundingProjectState.wallet?.limits?.contribution

  if (!fundingTx.address) {
    return `Something went wrong with the onChain payment, please try using Lightning or try again`
  }

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

  const hasRewardsThatRequirePrivateComment = get(fundingFormHasRewardsThatRequirePrivateCommentAtom)

  if (hasSelectedRewards && !formState.email) {
    return {
      title: 'Email is required when purchasing a reward.',
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

/** Formatted Funding Input data, for Fund Mutation */
export const formattedFundingInputAtom = atom((get) => {
  const formState = get(fundingFormStateAtom)
  const fundingProject = get(fundingProjectAtom)
  const hasSelectedRewards = get(fundingFormHasRewardsAtom)
  const user = get(authUserAtom)
  const usdRate = get(usdRateAtom)
  const projectGoalId = get(selectedGoalIdAtom)
  const affiliates = get(projectAffiliateAtom)
  const affiliateId = getRefIdFromProjectAffiliates(affiliates, fundingProject?.name)

  const {
    donationAmount,
    rewardsByIDAndCount,
    email,
    comment,
    media,
    privateComment,
    followProject,
    subscribeToGeyserEmails,
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

  const input: FundingInput = {
    projectId: toInt(fundingProject?.id),
    anonymous,
    donationAmount: toInt(donationAmount),
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
      resourceId: formState.resourceId ? toInt(formState.resourceId) : toInt(fundingProject?.id),
      resourceType: formState.resourceType || FundingResourceType.Project,
    },
    projectGoalId,
    affiliateId,
  }

  return input
})

/** Funding Input after request */
export const fundingInputAfterRequestAtom = atom<(FundingInput & { user: UserMeFragment }) | null>(null)

export const setFundingInputAfterRequestAtom = atom(null, (get, set, input: FundingInput) => {
  const user = get(authUserAtom)
  set(fundingInputAfterRequestAtom, { ...input, user })
})

/** Reset Funding Form */
export const resetFundingFormAtom = atom(null, (get, set) => {
  set(fundingFormStateAtom, initialState)
  set(fundingProjectAtom, {} as FundingProjectState)
  set(fundingInputAfterRequestAtom, null)
})
