import { HStack, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { Body2 } from '../../../../../../../components/typography'
import {
  AnonymousAvatar,
  LinkableAvatar,
} from '../../../../../../../components/ui'
import {
  FundingConfirmInput,
  FundingTxOrderFragment,
} from '../../../../../../../types'
import { getUSD, OrderAmounts, OrderItems } from '../../components'
import { AccordionListItem } from '../../components/AccordionListItem'
import {
  TableData,
  TableWithAccordion,
} from '../../components/TableWithAccordion'
import { FundingAmountAccept } from './FundindAmountAccept'

export const PendingPaymentsTable = ({
  data,
  handleUpdate,
}: {
  data: FundingTxOrderFragment[]
  handleUpdate: (input: FundingConfirmInput) => Promise<void>
}) => {
  const { t } = useTranslation()

  const tableData: TableData<FundingTxOrderFragment>[] = useMemo(
    () => [
      {
        header: t('Action'),
        key: 'action',
        render(item: FundingTxOrderFragment) {
          return (
            <FundingAmountAccept fundingTx={item} handleUpdate={handleUpdate} />
          )
        },
        isMobile: true,
        colSpan: 2,
      },
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
          if (!val.paidAt) return 'NAN'
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
        header: t('Missing'),
        key: 'missing',
        value(val: FundingTxOrderFragment) {
          return `${val.amount - val.amountPaid} Sats`
        },
        colSpan: 2,
      },
      {
        header: '',
        key: 'dropdown',
        colSpan: 1,
        isMobile: true,
      },
      {
        header: 'Items',
        key: 'items',
        isAccordion: true,
        render(fundingTx: FundingTxOrderFragment) {
          return <OrderItems orderItems={fundingTx.order?.items} />
        },
      },
      {
        header: 'Rewards',
        key: 'rewards',
        isAccordion: true,
        render(fundingTx: FundingTxOrderFragment) {
          const amount = fundingTx.amount - fundingTx.donationAmount
          const items = [
            ...(fundingTx.bitcoinQuote?.quote
              ? [
                  {
                    label: t('Rewards'),
                    value: getUSD(amount, fundingTx.bitcoinQuote?.quote),
                  },
                ]
              : []),
            {
              label: t('Rewards (Sats)'),
              value: amount,
            },
          ]

          return <AccordionListItem items={items} />
        },
      },
      {
        header: 'Donation',
        key: 'donation',
        isAccordion: true,
        render(fundingTx: FundingTxOrderFragment) {
          const items = [
            ...(fundingTx.bitcoinQuote?.quote
              ? [
                  {
                    label: t('Donation'),
                    value: getUSD(
                      fundingTx.donationAmount,
                      fundingTx.bitcoinQuote?.quote,
                    ),
                  },
                ]
              : []),
            {
              label: t('Donation (Sats)'),
              value: fundingTx.donationAmount,
            },
          ]

          return <AccordionListItem items={items} />
        },
      },
      {
        header: 'Total',
        key: 'total',
        isAccordion: true,
        render(fundingTx: FundingTxOrderFragment) {
          return (
            <OrderAmounts
              amount={fundingTx.amount}
              quote={fundingTx.bitcoinQuote?.quote}
            />
          )
        },
      },
    ],
    [t, handleUpdate],
  )

  const accordionContent = (item: FundingTxOrderFragment) => {
    return (
      <HStack w="full" flex={1}>
        <VStack alignItems="flex-start">
          <Body2>
            <Trans
              i18nKey={'Reward purchase is missing {{MISSING_AMOUNT}}'}
              values={{ MISSING_AMOUNT: '$34.32 (20,000 Sats)' }}
            >{`Reward purchase is missing {{MISSING_AMOUNT}}`}</Trans>
          </Body2>
          <Body2>
            {t(
              'Please contact the purchaser using the following methods, and Accept the purchase once the missing payments have been sent:',
            )}
          </Body2>
        </VStack>
      </HStack>
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
