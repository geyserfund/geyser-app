import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { PiWarningCircleFill } from 'react-icons/pi'

import { Body1 } from '../../../../../../../../../../components/typography'
import { Modal } from '../../../../../../../../../../shared/components/layouts'
import { useModal } from '../../../../../../../../../../shared/hooks'
import { FundingConfirmInput, FundingTxOrderFragment } from '../../../../../../../../../../types'
import { useCustomTheme } from '../../../../../../../../../../utils'
import { getUSD } from '../../components/helpers'

export const FundingAmountAccept = ({
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
          <VStack w="full" alignItems={'flex-start'}>
            <Body1>{`${t('Reward purchase is missing')} ${getUSD(
              differenceAmount,
              fundingTx.bitcoinQuote?.quote,
            )} (${differenceAmount} Sats)`}</Body1>
            <Body1>
              {t(
                'Once you accept this payment, the purchase of this reward will show in the Rewards section. Are you sure you want to accept it?',
              )}
            </Body1>
          </VStack>
          <VStack w="full">
            <Button variant="primaryNeutral" w="full">
              {t('Cancel')}
            </Button>
            <Button
              variant="primary"
              w="full"
              rightIcon={<PiWarningCircleFill fontSize={'20px'} fill={colors.neutral[1000]} />}
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
