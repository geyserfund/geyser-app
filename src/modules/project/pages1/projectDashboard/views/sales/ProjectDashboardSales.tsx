import { Button, HStack, Link, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiDownloadSimple } from 'react-icons/pi'

import { getAppEndPoint } from '@/config/domain'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { standardPadding } from '@/shared/styles'

import { ProjectRewardsImageUrl } from '../../../../../../shared/constants'
import { OrdersGetStatus } from '../../../../../../types'
import { DashboardLayout } from '../../common'
import { EmptyContainer } from '../../components'
import { RewardByStatus } from './RewardByStatus'
import { useRewardEmptyAtom } from './state/rewardsAtom'

export const ProjectDashboardSales = () => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()
  const isRewardEmpty = useRewardEmptyAtom()

  const apiEndPoint = getAppEndPoint()

  return (
    <DashboardLayout desktopTitle={t('Sales')}>
      {isRewardEmpty ? (
        <EmptyContainer image={ProjectRewardsImageUrl} text={t('No rewards sold yet')} />
      ) : (
        <VStack
          direction={{ base: 'column', lg: 'row' }}
          w="full"
          pb={{ base: 28, lg: 10 }}
          alignItems="flex-start"
          spacing="4"
          marginTop="-46px"
        >
          <HStack w="full" justifyContent={'flex-end'} px={standardPadding}>
            <Button
              as={Link}
              href={`${apiEndPoint}/export/orders/project/${project.id}`}
              isExternal
              variant="outline"
              colorScheme="neutral1"
              rightIcon={<PiDownloadSimple />}
            >
              {t('Export')}
            </Button>
          </HStack>
          <RewardByStatus status={OrdersGetStatus.Confirmed} />
          <RewardByStatus status={OrdersGetStatus.Shipped} />
          <RewardByStatus status={OrdersGetStatus.Delivered} />
        </VStack>
      )}
    </DashboardLayout>
  )
}
