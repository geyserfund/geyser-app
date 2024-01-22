import { Button, HStack, Stack, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useCallback, useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { PiWarningCircleFill } from 'react-icons/pi'

import { Body2 } from '../../../../../../../components/typography'
import {
  AnonymousAvatar,
  LinkableAvatar,
} from '../../../../../../../components/ui'
import { useCustomTheme } from '../../../../../../../utils'
import { ShippingStatusSelect } from '../../components/ShippingStatusSelect'
import {
  TableData,
  TableWithAccordion,
} from '../../components/TableWithAccordion'
import { Item } from './PaymentsAndAccoutningList'

export enum RewardStatus {
  todo = 'todo',
  shipped = 'shipped',
  delivered = 'delivered',
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

export const PaymentsAndAccountingTable = ({ data }: { data: Item[] }) => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()

  const tableData: TableData<Item>[] = useMemo(
    () => [
      {
        header: t('Contributor'),
        key: 'name',
        render(val: Item) {
          const isFunderAnonymous = !val.funder
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
              avatarUsername={val.funder.name || ''}
              userProfileID={val.funder.name}
              imageSrc={val.funder.imageUrl || ''}
            />
          )
        },
        colSpan: 2,
        isMobile: true,
      },
      {
        header: t('Email'),
        key: 'email',
        colSpan: 2,
      },
      {
        header: t('Date'),
        key: 'paidAt',
        value(val: Item) {
          return DateTime.fromMillis(val.paidAt).toFormat('LLL dd, yyyy')
        },
        colSpan: 2,
        isMobile: true,
      },
      {
        header: t('Reference codes'),
        key: 'reference',
        colSpan: 2,
      },
      {
        header: t('Amount'),
        key: 'amount',
        colSpan: 1,
      },
      {
        header: '',
        key: 'dropdown',
        colSpan: 1,
        isMobile: true,
      },
    ],
    [t],
  )

  const accordionContent = (item: Item) => {
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
            {item.rewards.map((reward) => {
              return (
                <HStack key={reward.id}>
                  <Body2 semiBold color="neutral.900">
                    {reward.quantity}x
                  </Body2>
                  <Body2 semiBold color="neutral.900">
                    {reward.name}
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
            <Body2 color="neutral.700">{t('Rewards')}:</Body2>
            <Body2 color="neutral.700">{t('Rewards (Sats)')}:</Body2>
          </VStack>
          <VStack spacing="5px">
            <Body2 semiBold color="neutral.900">
              {item.rewards.reduce((acc, reward) => acc + reward.price, 0)}
            </Body2>
            <Body2 semiBold color="neutral.900">
              {item.rewards.reduce((acc, reward) => acc + reward.price, 0)}
            </Body2>
          </VStack>
        </HStack>
        <HStack
          w={{ base: 'full', lg: 'auto' }}
          justifyContent="space-between"
          spacing="10px"
        >
          <VStack alignItems="flex-start" spacing="5px">
            <Body2 color="neutral.700">{t('Donation')}:</Body2>
            <Body2 color="neutral.700">{t('Donation (Sats)')}:</Body2>
          </VStack>
          <VStack spacing="5px">
            <Body2 semiBold color="neutral.900">
              {item.amount}
            </Body2>
            <Body2 semiBold color="neutral.900">
              {item.amount}
            </Body2>
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
              {item.amount}
            </Body2>
            <Body2 semiBold color="neutral.900">
              {item.amount}
            </Body2>
            <Body2 semiBold color="neutral.900">
              {item.amount}
            </Body2>
          </VStack>
        </HStack>
      </Stack>
    )
  }

  return (
    <TableWithAccordion<Item>
      items={data}
      schema={tableData}
      accordionContent={accordionContent}
    />
  )
}
