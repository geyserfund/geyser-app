import { EmailIcon } from '@chakra-ui/icons'
import { HStack, IconButton, Link, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { BsFacebook } from 'react-icons/bs'
import { RiTwitterXLine } from 'react-icons/ri'

import { NostrSvgIcon } from '../../../../../../../components/icons'
import { Body2 } from '../../../../../../../components/typography'
import {
  AnonymousAvatar,
  LinkableAvatar,
} from '../../../../../../../components/ui'
import {
  ExternalAccount,
  FundingConfirmInput,
  FundingTxOrderFragment,
} from '../../../../../../../types'
import { ExternalAccountType } from '../../../../../../auth'
import { getUSD, OrderItems } from '../../components'
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
          if (amount === 0) {
            return null
          }

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
          if (fundingTx.donationAmount === 0) {
            return null
          }

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
          const items = [
            ...(fundingTx.bitcoinQuote?.quote
              ? [
                  {
                    label: t('Invoice total'),
                    value: getUSD(
                      fundingTx.amount,
                      fundingTx.bitcoinQuote?.quote,
                    ),
                  },
                ]
              : []),
            {
              label: t('Invoice total (Sats)'),
              value: fundingTx.amount,
            },
            {
              label: t('Amount paid (Sats)'),
              value: fundingTx.amountPaid,
            },
            ...(fundingTx.bitcoinQuote?.quote
              ? [
                  {
                    label: t('Bitcoin Price'),
                    value: `$${fundingTx.bitcoinQuote?.quote}`,
                  },
                ]
              : []),
          ]

          return <AccordionListItem items={items} />
        },
      },
    ],
    [t, handleUpdate],
  )

  const accordionContent = (fundingTx: FundingTxOrderFragment) => {
    const amount = fundingTx.amount - fundingTx.amountPaid

    const amountInDollars = fundingTx.bitcoinQuote?.quote
      ? getUSD(amount, fundingTx.bitcoinQuote?.quote).replace('<', 'less than')
      : ''
    const externalAccounts = fundingTx.funder.user?.externalAccounts || []

    return (
      <HStack w="full" flex={1}>
        <VStack alignItems="flex-start" maxWidth="400px">
          <Body2>
            <Trans
              i18nKey={'Reward purchase is missing {{MISSING_AMOUNT}}'}
              values={{ MISSING_AMOUNT: `${amountInDollars} (${amount} Sats)` }}
            >{`Reward purchase is missing {{MISSING_AMOUNT}}`}</Trans>
          </Body2>
          <Body2>
            {t(
              'Please contact the purchaser using the following methods, and Accept the purchase once the missing payments have been sent:',
            )}
          </Body2>
          <HStack>
            {externalAccounts?.map((account) => {
              const values =
                externalAccountIconAndColors[
                  account.accountType as keyof typeof externalAccountIconAndColors
                ]
              if (!values) return null
              return (
                <IconButton
                  key={account.id}
                  size="sm"
                  aria-label={account.accountType}
                  icon={<values.icon color="white" maxHeight="20px" />}
                  backgroundColor={values.color}
                  _hover={{ backgroundColor: 'neutral.500' }}
                  px="15px"
                  as={Link}
                  isExternal
                  href={values.link(account)}
                />
              )
            })}
            <IconButton
              aria-label="Email"
              size="sm"
              px="15px"
              icon={<EmailIcon color="neutral.0" />}
              backgroundColor="neutral.700"
              _hover={{ backgroundColor: 'neutral.500' }}
              onClick={() => {
                window.open(`mailto:${fundingTx.email}`)
              }}
            />
          </HStack>
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

export const externalAccountIconAndColors = {
  [ExternalAccountType.facebook]: {
    icon: BsFacebook,
    color: 'social.facebook',
    link: (account: ExternalAccount) =>
      `https://facebook.com/${account.externalUsername}`,
  },
  [ExternalAccountType.twitter]: {
    icon: RiTwitterXLine,
    color: 'social.twitter',
    link: (account: ExternalAccount) =>
      `https://twitter.com/${account.externalUsername}`,
  },
  [ExternalAccountType.nostr]: {
    icon: NostrSvgIcon,
    color: 'social.nostr',
    link: (account: ExternalAccount) =>
      `https://primal.net/profile/${account.externalId}`,
  },
}
