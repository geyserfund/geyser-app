import { HStack, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { getRewardShippingStatusBackgroundColor } from '@/helpers'
import { Body } from '@/shared/components/typography'

import { AnonymousAvatar, LinkableAvatar } from '../../../../../../../components/ui'
import { RewardStatusOptions } from '../../../../../../../shared/constants'
import {
  OrderByDirection,
  OrderFragment,
  OrdersGetOrderByField,
  OrdersGetOrderByInput,
  OrdersGetStatus,
  UpdatableOrderStatus,
} from '../../../../../../../types'
import { useCustomTheme } from '../../../../../../../utils'
import { TableData, TableWithAccordion } from '../../../common'
import { OrderAmounts, OrderItems } from '../../../components'
import { ShippingStatusSelect } from './ShippingStatusSelect'

export const RewardTable = ({
  status,
  data,
  updateOrderStatus,
  orderBy,
  setOrderBy,
}: {
  status: OrdersGetStatus
  data: OrderFragment[]
  updateOrderStatus: (orderId: string, status: UpdatableOrderStatus) => void
  orderBy: OrdersGetOrderByInput[]
  setOrderBy: Dispatch<SetStateAction<OrdersGetOrderByInput[]>>
}) => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()

  const sortField = useMemo(() => {
    switch (status) {
      case OrdersGetStatus.Shipped:
        return OrdersGetOrderByField.ShippedAt
      case OrdersGetStatus.Delivered:
        return OrdersGetOrderByField.DeliveredAt
      default:
        return OrdersGetOrderByField.ConfirmedAt
    }
  }, [status])

  const tableData: TableData<OrderFragment>[] = useMemo(
    () => [
      {
        header: t('Status'),
        key: 'status',
        render(order: OrderFragment) {
          const { backgroundColor, hoverBgColor } = getRewardShippingStatusBackgroundColor(
            order.status as OrdersGetStatus,
            colors,
          )

          return (
            <>
              <ShippingStatusSelect<any, false>
                isSearchable={false}
                backgroundColor={backgroundColor}
                hoverBgColor={hoverBgColor}
                options={RewardStatusOptions}
                value={RewardStatusOptions.find((val) => val.value === order.status)}
                defaultValue={RewardStatusOptions.find((val) => val.value === order.status)}
                onChange={(option) => {
                  if (option) {
                    updateOrderStatus(order.id, option.value as UpdatableOrderStatus)
                  }
                }}
                menuPortalTarget={document.body}
              />
            </>
          )
        },
        isMobile: true,
        colSpan: 3,
      },
      {
        header: t('Contributor'),
        key: 'name',
        render(order: OrderFragment) {
          const isFunderAnonymous = !order.user?.id
          if (isFunderAnonymous) {
            return <AnonymousAvatar seed={order.id} imageSize={'20px'} textColor="neutral.900" />
          }

          return (
            <LinkableAvatar
              avatarUsername={order.user?.username || ''}
              userProfileID={order.user?.id}
              imageSrc={order.user?.imageUrl || ''}
            />
          )
        },
        colSpan: 3,
        isMobile: true,
      },
      {
        header: t('Email'),
        key: 'email',
        value(order: OrderFragment) {
          return order.contribution?.email || ''
        },
        colSpan: 3,
      },
      {
        header: t('Date'),
        key: 'paidAt',
        sort: {
          order: orderBy.find((o) => o.field === sortField)?.direction || OrderByDirection.Desc,
          updateOrder() {
            setOrderBy((prev) =>
              prev.map((p) => {
                if (p.field === sortField) {
                  if (p.direction === OrderByDirection.Asc) {
                    return {
                      field: sortField,
                      direction: OrderByDirection.Desc,
                    }
                  }

                  return { field: sortField, direction: OrderByDirection.Asc }
                }

                return p
              }),
            )
          },
        },
        value(order: OrderFragment) {
          const dateToUse = order[sortField]
          if (dateToUse) {
            return DateTime.fromMillis(dateToUse).toFormat('LLL dd, yyyy')
          }

          return 'NAN'
        },
        colSpan: 2,
        isMobile: true,
      },

      {
        header: 'Products',
        key: 'rewards',
        render(order: OrderFragment) {
          return <OrderItems orderItems={order.items} noLabel />
        },
        colSpan: 3,
      },
      {
        header: '',
        key: 'dropdown',
        colSpan: 1,
        isMobile: true,
      },
      {
        header: t('Private message'),
        key: 'privateComment',
        render(order: OrderFragment) {
          return (
            <>
              {order.contribution?.privateComment && (
                <VStack alignItems="flex-start" spacing="0px" w="100%">
                  <Body size="xs" medium>
                    {t('Private message')}:
                  </Body>
                  <Body size="xs">{order.contribution?.privateComment}</Body>
                </VStack>
              )}
            </>
          )
        },
        isAccordion: true,
      },
      {
        header: t('Reference code'),
        key: 'reference',
        render(order: OrderFragment) {
          return (
            <HStack
              w={{ base: 'full', lg: 'auto' }}
              alignItems="flex-start"
              justifyContent="space-between"
              spacing="10px"
            >
              <Body size="xs" dark>
                {t('Reference code')}:
              </Body>
              <Body size="xs" medium light>
                {order.contribution.uuid}
              </Body>
            </HStack>
          )
        },
        isAccordion: true,
      },
      {
        header: 'Total',
        key: 'total',
        isAccordion: true,
        render(order: OrderFragment) {
          return <OrderAmounts amount={order.totalInSats} quote={order.contribution.bitcoinQuote?.quote} />
        },
      },
    ],
    [t, updateOrderStatus, orderBy, setOrderBy, sortField, colors],
  )

  return <TableWithAccordion<OrderFragment> items={data} schema={tableData} />
}
