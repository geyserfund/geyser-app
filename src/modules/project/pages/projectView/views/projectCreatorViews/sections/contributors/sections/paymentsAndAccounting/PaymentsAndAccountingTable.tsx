import { DateTime } from 'luxon'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { AnonymousAvatar, LinkableAvatar } from '../../../../../../../../../../components/ui'
import { FundingTxOrderFragment, GetFundingTxsOrderByInput, OrderByOptions } from '../../../../../../../../../../types'
import { OrderAmounts, OrderItems } from '../../components'
import { TableData, TableWithAccordion } from '../../components/TableWithAccordion'

export const PaymentsAndAccountingTable = ({
  data,
  setOrderBy,
  orderBy,
}: {
  data: FundingTxOrderFragment[]
  setOrderBy: Dispatch<SetStateAction<GetFundingTxsOrderByInput>>
  orderBy: GetFundingTxsOrderByInput
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
            return <AnonymousAvatar seed={val.id} imageSize={'20px'} textColor="neutral.900" />
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
        sort: {
          order: orderBy.createdAt,
          updateOrder() {
            setOrderBy((prev) => {
              if (prev.createdAt === OrderByOptions.Asc) {
                return { createdAt: OrderByOptions.Desc }
              }

              return { createdAt: OrderByOptions.Asc }
            })
          },
        },
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
        header: t('Type'),
        key: 'type',
        colSpan: 2,
        value(val: FundingTxOrderFragment) {
          if (val.amount === val.donationAmount) {
            return 'Donation'
          }

          if (val.donationAmount === 0) {
            return 'Rewards'
          }

          return 'Rewards, Donation'
        },
      },
      {
        header: t('Amount'),
        key: 'amount',
        value(val: FundingTxOrderFragment) {
          return `${val.amount} Sats`
        },
        colSpan: 2,
        isMobile: true,
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
        header: 'Total',
        key: 'total',
        isAccordion: true,
        render(fundingTx: FundingTxOrderFragment) {
          return <OrderAmounts amount={fundingTx.amount} quote={fundingTx.bitcoinQuote?.quote} />
        },
      },
    ],
    [t, setOrderBy, orderBy.createdAt],
  )

  return <TableWithAccordion<FundingTxOrderFragment> items={data} schema={tableData} />
}
