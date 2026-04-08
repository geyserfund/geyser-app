import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { recurringFundingModes } from '@/modules/project/recurring/graphql'
import { getPath } from '@/shared/constants'
import { toInt } from '@/utils'

export const useSubscriptionBuy = () => {
  const { setState, updateSubscription, project } = useFundingFormAtom()

  const navigate = useNavigate()

  const addSubscriptionAction = useCallback(
    (id: string, onCompleted?: Function) => {
      setState('fundingMode', recurringFundingModes.membership)
      updateSubscription({ id: toInt(id) })
      if (onCompleted) {
        onCompleted()
      }
    },
    [setState, updateSubscription],
  )

  /** Adds subscription to the funding basket */
  const addSubscriptionToBasket = useCallback(
    (id: string) => {
      addSubscriptionAction(id)
    },
    [addSubscriptionAction],
  )

  /** Adds subscription to basket and redirects to funding flow */
  const buySubscription = useCallback(
    (id: string) => {
      addSubscriptionAction(id, () => {
        if (project?.name) {
          navigate({
            pathname: getPath('projectFunding', project?.name),
            search: `?mode=membership&planId=${id}`,
          })
        }
      })
    },
    [addSubscriptionAction, navigate, project?.name],
  )

  return { buySubscription, addSubscriptionToBasket }
}
