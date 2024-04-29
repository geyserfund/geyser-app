import { VStack } from '@chakra-ui/layout'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { standardPadding } from '../../../../../../../../styles'
import { ProjectFragment, useFundingInvoiceCancelMutation } from '../../../../../../../../types'
import { useFundingContext } from '../../../../../../context/FundingProvider'
import { FundingStages, useFundingStage } from '../../../../../../funding/state'
import { SectionTitleBlock } from '../../components/SectionTitleBlock'
import { QRCodeSection } from './QRCodeSection'

type Props = {
  project: ProjectFragment
  onCloseClick: () => void
}

export const QRScreen = ({ project, onCloseClick }: Props) => {
  const { t } = useTranslation()

  const [cancelInvoice] = useFundingInvoiceCancelMutation({
    ignoreResults: true,
  })

  const { fundingTx } = useFundingContext()
  const { fundingStage, setFundingStage } = useFundingStage()

  const handleCloseButton = () => {
    setFundingStage(FundingStages.form)
  }

  useEffect(() => {
    // Cancel invoice on the backend after QR section unmounts
    return () => {
      if (fundingStage !== FundingStages.started && fundingStage !== FundingStages.canceled && fundingTx.invoiceId) {
        cancelInvoice({
          variables: { invoiceId: fundingTx.invoiceId },
        })
      }
    }
  }, [cancelInvoice, fundingStage, fundingTx.invoiceId])

  return (
    <VStack
      spacing="20px"
      width="100%"
      height="100%"
      overflowY="auto"
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
      padding={standardPadding}
    >
      <SectionTitleBlock title={t('Invoice')} onBackClick={handleCloseButton} />
      <QRCodeSection onCloseClick={onCloseClick} />
    </VStack>
  )
}
