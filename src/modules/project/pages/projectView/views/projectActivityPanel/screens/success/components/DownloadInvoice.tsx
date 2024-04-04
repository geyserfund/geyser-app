import { useLazyQuery, useQuery } from '@apollo/client'
import { DownloadIcon } from '@chakra-ui/icons'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useEffect, useState } from 'react'

import { QUERY_FUNDING_TX_FOR_DOWNLOAD_INVOICE, QUERY_PROJECT_BY_NAME_OR_ID } from '../../../../../../../../../graphql'
import { FundingTx, Project } from '../../../../../../../../../types'
import { toInt } from '../../../../../../../../../utils'
import { DownloadInvoicePDF } from './DownloadInvoicePDF'

export const DownloadInvoice = ({ fundingTxId, showFee }: { fundingTxId: BigInt; showFee?: false }) => {
  const [invoiceData, setInvoiceData] = useState<FundingTx | null>(null)
  const [projectData, setProjectData] = useState<Project | null>(null)

  const transactionQuery = useQuery<{ fundingTx: FundingTx }>(QUERY_FUNDING_TX_FOR_DOWNLOAD_INVOICE, {
    variables: { fundingTxId: toInt(fundingTxId) },
    onCompleted(data) {
      setInvoiceData(data.fundingTx)
    },
  })

  const [getProjectDetails] = useLazyQuery(QUERY_PROJECT_BY_NAME_OR_ID, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (invoiceData) {
      getProjectDetails({
        variables: { where: { id: toInt(invoiceData.projectId) } },
      }).then((data) => {
        if (data && data.data && data.data.projectGet) {
          setProjectData(data.data.projectGet)
        }
      })
    }
  }, [invoiceData, getProjectDetails])

  if (transactionQuery.loading || !projectData || !invoiceData) {
    return null
  }

  return (
    <PDFDownloadLink
      document={<DownloadInvoicePDF invoiceData={invoiceData} projectData={projectData} showFee={showFee} />}
      style={{
        padding: '10px',
        backgroundColor: '#FFF',
        borderRadius: '8px',
        width: '36px',
        display: 'flex',
        justifyContent: 'center',
        color: 'black',
      }}
    >
      <DownloadIcon />
    </PDFDownloadLink>
  )
}
