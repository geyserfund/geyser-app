import { Button } from '@chakra-ui/react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { t } from 'i18next'
import { useState } from 'react'
import { PiDownloadSimple } from 'react-icons/pi'

import { FundingProjectState } from '@/modules/project/funding/state/fundingFormAtom'

import { FundingTxForDownloadInvoiceFragment, useFundingTxForDownloadInvoiceQuery } from '../../../../../../../types'
import { toInt } from '../../../../../../../utils'
import { DownloadInvoicePDF } from './DownloadInvoicePDF'

export const DownloadInvoice = ({
  project,
  fundingTxId,
  showFee,
}: {
  project: FundingProjectState
  fundingTxId: BigInt
  showFee?: false
}) => {
  const [invoiceData, setInvoiceData] = useState<FundingTxForDownloadInvoiceFragment | null>(null)

  const transactionQuery = useFundingTxForDownloadInvoiceQuery({
    variables: { fundingTxId: toInt(fundingTxId) },
    onCompleted(data) {
      setInvoiceData(data.fundingTx)
    },
  })

  if (transactionQuery.loading || !project || !invoiceData) {
    return null
  }

  return (
    <PDFDownloadLink
      document={<DownloadInvoicePDF invoiceData={invoiceData} projectData={project} showFee={showFee} />}
    >
      <Button as="div" size="lg" variant="outline" colorScheme="neutral1" rightIcon={<PiDownloadSimple />}>
        {t('Download invoice')}
      </Button>
    </PDFDownloadLink>
  )
}
