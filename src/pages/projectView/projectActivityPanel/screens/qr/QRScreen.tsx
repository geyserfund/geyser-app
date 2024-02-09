import { HStack, Link, Text, VStack } from '@chakra-ui/layout'
import { Button, CloseButton } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FaTelegramPlane } from 'react-icons/fa'

import { SectionTitle } from '../../../../../components/ui'
import { fundingStages, GeyserTelegramUrl } from '../../../../../constants'
import { useFundCalc } from '../../../../../helpers'
import { IFundForm, UseFundingFlowReturn } from '../../../../../hooks'
import { ProjectFragment, Satoshis, useFundingInvoiceCancelMutation } from '../../../../../types'
import { useMobileMode } from '../../../../../utils'
import { ContributionInfoBox, ContributionInfoBoxVersion } from '../../../projectMainBody/components'
import { QRCodeSection } from './QRCodeSection'

type Props = {
  handleCloseButton: () => void
  fundingFlow: UseFundingFlowReturn
  state: IFundForm
  project: ProjectFragment
}

export const QRScreen = ({ fundingFlow, state, project, handleCloseButton }: Props) => {
  const { t } = useTranslation()
  const { getTotalAmount } = useFundCalc(state)
  const isMobile = useMobileMode()

  const [cancelInvoice] = useFundingInvoiceCancelMutation({
    ignoreResults: true,
  })

  useEffect(() => {
    // Cancel invoice on the backend after QR section unmounts
    return () => {
      if (
        fundingFlow.fundState !== fundingStages.started &&
        fundingFlow.fundState !== fundingStages.canceled &&
        fundingFlow.fundingTx.invoiceId
      ) {
        cancelInvoice({
          variables: { invoiceId: fundingFlow.fundingTx.invoiceId },
        })
      }
    }
  }, [cancelInvoice, fundingFlow])

  return (
    <VStack
      padding={isMobile ? '10px 0px' : '10px 20px'}
      spacing="20px"
      width="100%"
      height="100%"
      overflowY="auto"
      margin="10px 15px"
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
      paddingX={5}
      marginTop={2}
    >
      <HStack justifyContent="space-between" width="100%">
        <SectionTitle>{t('Invoice')}</SectionTitle>
        <CloseButton onClick={handleCloseButton} />
      </HStack>
      <QRCodeSection fundingFlow={fundingFlow} />
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
