import { useMemo, useState } from 'react'

import { ProfileOrderFragment, useUserProfileOrdersQuery } from '../../../../../../../types'
import { useNotification } from '../../../../../../../utils'
import { ProfilePurchases } from '../views/ProfilePurchases'

export const useProfileOrders = (userId: number, enable: boolean) => {
  const { toast } = useNotification()

  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<ProfileOrderFragment[]>([])

  useUserProfileOrdersQuery({
    variables: {
      where: {
        id: userId,
      },
    },
    skip: !userId || !enable,
    onCompleted(data) {
      if (data.user.orders) {
        setOrders(data.user.orders)
      }

      setIsLoading(false)
      console.log('chekcing data', data)
    },
    onError(error) {
      toast({
        status: 'error',
        title: 'Failed to fetch purchases',
        description: `${error.message}`,
      })
      setIsLoading(false)
    },
  })

  const renderComponent = useMemo(() => <ProfilePurchases orders={orders} isLoading={isLoading} />, [orders, isLoading])

  return {
    title: 'Purchases',
    sub: orders.length,
    isLoading,
    renderComponent,
  }
}
