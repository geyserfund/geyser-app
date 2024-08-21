import { Divider, Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useUserProfileAtom, useViewingOwnProfileAtomValue } from '@/modules/profile/state'
import { Body } from '@/shared/components/typography'
import { NoContributionImageUrl } from '@/shared/constants'
import { useNotification } from '@/utils'

import { ProfileOrderFragment, useUserProfileOrdersQuery } from '../../../../../../../types'
import { ProfileOrderCard } from '../components/ProfileOrderCard'
import { TabPanelSkeleton } from '../components/TabPanelSkeleton'

export const ProfilePurchases = () => {
  const { t } = useTranslation()

  const toast = useNotification()
  const isViewingOwnProfile = useViewingOwnProfileAtomValue()

  const { userProfile } = useUserProfileAtom()

  const { loading, data } = useUserProfileOrdersQuery({
    variables: {
      where: {
        id: userProfile.id,
      },
    },
    skip: !userProfile.id || !isViewingOwnProfile,

    onError(error) {
      toast.error({
        title: 'Failed to fetch purchases',
        description: `${error.message}`,
      })
    },
  })

  const orders = (data?.user.orders || []) as ProfileOrderFragment[]

  if (loading) {
    return <TabPanelSkeleton />
  }

  return (
    <>
      <VStack w="full" spacing={4}>
        {orders.map((order, index) => {
          return (
            <>
              <ProfileOrderCard key={order.id} order={order} />

              {index < orders.length - 1 && <Divider />}
            </>
          )
        })}
      </VStack>

      {orders.length === 0 && (
        <VStack w="full" p="20px" spacing="20px">
          <Image height="200px" src={NoContributionImageUrl} />
          <Body medium light>
            {t('No Purchases made yet')}
          </Body>
        </VStack>
      )}
    </>
  )
}
