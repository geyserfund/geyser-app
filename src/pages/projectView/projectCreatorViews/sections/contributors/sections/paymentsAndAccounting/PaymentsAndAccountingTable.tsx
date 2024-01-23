/* eslint-disable no-unsafe-optional-chaining */
import { HStack, Stack, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Body2 } from '../../../../../../../components/typography'
import {
  AnonymousAvatar,
  LinkableAvatar,
} from '../../../../../../../components/ui'
import { FundingTxOrderFragment } from '../../../../../../../types'
import {
  TableData,
  TableWithAccordion,
} from '../../components/TableWithAccordion'

export const PaymentsAndAccountingTable = ({
  data,
}: {
  data: FundingTxOrderFragment[]
}) => {
  const { t } = useTranslation()

  const tableData: TableData<FundingTxOrderFragment>[] = useMemo(
    () => [
      {
        header: t('Contributor'),
        key: 'name',
        render(val: FundingTxOrderFragment) {
          const isFunderAnonymous = !val.funder.user?.id
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
              avatarUsername={val.funder.user?.username || ''}
              userProfileID={val.funder.user?.id}
              imageSrc={val.funder.user?.imageUrl || ''}
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
        value(val: FundingTxOrderFragment) {
          return DateTime.fromMillis(val.paidAt).toFormat('LLL dd, yyyy')
        },
        colSpan: 2,
        isMobile: true,
      },
      {
        header: t('Reference'),
        key: 'uuid',
        colSpan: 2,
      },
      {
        header: t('Amount'),
        key: 'amount',
        value(val: FundingTxOrderFragment) {
          return `${val.amount} Sats`
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
    [t],
  )

  const accordionContent = (item: FundingTxOrderFragment) => {
    const getUSD = (sats: number) => {
      if (!item.bitcoinQuote?.quote) return 'NAN'
      const total = sats / item.bitcoinQuote?.quote
      if (total > 1) {
        return `$${total.toFixed(2)}`
      }

      return '< $1'
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
            {item.order?.items.map((orderItem) => {
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
          <VStack alignItems="flex-start" spacing="5px">
            <Body2 semiBold color="neutral.900">
              {getUSD(item.amount)}
            </Body2>
            <Body2 semiBold color="neutral.900">
              {item.amount}
            </Body2>
            <Body2 semiBold color="neutral.900">
              ${item.bitcoinQuote?.quote}
            </Body2>
          </VStack>
        </HStack>
      </Stack>
    )
  }

  return (
    <TableWithAccordion<FundingTxOrderFragment>
      items={data}
      schema={tableData}
      accordionContent={accordionContent}
    />
  )
}
