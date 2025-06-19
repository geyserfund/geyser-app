import { Divider, Image, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ScrollInvoke } from '@/helpers'
import { useUserProfileAtom, useViewingOwnProfileAtomValue } from '@/modules/profile/state'
import { userOrdersAtom } from '@/modules/profile/state/ordersAtom'
import { Body, H1 } from '@/shared/components/typography'
import { ID, NoContributionImageUrl } from '@/shared/constants'
import { usePaginationAtomHook } from '@/shared/hooks/utils/usePaginationAtomHook'
import { useMobileMode, useNotification } from '@/utils'

import { ProfileOrderFragment, useUserOrdersGetQuery } from '../../../../../../../types'
import { ProfileOrderCard } from '../components/ProfileOrderCard'
import { TabPanelSkeleton } from '../components/TabPanelSkeleton'

const MAXIMUM_ORDER_ITEMS = 5

export const ProfilePurchases = () => {
  const { t } = useTranslation()

  const isMobile = useMobileMode()

  const toast = useNotification()
  const isViewingOwnProfile = useViewingOwnProfileAtomValue()

  const { userProfile } = useUserProfileAtom()

  const [userOrders, setUserOrders] = useAtom(userOrdersAtom)

  const [isLoading, setIsLoading] = useState(true)

  const { fetchMore } = useUserOrdersGetQuery({
    variables: {
      input: {
        where: {
          userId: userProfile.id,
        },
        pagination: {
          take: MAXIMUM_ORDER_ITEMS,
        },
      },
    },
    skip: !userProfile.id || !isViewingOwnProfile,

    onCompleted(data) {
      handleDataUpdate(data.ordersGet?.orders || [])
      setIsLoading(false)
    },
    onError(error) {
      setIsLoading(false)
      toast.error({
        title: 'Failed to fetch purchases',
        description: `${error.message}`,
      })
    },
  })

  const { handleDataUpdate, isLoadingMore, noMoreItems, fetchNext } = usePaginationAtomHook<ProfileOrderFragment>({
    fetchMore,
    queryName: ['ordersGet', 'orders'],
    itemLimit: MAXIMUM_ORDER_ITEMS,
    where: {
      userId: userProfile.id,
    },
    setData: setUserOrders,
  })

  if (isLoading) {
    return <TabPanelSkeleton />
  }

  return (
    <>
      <VStack w="full" spacing={4} alignItems="start">
        <H1 size="2xl" bold display={{ base: 'unset', lg: 'none' }}>
          {t('Purchases')}
        </H1>
        {userOrders.length > 0 ? (
          userOrders.map((order, index) => {
            return (
              <>
                <ProfileOrderCard key={order.id} order={order} />

                {index < userOrders.length - 1 && <Divider />}
                <ScrollInvoke
                  elementId={!isMobile ? ID.profile.tabScrollContainer : undefined}
                  onScrollEnd={fetchNext}
                  isLoading={isLoadingMore}
                  noMoreItems={noMoreItems}
                />
              </>
            )
          })
        ) : (
          <VStack w="full" pt={10}>
            <Image height="200px" src={NoContributionImageUrl} alt={'No purchases image'} />
            <Body medium light>
              {t('No Purchases made yet')}
            </Body>
          </VStack>
        )}
      </VStack>
    </>
  )
}
