import { Button, ButtonProps, IconButton, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { t } from 'i18next'
import { useState } from 'react'
import { PiDownloadSimple } from 'react-icons/pi'

import { FundingProjectState } from '@/modules/project/funding/state/fundingFormAtom'
import { Body } from '@/shared/components/typography/Body.tsx'

import {
  ContributionForDownloadInvoiceFragment,
  useContributionForDownloadInvoiceGetLazyQuery,
  useGetProjectOwnerUserForInvoiceQuery,
} from '../../../../../../../types'
import { toInt, useMobileMode } from '../../../../../../../utils'
import { DownloadInvoicePDF } from './DownloadInvoicePDF'

export const DownloadInvoice = ({
  project,
  contributionId,
  showFee,
  asIcon,
  buttonProps,
}: {
  project: Pick<FundingProjectState, 'title' | 'id'>
  contributionId: BigInt
  showFee?: false
  asIcon?: boolean
  buttonProps?: ButtonProps
}) => {
  const [dataFetched, setDataFetched] = useState(false)
  const [invoiceData, setInvoiceData] = useState<ContributionForDownloadInvoiceFragment | null>(null)

  const [getInvoiceData, transactionQuery] = useContributionForDownloadInvoiceGetLazyQuery({
    variables: { contributionId: toInt(contributionId) },
    onCompleted(data) {
      setInvoiceData(data.contribution)
    },
  })

  const { data: projectOwners } = useGetProjectOwnerUserForInvoiceQuery({
    skip: !project?.id,
    variables: {
      where: {
        id: project?.id,
      },
    },
  })

  const ownerUser = projectOwners?.projectGet?.owners[0]?.user

  const handleGetInvoiceData = () => {
    if (!dataFetched) {
      getInvoiceData()
      setDataFetched(true)
    }
  }

  if (!project) {
    return null
  }

  if (!invoiceData) {
    if (asIcon) {
      return (
        <DownloadInvoicePopover>
          <IconButton
            as="div"
            size="lg"
            variant="outline"
            colorScheme="neutral1"
            icon={<PiDownloadSimple />}
            aria-label={t('Download invoice')}
            onClick={(event) => event.stopPropagation()}
            onMouseEnter={() => handleGetInvoiceData()}
            isLoading={transactionQuery.loading}
            {...buttonProps}
          />
        </DownloadInvoicePopover>
      )
    }

    return (
      <Button
        as="div"
        size="lg"
        variant="outline"
        colorScheme="neutral1"
        rightIcon={<PiDownloadSimple />}
        onClick={(event) => event.stopPropagation()}
        onMouseEnter={() => getInvoiceData()}
        isLoading={transactionQuery.loading}
        {...buttonProps}
      >
        {t('Download invoice')}
      </Button>
    )
  }

  return (
    <PDFDownloadLink
      document={
        <DownloadInvoicePDF invoiceData={invoiceData} projectData={project} showFee={showFee} ownerUser={ownerUser} />
      }
    >
      {asIcon ? (
        <DownloadInvoicePopover>
          <IconButton
            as="div"
            size="lg"
            variant="outline"
            colorScheme="neutral1"
            icon={<PiDownloadSimple />}
            aria-label={t('Download invoice')}
            onClick={(event) => event.stopPropagation()}
            {...buttonProps}
          />
        </DownloadInvoicePopover>
      ) : (
        <Button
          as="div"
          size="lg"
          variant="outline"
          colorScheme="neutral1"
          rightIcon={<PiDownloadSimple />}
          onClick={(event) => event.stopPropagation()}
          {...buttonProps}
        >
          {t('Download invoice')}
        </Button>
      )}
    </PDFDownloadLink>
  )
}

export const DownloadInvoicePopover = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMobileMode()
  return (
    <Popover placement="left" trigger={isMobile ? 'click' : 'hover'}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Body size="sm" dark medium>
            {t('Download invoice')}
          </Body>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
