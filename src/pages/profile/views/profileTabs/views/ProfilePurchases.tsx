import { useTranslation } from 'react-i18next'

import { ProfileOrderFragment } from '../../../../../types'
import { ProfileTabLayout } from '../../../components'
import { ProfileOrderCard } from '../components/ProfileOrderCard'
import { TabPanelSkeleton } from '../components/TabPanelSkeleton'

interface ProfileFollowedProps {
  orders: ProfileOrderFragment[]
  isLoading: boolean
}

export const ProfilePurchases = ({ orders, isLoading }: ProfileFollowedProps) => {
  const { t } = useTranslation()

  if (isLoading) {
    return <TabPanelSkeleton />
  }

  return (
    <ProfileTabLayout heading={t('Purchases')}>
      {orders.map((order) => {
        return <ProfileOrderCard key={order.id} order={order} />
      })}
    </ProfileTabLayout>
  )
}
