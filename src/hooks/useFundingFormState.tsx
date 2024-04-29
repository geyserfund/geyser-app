import { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { AuthContext } from '../context'
import { useFundCalc } from '../helpers'
import { IRewardCount } from '../interfaces'
import {
  ProjectRewardForCreateUpdateFragment,
  RewardCurrency,
  ShippingDestination,
  WalletContributionLimits,
} from '../types/generated/graphql'
import { commaFormatted, isProjectAnException } from '../utils'
import { useDebounce } from './useDebounce'

export interface IFundForm {
  donationAmount: number
  rewardsCost: number
  comment: string
  anonymous: boolean
  shippingDestination: ShippingDestination
  shippingCost: number
  email: string
  media: string
  funderUsername: string
  funderAvatarURL: string
  rewardsByIDAndCount?: { [key: string]: number } | undefined
  rewardCurrency: RewardCurrency
  totalAmount?: number
  step: 'contribution' | 'info'
}

type UseFundStateProps = {
  rewards?: ProjectRewardForCreateUpdateFragment[]
  rewardCurrency?: RewardCurrency
  walletLimits?: WalletContributionLimits
}

export type UpdateReward = (_: IRewardCount) => void

export interface IFundFormState {
  state: IFundForm
  setTarget: (event: any) => void
  setState: (name: string, value: any) => void
  updateReward: UpdateReward
  resetForm: () => void
}

export type UseFundingFormStateReturn = ReturnType<typeof useFundingFormState>

export const useFundingFormState = ({ rewards, rewardCurrency, walletLimits }: UseFundStateProps) => {
  const { user, isAnonymous } = useContext(AuthContext)

  const [needsShipping, setNeedsShipping] = useState(false)

  const [amountWarning, setAmountWarning] = useState('')

  const initialState: IFundForm = useMemo(
    () => ({
      donationAmount: 0,
      rewardsCost: 0,
      comment: '',
      shippingDestination: ShippingDestination.National,
      shippingCost: 0,
      anonymous: isAnonymous, // The default user has id 0
      funderAvatarURL: user.imageUrl || '',
      funderUsername: user.username,
      email: '',
      media: '',
      rewardsByIDAndCount: undefined,
      rewardCurrency: rewardCurrency || RewardCurrency.Usdcent,
      step: 'contribution',
    }),
    [isAnonymous, user.imageUrl, user.username, rewardCurrency],
  )

  const [state, _setState] = useState<IFundForm>(initialState)
  const debouncedTotalAmount = useDebounce(state.totalAmount, 200)
  const { getTotalAmount } = useFundCalc(state)
  useEffect(() => {
    if (debouncedTotalAmount && walletLimits) {
      const { onChain } = walletLimits

      if (!debouncedTotalAmount) {
        setAmountWarning('')
        return
      }

      if (onChain?.max && debouncedTotalAmount > onChain.max) {
        setAmountWarning(
          `The amount you are trying to send is too high for on-chain payments. Only payments below ${commaFormatted(
            onChain.max,
          )} sats can be sent on-chain.`,
        )
        return
      }

      if (onChain?.min && debouncedTotalAmount < onChain.min) {
        setAmountWarning(
          `The amount you are trying to send is too low for on-chain payments. Only payments over ${commaFormatted(
            onChain.min,
          )} sats can be sent on-chain.`,
        )
      }
    }
  }, [debouncedTotalAmount, walletLimits])

  const setTarget = useCallback((event: any) => {
    const { name, value } = event.target
    _setState((current) => ({ ...current, [name]: value }))
  }, [])

  const setState = useCallback((name: string, value: any) => {
    if (name === 'donationAmount') {
      _setState((current) => ({
        ...current,
        donationAmount: value,
        totalAmount: value + current.rewardsCost + current.shippingCost,
      }))
      return
    }

    _setState((current) => ({
      ...current,
      [name]: value,
    }))
  }, [])

  useEffect(() => {
    if (!user || !user.id) {
      setState('anonymous', true)
    } else {
      setState('anonymous', false)
    }
  }, [setState, user])

  useEffect(() => {
    setState('rewardCurrency', rewardCurrency)
  }, [setState, rewardCurrency])

  const resetRewards = useCallback(() => {
    _setState((current) => ({
      ...current,
      rewardsByIDAndCount: {},
      rewardsCost: 0,
      totalAmount: current.donationAmount,
    }))
    setNeedsShipping(false)
  }, [])

  const updateReward = useCallback(
    ({ id, count }: IRewardCount) => {
      _setState((current) => {
        const newRewardsCountInfo = { ...current.rewardsByIDAndCount }

        if (count !== 0) {
          newRewardsCountInfo[id.toString()] = count
        } else if (count === 0) {
          delete newRewardsCountInfo[id.toString()]
        }

        let rewardsCost = 0

        if (rewards) {
          Object.keys(newRewardsCountInfo).forEach((rewardID: string) => {
            const id = parseInt(rewardID, 10)

            const reward = rewards.find((reward) => reward.id === id || `${reward.id}` === rewardID)

            if (reward && reward.id) {
              if (reward.hasShipping) {
                setNeedsShipping((current) => current || reward.hasShipping)
              }

              const rewardMultiplier = newRewardsCountInfo[rewardID.toString()]
              if (!rewardMultiplier) {
                return 0
              }

              const { cost } = reward
              rewardsCost += cost * rewardMultiplier
            }
          })
        }

        return {
          ...current,
          rewardsByIDAndCount: newRewardsCountInfo,
          rewardsCost,
          totalAmount: rewardsCost + current.donationAmount + current.shippingCost,
        }
      })
    },
    [rewards],
  )

  const resetForm = useCallback(() => {
    _setState(initialState)
    setNeedsShipping(false)
  }, [initialState])

  const hasSelectedRewards = useMemo(
    () => Boolean(state.rewardsByIDAndCount && Object.keys(state.rewardsByIDAndCount).length > 0),
    [state.rewardsByIDAndCount],
  )

  const validateInputAmount = useCallback(
    (name: string) => {
      const isException = isProjectAnException(name)

      if (!isException && walletLimits?.max && getTotalAmount('dollar', name) >= walletLimits.max) {
        return {
          title: `Payment above ${walletLimits.max} is not allowed at the moment.`,
          description: 'Please update the amount, or contact us for donating a higher amount.',
          valid: false,
        }
      }

      if (walletLimits?.min && getTotalAmount('sats', name) < walletLimits.min) {
        return {
          title: 'The payment minimum is 1 satoshi.',
          description: 'Please update the amount.',
          valid: false,
        }
      }

      return { title: '', description: '', valid: true }
    },
    [getTotalAmount, walletLimits],
  )

  return {
    state,
    setTarget,
    setState,
    updateReward,
    resetForm,
    resetRewards,
    needsShipping,
    hasSelectedRewards,
    amountWarning,
    validateInputAmount,
  }
}
