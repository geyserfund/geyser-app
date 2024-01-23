import { HStack, Stack, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Body2 } from '../../../../../../../components/typography'
import {
  AnonymousAvatar,
  LinkableAvatar,
} from '../../../../../../../components/ui'
import { OrderFragment, UpdatableOrderStatus } from '../../../../../../../types'
import { useCustomTheme } from '../../../../../../../utils'
import { ShippingStatusSelect } from '../../components/ShippingStatusSelect'
import {
  TableData,
  TableWithAccordion,
} from '../../components/TableWithAccordion'

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
  data,
  handlleUpdateOrderStatus,
}: {
  data: OrderFragment[]
  handlleUpdateOrderStatus: (
    orderId: string,
    status: UpdatableOrderStatus,
  ) => void
}) => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()

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
        render(item: OrderFragment) {
          const { backgroundColor, hoverBgColor } = getBackgroundColors(
            item.status as RewardStatus,
          )

          const options =
            item.status === RewardStatus.todo
              ? RewardStatusOptions
              : RewardStatusOptions.slice(1)

          return (
            <>
              <ShippingStatusSelect<any, false>
                isSearchable={false}
                backgroundColor={backgroundColor}
                hoverBgColor={hoverBgColor}
                options={options}
                value={RewardStatusOptions.find(
                  (val) => val.value === item.status,
                )}
                defaultValue={RewardStatusOptions.find(
                  (val) => val.value === item.status,
                )}
                onChange={(option) => {
                  if (option) {
                    handlleUpdateOrderStatus(
                      item.id,
                      option.value as UpdatableOrderStatus,
                    )
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
        render(val: OrderFragment) {
          const isFunderAnonymous = !val.user?.id
          if (isFunderAnonymous) {
            return (
              <AnonymousAvatar
                seed={val.id}
                imageSize={'20px'}
                textColor="neutral.900"
              />
            )
          }

          return (
            <LinkableAvatar
              avatarUsername={val.user?.username || ''}
              userProfileID={val.user?.id}
              imageSrc={val.user?.imageUrl || ''}
            />
          )
        },
        colSpan: 2,
        isMobile: true,
      },
      {
        header: t('Email'),
        key: 'email',
        value(val: OrderFragment) {
          return val.fundingTx.email || ''
        },
        colSpan: 2,
      },
      {
        header: t('Date'),
        key: 'paidAt',
        value(val: OrderFragment) {
          const dateToUse = getOrderDateToDisplay(val)
          if (dateToUse) {
            return DateTime.fromMillis(dateToUse).toFormat('LLL dd, yyyy')
          }

          return 'NAN'
        },
        colSpan: 2,
        isMobile: true,
      },
      {
        header: t('Reference codes'),
        key: 'reference',
        value(val: OrderFragment) {
          return val.fundingTx.uuid || 'NAN'
        },
        colSpan: 2,
      },
      {
        header: '',
        key: 'dropdown',
        colSpan: 1,
        isMobile: true,
      },
    ],
    [t, getBackgroundColors, handlleUpdateOrderStatus],
  )

  const accordionContent = (order: OrderFragment) => {
    const renderTotal = () => {
      if (order.fundingTx.bitcoinQuote?.quote) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const total = order.totalInSats / order.fundingTx.bitcoinQuote?.quote
        if (total > 1) {
          return `$${total.toFixed(2)}`
        }

        return '< $1'
      }

      return 'NAN'
    }

    return (
      <Stack
        w="full"
        direction={{ base: 'column', lg: 'row' }}
        justifyContent="flex-end"
        alignItems="flex-start"
        spacing="20px"
      >
        <HStack
          w={{ base: 'full', lg: 'auto' }}
          alignItems="flex-start"
          justifyContent="space-between"
          spacing="10px"
        >
          <Body2 color="neutral.700">{t('Items')}:</Body2>
          <VStack spacing="5px">
            {order.items.map((orderItem) => {
              return (
                <HStack key={orderItem.item.id}>
                  <Body2 semiBold color="neutral.900">
                    {orderItem.quantity}x
                  </Body2>
                  <Body2 semiBold color="neutral.900">
                    {orderItem.item.name}
                  </Body2>
                </HStack>
              )
            })}
          </VStack>
        </HStack>
        <HStack
          w={{ base: 'full', lg: 'auto' }}
          justifyContent="space-between"
          spacing="10px"
        >
          <VStack alignItems="flex-start" spacing="5px">
            <Body2 color="neutral.700">{t('Total')}:</Body2>
            <Body2 color="neutral.700">{t('Total (Sats)')}:</Body2>
            <Body2 color="neutral.700">{t('Bitcoin Price')}:</Body2>
          </VStack>
          <VStack spacing="5px">
            <Body2 semiBold color="neutral.900">
              {renderTotal()}
            </Body2>
            <Body2 semiBold color="neutral.900">
              {order.totalInSats}
            </Body2>
            <Body2 semiBold color="neutral.900">
              ${order.fundingTx.bitcoinQuote?.quote}
            </Body2>
          </VStack>
        </HStack>
      </Stack>
    )
  }

  return (
    <TableWithAccordion<OrderFragment>
      items={data}
      schema={tableData}
      accordionContent={accordionContent}
    />
  )
}

export const getOrderDateToDisplay = (order: OrderFragment) => {
  switch (order.status) {
    case RewardStatus.todo:
      return order.confirmedAt
    case RewardStatus.shipped:
      return order.shippedAt
    case RewardStatus.delivered:
      return order.deliveredAt
    default:
      return order.createdAt
  }
}
