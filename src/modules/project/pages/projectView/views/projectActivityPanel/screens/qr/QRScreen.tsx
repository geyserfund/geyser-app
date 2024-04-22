import { Link, Text, VStack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FaTelegramPlane } from 'react-icons/fa'

import { GeyserTelegramUrl } from '../../../../../../../../constants'
import { useFundCalc } from '../../../../../../../../helpers'
import { IFundForm } from '../../../../../../../../hooks'
import { standardPadding } from '../../../../../../../../styles'
import { ProjectFragment, Satoshis, useFundingInvoiceCancelMutation } from '../../../../../../../../types'
import { useFundingContext } from '../../../../../../context/FundingProvider'
import { FundingStages, useFundingStage } from '../../../../../../funding/state'
import { SectionTitleBlock } from '../../components/SectionTitleBlock'
import { ContributionInfoBox, ContributionInfoBoxVersion } from '../contributionInfo/ContributionInfoBox'
import { QRCodeSection } from './QRCodeSection'

type Props = {
  handleCloseButton: () => void
  state: IFundForm
  project: ProjectFragment
}

export const QRScreen = ({ state, project, handleCloseButton }: Props) => {
  const { t } = useTranslation()
  const { getTotalAmount } = useFundCalc(state)

  const [cancelInvoice] = useFundingInvoiceCancelMutation({
    ignoreResults: true,
  })

  const { fundingTx } = useFundingContext()
  const { fundingStage } = useFundingStage()

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
      <QRCodeSection />
      <ContributionInfoBox
        formState={state}
        version={ContributionInfoBoxVersion.NEUTRAL}
        project={project}
        contributionAmount={getTotalAmount('sats', project.name) as Satoshis}
        isFunderAnonymous={state.anonymous}
        funderUsername={state.funderUsername}
        funderEmail={state.email}
        funderAvatarURL={state.funderAvatarURL}
        showGeyserFee={false}
      />
      <Button
        as={Link}
        textDecoration="none"
        href={GeyserTelegramUrl}
        target="_blank"
        variant="outline"
        width="100%"
        leftIcon={<FaTelegramPlane aria-label="telegram" fontSize="20px" />}
      >
        {t('Reach out for help')}
      </Button>
      <Text fontSize="8px" fontWeight={400} color={'neutral.700'}>
        {t(
          'Geyser is not a store. It’s a way to bring creative projects to life using Bitcoin. Your donation will support a creative project that has yet to be developed. There’s a risk that, despite a creator’s best efforts, your reward will not be fulfilled, and we urge you to consider this risk prior to backing it. Geyser is not responsible for project claims or reward fulfillment.',
        )}
      </Text>
    </VStack>
  )
}
