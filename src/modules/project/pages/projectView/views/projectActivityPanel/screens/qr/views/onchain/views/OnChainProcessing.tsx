import { useTranslation } from 'react-i18next'

import { useFundingStage, useRefundFileValue } from '../../../../../../../../../funding/state'
import { TransactionProcessing } from '../components'
import { UpdateFundingTxEmailAddress } from '../components/UpdateFundingTxEmailAddress'
import { useGetTransactionId } from '../hooks/useGetTransactionId'
import { SwapStatusUpdate, useTransactionStatusUpdate } from '../hooks/useTransactionStatusUpdate'
import { OnChainStatus, useOnChainStatusSet, useSetOnChainErrorAtom } from '../states'

export const BLOCK_EXPLORER_BASE_URL = 'https://mempool.space/tx/'

export const OnChainProcessing = () => {
  const { t } = useTranslation()

  const { id } = useRefundFileValue()
  // const transactionId = useGetTransactionId(id)

  const { setNextFundingStage } = useFundingStage()
  const setOnChainError = useSetOnChainErrorAtom()
  const setOnChainStatus = useOnChainStatusSet()

  const handleConfirmed = () => {
    setNextFundingStage()
  }

  const handleFailed = (value: SwapStatusUpdate) => {
    console.log('checking swap error', value)
    setOnChainError(value.error)
    setOnChainStatus(OnChainStatus.refund)
  }

  useTransactionStatusUpdate({
    handleConfirmed,
    handleFailed,
    swapId: id,
  })

  return (
    <>
      <TransactionProcessing
        //  buttonUrl={`${BLOCK_EXPLORER_BASE_URL}${transactionId}`}
        buttonUrl={`${BLOCK_EXPLORER_BASE_URL}`}
      />
      <UpdateFundingTxEmailAddress />
    </>
  )
}
