import { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { AuthContext } from '../context'
import { useBTCConverter } from '../helpers'
import { IRewardCount } from '../interfaces'
import {
  ProjectReward,
  RewardCurrency,
  ShippingDestination,
} from '../types/generated/graphql'
import { Satoshis } from '../types/types'

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
}

type UseFundStateProps = {
  rewards?: ProjectReward[]
}

export type UpdateReward = (_: IRewardCount) => void

export interface IFundFormState {
  state: IFundForm

  setTarget: (event: any) => void

  setState: (name: string, value: any) => void
  updateReward: UpdateReward
  resetForm: () => void
}

export const useFundingFormState = ({ rewards }: UseFundStateProps) => {
  const { user } = useContext(AuthContext)
  const { getUSDCentsAmount } = useBTCConverter()

  const initialState: IFundForm = useMemo(
    () => ({
      donationAmount: 0,
      rewardsCost: 0,
      comment: '',
      shippingDestination: ShippingDestination.National,
      shippingCost: 0,
      anonymous: !(user && user.id), // The default user has id 0
      funderAvatarURL: user.imageUrl || '',
      funderUsername: user.username,
      email: '',
      media: '',
      rewardsByIDAndCount: undefined,
      rewardCurrency: RewardCurrency.Usdcent,
    }),
    [user],
  )

  const [state, _setState] = useState<IFundForm>(initialState)

  const setTarget = useCallback(
    (event: any) => {
      const { name, value } = event.target
      const newState = { ...state, [name]: value }
      _setState(newState)
    },
    [state],
  )

  const setState = useCallback((name: string, value: any) => {
    _setState((current) => ({ ...current, [name]: value }))
  }, [])

  useEffect(() => {
    if (!user || !user.id) {
      setState('anonymous', true)
    } else {
      setState('anonymous', false)
    }
  }, [setState, user])

  const updateReward = useCallback(
    ({ id, count }: IRewardCount) => {
      const newRewardsCountInfo = { ...state.rewardsByIDAndCount }

      if (count !== 0) {
        newRewardsCountInfo[id as unknown as keyof ProjectReward] = count
      } else if (count === 0) {
        delete newRewardsCountInfo[id as unknown as keyof ProjectReward]
      }

      let rewardsCost = 0

      if (rewards) {
        Object.keys(newRewardsCountInfo).forEach((rewardID: string) => {
          const id = parseInt(rewardID, 10)

          const reward = rewards.find(
            (reward: ProjectReward) =>
              reward.id === id || `${reward.id}` === rewardID,
          )

          if (reward && reward.id) {
            const rewardMultiplier =
              newRewardsCountInfo[rewardID as keyof ProjectReward]
            if (!rewardMultiplier) {
              return 0
            }

            const cost =
              state.rewardCurrency === RewardCurrency.Usdcent
                ? reward.cost
                : // Assume sats if not USD cents
                  getUSDCentsAmount(reward.cost as Satoshis)

            rewardsCost += cost * rewardMultiplier
          }
        })
      }

      _setState((current) => ({
        ...current,
        rewardsByIDAndCount: newRewardsCountInfo,
        rewardsCost,
        totalAmount: rewardsCost + state.donationAmount,
      }))
    },
    [
      getUSDCentsAmount,
      rewards,
      state.donationAmount,
      state.rewardCurrency,
      state.rewardsByIDAndCount,
    ],
  )

  const resetForm = useCallback(() => {
    _setState(initialState)
  }, [initialState])

  return { state, setTarget, setState, updateReward, resetForm }
}
