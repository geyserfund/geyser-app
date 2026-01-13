import { Button, ButtonProps, IconButton, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { t } from 'i18next'
import { forwardRef, useState } from 'react'
import { PiDownloadSimple } from 'react-icons/pi'

import { FundingProjectState } from '@/modules/project/funding/state/fundingFormAtom'
import { TooltipPopover } from '@/shared/components/feedback/TooltipPopover.tsx'
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
  isDisabled,
  isPending,
}: {
  project: Pick<FundingProjectState, 'title' | 'id'>
  contributionId: BigInt
  showFee?: false
  asIcon?: boolean
  buttonProps?: ButtonProps
  isDisabled?: boolean
  isPending?: boolean
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

  if (isPending) {
    return (
      <TooltipPopover
        content={t(
          'Your contribution is still being confirmed. The invoice will be available for download once the confirmation is complete.',
        )}
      >
        <DownloadButtons asIcon={asIcon} isDisabled={true} />
      </TooltipPopover>
    )
  }

  if (!invoiceData) {
    return (
      <DownloadButtons
        asIcon={asIcon}
        onClick={(event) => {
          event.stopPropagation()
          handleGetInvoiceData()
        }}
        onMouseEnter={() => handleGetInvoiceData()}
        isLoading={transactionQuery.loading}
        {...buttonProps}
      />
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
            isDisabled={isDisabled}
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
          isDisabled={isDisabled}
          {...buttonProps}
        >
          {t('Download invoice')}
        </Button>
      )}
    </PDFDownloadLink>
  )
}

const DownloadButtons = forwardRef<HTMLButtonElement | HTMLDivElement, ButtonProps & { asIcon?: boolean }>(
  ({ asIcon, ...buttonProps }, ref) => {
    if (asIcon) {
      return (
        <IconButton
          ref={ref}
          as="div"
          size="lg"
          variant="outline"
          colorScheme="neutral1"
          icon={<PiDownloadSimple />}
          aria-label={t('Download invoice')}
          {...buttonProps}
        />
      )
    }

    return (
      <Button
        ref={ref}
        as="div"
        size="lg"
        variant="outline"
        colorScheme="neutral1"
        rightIcon={<PiDownloadSimple />}
        {...buttonProps}
      >
        {t('Download invoice')}
      </Button>
    )
  },
)

const DownloadInvoicePopover = ({ children }: { children: React.ReactNode }) => {
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
