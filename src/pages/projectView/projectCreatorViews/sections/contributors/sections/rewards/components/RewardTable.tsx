import { HStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Body2 } from '../../../../../../../../components/typography'
import { AnonymousAvatar, LinkableAvatar } from '../../../../../../../../components/ui'
import {
  OrderByDirection,
  OrderFragment,
  OrdersGetOrderByField,
  OrdersGetOrderByInput,
  UpdatableOrderStatus,
} from '../../../../../../../../types'
import { useCustomTheme } from '../../../../../../../../utils'
import { OrderAmounts, OrderItems } from '../../../components'
import { TableData, TableWithAccordion } from '../../../components/TableWithAccordion'
import { ShippingStatusSelect } from './ShippingStatusSelect'

export enum RewardStatus {
  todo = 'CONFIRMED',
  shipped = 'SHIPPED',
  delivered = 'DELIVERED',
}

type RewardStatusOption = {
  label: string
  value: RewardStatus
}

const RewardStatusOptions: RewardStatusOption[] = [
  {
    label: 'Todo',
    value: RewardStatus.todo,
  },
  {
    label: 'Shipped',
    value: RewardStatus.shipped,
  },
  {
    label: 'Delivered',
    value: RewardStatus.delivered,
  },
]

export const RewardTable = ({
  status,
  data,
  updateOrderStatus,
  orderBy,
  setOrderBy,
}: {
  status: RewardStatus
  data: OrderFragment[]
  updateOrderStatus: (orderId: string, status: UpdatableOrderStatus) => void
  orderBy: OrdersGetOrderByInput[]
  setOrderBy: Dispatch<SetStateAction<OrdersGetOrderByInput[]>>
}) => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()

  const sortField = useMemo(() => {
    switch (status) {
      case RewardStatus.shipped:
        return OrdersGetOrderByField.ShippedAt
      case RewardStatus.delivered:
        return OrdersGetOrderByField.DeliveredAt
      default:
        return OrdersGetOrderByField.ConfirmedAt
    }
  }, [status])

  const getBackgroundColors = useCallback(
    (value: RewardStatus) => {
      switch (value) {
        case RewardStatus.todo:
          return {
            backgroundColor: colors.neutral[200],
            hoverBgColor: colors.neutral[400],
          }
        case RewardStatus.shipped:
          return {
            backgroundColor: colors.nostr[100],
            hoverBgColor: colors.nostr[300],
          }
        case RewardStatus.delivered:
          return {
            backgroundColor: colors.brand[100],
            hoverBgColor: colors.brand[300],
          }
        default:
          return {
            backgroundColor: colors.neutral[200],
            hoverBgColor: colors.neutral[400],
          }
      }
    },
    [colors],
  )

  const tableData: TableData<OrderFragment>[] = useMemo(
    () => [
      {
        header: t('Status'),
        key: 'status',
        render(order: OrderFragment) {
          const { backgroundColor, hoverBgColor } = getBackgroundColors(order.status as RewardStatus)

          const options = order.status === RewardStatus.todo ? RewardStatusOptions : RewardStatusOptions.slice(1)

          return (
            <>
              <ShippingStatusSelect<any, false>
                isSearchable={false}
                backgroundColor={backgroundColor}
                hoverBgColor={hoverBgColor}
                options={options}
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
        colSpan: 2,
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
        colSpan: 2,
        isMobile: true,
      },
      {
        header: t('Email'),
        key: 'email',
        value(order: OrderFragment) {
          return order.fundingTx.email || ''
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
        header: 'Rewards',
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
              <Body2 color="neutral.700">{t('Reference code')}:</Body2>
              <Body2 semiBold color="neutral.900">
                {order.fundingTx.uuid}
              </Body2>
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
          return <OrderAmounts amount={order.totalInSats} quote={order.fundingTx.bitcoinQuote?.quote} />
        },
      },
    ],
    [t, getBackgroundColors, updateOrderStatus, orderBy, setOrderBy, sortField],
  )

  return <TableWithAccordion<OrderFragment> items={data} schema={tableData} />
}
