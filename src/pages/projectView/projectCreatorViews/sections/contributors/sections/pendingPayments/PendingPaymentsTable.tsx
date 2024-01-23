import { Button, HStack, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { PiWarningCircleFill } from 'react-icons/pi'

import { Modal } from '../../../../../../../components/layouts'
import { Body1, Body2 } from '../../../../../../../components/typography'
import {
  AnonymousAvatar,
  LinkableAvatar,
} from '../../../../../../../components/ui'
import { useModal } from '../../../../../../../hooks'
import {
  BitcoinQuote,
  FundingConfirmInput,
  FundingTxOrderFragment,
} from '../../../../../../../types'
import { useCustomTheme } from '../../../../../../../utils'
import {
  TableData,
  TableWithAccordion,
} from '../../components/TableWithAccordion'

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
          return <FundingAmount fundingTx={item} handleUpdate={handleUpdate} />
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
    ],
    [t],
  )

  const accordionContent = (item: FundingTxOrderFragment) => {
    return (
      <Stack
        w="full"
        direction={{ base: 'column', lg: 'row' }}
        justifyContent="flex-end"
        alignItems="flex-start"
        spacing="20px"
      >
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
            <Body2 color="neutral.700">{t('Rewards')}:</Body2>
            <Body2 color="neutral.700">{t('Rewards (Sats)')}:</Body2>
          </VStack>
          <VStack spacing="5px">
            <Body2 semiBold color="neutral.900">
              {getUSD(item.amount - item.donationAmount, item.bitcoinQuote)}
            </Body2>
            <Body2 semiBold color="neutral.900">
              {item.amount - item.donationAmount}
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
              {getUSD(item.donationAmount, item.bitcoinQuote)}
            </Body2>
            <Body2 semiBold color="neutral.900">
              {item.donationAmount}
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
          <VStack alignItems="flex-start" spacing="5px">
            <Body2 semiBold color="neutral.900">
              {getUSD(item.amount, item.bitcoinQuote)}
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

export const FundingAmount = ({
  fundingTx,
  handleUpdate,
}: {
  fundingTx: FundingTxOrderFragment
  handleUpdate: (input: FundingConfirmInput) => Promise<void>
}) => {
  const confirmModal = useModal()
  const { colors } = useCustomTheme()

  const differenceAmount = fundingTx.amount - fundingTx.amountPaid

  const handleAccept = async () => {
    await handleUpdate({
      amount: fundingTx.amountPaid,
      paidAt: DateTime.now().toMillis(),
      offChain: {
        bolt11: {
          invoiceId: fundingTx.invoiceId || '',
        },
      },
    })
    confirmModal.onClose()
  }

  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        backgroundColor="secondary.yellow"
        border="1px solid"
        borderColor="neutral.1000"
        color="black"
        rightIcon={<PiWarningCircleFill fill={'black'} fontSize={'20px'} />}
        _hover={{
          color: 'white',
          backgroundColor: 'neutral.200',
          ' & svg': { fill: 'white' },
        }}
        onClick={confirmModal.onOpen}
      >
        {t('Accept')}
      </Button>
      <Modal {...confirmModal} title={t('Accept Purchase')}>
        <VStack>
          <VStack w="full">
            <Body1>{`Reward purchase is missing $${getUSD(
              differenceAmount,
              fundingTx.bitcoinQuote,
            )} (${differenceAmount} Sats)`}</Body1>
            <Body1>
              Once you accept this payment, the purchase of this reward will
              show in the Rewards section. Are you sure you want to accept it?
            </Body1>
          </VStack>
          <VStack w="full">
            <Button variant="primaryNeutral" w="full">
              {t('Cancel')}
            </Button>
            <Button
              variant="primary"
              w="full"
              rightIcon={
                <PiWarningCircleFill
                  fontSize={'20px'}
                  fill={colors.neutral[1000]}
                />
              }
              onClick={handleAccept}
            >
              {t('Accept')}
            </Button>
          </VStack>
        </VStack>
      </Modal>
    </>
  )
}

const getUSD = (
  sats: number,
  bitcoinQuote: FundingTxOrderFragment['bitcoinQuote'],
) => {
  if (!bitcoinQuote) return 'NAN'
  const total = sats / bitcoinQuote.quote
  if (total > 1) {
    return `$${total.toFixed(2)}`
  }

  return '< $1'
}
