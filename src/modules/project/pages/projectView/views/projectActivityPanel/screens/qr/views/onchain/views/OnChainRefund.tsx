import { DownloadRefund, TransactionFailed } from '../components'
import { ClaimRefund } from '../components/ClaimRefund'
import { useSwapTransaction } from '../hooks/useSwapTransaction'

export const OnChainRefund = () => {
  useSwapTransaction()

  return (
    <>
      <TransactionFailed />
      <ClaimRefund />
      <DownloadRefund />
    </>
  )
}
