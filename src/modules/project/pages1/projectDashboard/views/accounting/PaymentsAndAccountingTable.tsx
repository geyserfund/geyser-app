import { DateTime } from 'luxon'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { AnonymousAvatar, LinkableAvatar } from '../../../../../../components/ui'
import { GetContributionsOrderByInput, OrderByOptions, OrderContributionFragment } from '../../../../../../types'
import { TableData, TableWithAccordion } from '../../common/TableWithAccordion'
import { AccordionListItem, OrderAmounts, OrderItems } from '../../components'

export const PaymentsAndAccountingTable = ({
  data,
  setOrderBy,
  orderBy,
}: {
  data: OrderContributionFragment[]
  setOrderBy: Dispatch<SetStateAction<GetContributionsOrderByInput>>
  orderBy: GetContributionsOrderByInput
}) => {
  const { t } = useTranslation()

  const tableData: TableData<OrderContributionFragment>[] = useMemo(
    () => [
      {
        header: t('Contributor'),
        key: 'name',
        render(val: OrderContributionFragment) {
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
        colSpan: 3,
        isMobile: true,
      },
      {
        header: t('Email'),
        key: 'email',
        colSpan: 3,
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
        value(val: OrderContributionFragment) {
          return val.confirmedAt ? DateTime.fromMillis(val.confirmedAt).toFormat('LLL dd, yyyy') : 'N/A'
        },
        colSpan: 2,
        isMobile: true,
      },
      {
        header: t('Reference'),
        key: 'uuid',
        colSpan: 2,
        isAccordion: true,
        render(val: OrderContributionFragment) {
          return (
            <AccordionListItem
              items={[
                { label: t('Reference'), value: val.uuid },
                { label: t('Private comment'), value: val.privateComment },
              ]}
            />
          )
        },
      },
      {
        header: t('Type'),
        key: 'type',
        colSpan: 2,
        value(val: OrderContributionFragment) {
          if (val.amount === val.donationAmount) {
            return 'Donation'
          }

          if (val.donationAmount === 0) {
            return 'Products'
          }

          return 'Products, Donation'
        },
      },
      {
        header: t('Amount'),
        key: 'amount',
        value(val: OrderContributionFragment) {
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
        render(contribution: OrderContributionFragment) {
          return <OrderItems orderItems={contribution.order?.items} />
        },
      },
      {
        header: 'Total',
        key: 'total',
        isAccordion: true,
        render(contribution: OrderContributionFragment) {
          return <OrderAmounts amount={contribution.amount} quote={contribution.bitcoinQuote?.quote} />
        },
      },
    ],
    [t, setOrderBy, orderBy.createdAt],
  )

  return <TableWithAccordion<OrderContributionFragment> items={data} schema={tableData} />
}
