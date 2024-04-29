import { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { AuthContext } from '../context'
import { IRewardCount } from '../interfaces'
import {
  ProjectRewardForCreateUpdateFragment,
  RewardCurrency,
  ShippingDestination,
  WalletContributionLimits,
} from '../types/generated/graphql'
import { commaFormatted } from '../utils'
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
  const [amountError, setAmountError] = useState('')

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

  useEffect(() => {
    if (debouncedTotalAmount && walletLimits) {
      const { max, min, onChain, offChain } = walletLimits

      if (!debouncedTotalAmount) {
        setAmountWarning('')
        setAmountError('')
        return
      }

      if ((max && debouncedTotalAmount > max) || (offChain?.max && debouncedTotalAmount > offChain.max)) {
        setAmountError(`amount exceeds wallet max: ${commaFormatted(max)} sats`)
        setAmountWarning('')
        return
      }

      if ((min && debouncedTotalAmount < min) || (offChain?.min && debouncedTotalAmount < offChain.min)) {
        setAmountError(`amount is lower than wallet min: ${commaFormatted(min)} sats`)
        setAmountWarning('')
        return
      }

      if (onChain?.max && debouncedTotalAmount > onChain.max) {
        setAmountWarning(
          `can be funded via. Lightning invoice only. amount exceeds onChain max: ${commaFormatted(onChain.max)} sats`,
        )
        setAmountError('')
        return
      }

      if (onChain?.min && debouncedTotalAmount < onChain.min) {
        setAmountWarning(
          `can be funded via. Lightning invoice only. amount is lower than onChain min: ${commaFormatted(
            onChain.min,
          )} sats`,
        )
        setAmountError('')
        return
      }

      setAmountWarning('')
      setAmountError('')
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
    amountError,
  }
}
