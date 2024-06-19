import { VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { getBip21Invoice } from '../../../../../../../../utils/lightning/bip21'
import { useFundingContext } from '../../../../../../context'
import { ContributionInfoBox, ContributionInfoBoxVersion } from '../contributionInfo'
import { FundingDisclaimer, ReachOutForHelpButton } from './components'
import { PaymentMethodSelection } from './components/PaymentMethodSelection'
import { useIsLightingMethodAtom } from './states/paymentMethodAtom'
import { LightningQR } from './views/lightning/LightningQR'
import { OnchainBoltz } from './views/onchain/OnChainBoltz'

export const QRCodeImage = ({ openedFromGrant }: { openedFromGrant?: boolean }) => {
  const [lightningInvoice, setLightningInvoice] = useState<string>('')
  const [onChainAddress, setOnChainAddress] = useState<string>('')

  const { fundingTx } = useFundingContext()

  const isLightning = useIsLightingMethodAtom()

  useEffect(() => {
    const { id, paymentRequest, address, amount } = fundingTx

    if (id === 0) {
      setOnChainAddress('')
      setLightningInvoice('')
      return
    }

    setOnChainAddress(getBip21Invoice(amount, address))
    setLightningInvoice(paymentRequest || '')
  }, [fundingTx, fundingTx.paymentRequest, fundingTx.address])

  return (
    <>
      <VStack flexWrap="wrap" width="100%">
        <PaymentMethodSelection />
        {isLightning ? (
          <LightningQR lightningInvoice={lightningInvoice} />
        ) : (
          <OnchainBoltz onChainAddress={onChainAddress} />
        )}
      </VStack>
      <ContributionInfoBox
        version={ContributionInfoBoxVersion.NEUTRAL}
        showGeyserFee={false}
        openedFromGrant={openedFromGrant}
      />
      <ReachOutForHelpButton />
      <FundingDisclaimer />
    </>
  )
}
