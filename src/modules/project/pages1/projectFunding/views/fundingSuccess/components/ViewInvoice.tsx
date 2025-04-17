import { ButtonProps } from '@chakra-ui/react'
import { PDFViewer } from '@react-pdf/renderer'
import { useState } from 'react'

import { FundingProjectState } from '@/modules/project/funding/state/fundingFormAtom'

import {
  ContributionForDownloadInvoiceFragment,
  useContributionForDownloadInvoiceGetQuery,
  useGetProjectOwnerUserForInvoiceQuery,
} from '../../../../../../../types'
import { toInt } from '../../../../../../../utils'
import { DownloadInvoicePDF } from './DownloadInvoicePDF'

export const ViewInvoice = ({
  project,
  contributionId,
  showFee,
  asIcon,
  buttonProps,
}: {
  project: Pick<FundingProjectState, 'title' | 'id'>
  contributionId: BigInt
  showFee?: boolean
  asIcon?: boolean
  buttonProps?: ButtonProps
}) => {
  const [invoiceData, setInvoiceData] = useState<ContributionForDownloadInvoiceFragment | null>(null)

  const transactionQuery = useContributionForDownloadInvoiceGetQuery({
    variables: { contributionId: toInt(contributionId) },
    onCompleted(data) {
      setInvoiceData(data.contribution)
    },
  })

  const { data: projectOwners } = useGetProjectOwnerUserForInvoiceQuery({
    variables: {
      where: {
        id: project.id,
      },
    },
  })

  if (!project) {
    return null
  }

  if (!invoiceData || transactionQuery.loading) {
    return null
  }

  console.log('checking transaction', invoiceData)

  const ownerUser = projectOwners?.projectGet?.owners[0]?.user

  return (
    <PDFViewer width="100%" height="100%">
      <DownloadInvoicePDF invoiceData={invoiceData} projectData={project} showFee={showFee} ownerUser={ownerUser} />
    </PDFViewer>
  )
}
