import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { getPath } from '@/shared/constants'
import { toInt } from '@/utils'

export const useSubscriptionBuy = () => {
  const { updateSubscription, project } = useFundingFormAtom()

  const navigate = useNavigate()

  const addSubscriptionAction = useCallback(
    (id: string, onCompleted?: Function) => {
      updateSubscription({ id: toInt(id) })
      if (onCompleted) {
        onCompleted()
      }
    },
    [updateSubscription],
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
            search: `?isSub=true`,
          })
        }
      })
    },
    [addSubscriptionAction, navigate, project?.name],
  )

  return { buySubscription, addSubscriptionToBasket }
}
