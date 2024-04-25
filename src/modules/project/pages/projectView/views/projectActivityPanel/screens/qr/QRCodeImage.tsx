import { VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { getBip21Invoice } from '../../../../../../../../utils/lightning/bip21'
import { useFundingContext } from '../../../../../../context'
import { PaymentMethodSelection } from './components/PaymentMethodSelection'
import { useIsLightingMethodAtom } from './states/paymentMethodAtom'
import { LightningQR } from './views/lightning/LightningQR'
import { OnchainBoltz } from './views/onchain/OnChainBoltz'

export const QRCodeImage = () => {
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
    <VStack flexWrap="wrap" width="100%">
      <PaymentMethodSelection />
      {/* {!onChainAddress && !isLightning ? (
        <Box borderRadius={'12px'} borderWidth={'2px'} padding={'2px'}>
          <VStack justifyContent={'center'} p={2}>
            <Image src={WarningIcon} />
            <Text textAlign="center" color="secondary.red" fontSize={'16px'} fontWeight={'bold'}>
              {t('Onchain donations are temporarily unavailable. They should be operational by the end of April 2024')}
            </Text>
          </VStack>
        </Box>
      ) : ( */}
      <>
        {isLightning ? (
          <LightningQR lightningInvoice={lightningInvoice} />
        ) : (
          <OnchainBoltz onChainAddress={onChainAddress} />
        )}
      </>
      {/* )} */}
    </VStack>
  )
}